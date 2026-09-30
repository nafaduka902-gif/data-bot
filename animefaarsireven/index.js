const REQUESTS_FILE = 'upload/requests.json'
const RESULTS_FILE = 'upload/results.json'
const POLL_INTERVAL = 3000
const REQUEST_TIMEOUT = 30 * 60 * 1000
const UPLOADER_POLL_INTERVAL = 2000
const SYNC_INTERVAL = 15000

const PROJECT_DIR = __dirname
const LINE_FILE = path.join(PROJECT_DIR, 'line.js')
const MANIFEST_FILE = path.join(
    PROJECT_DIR,
    '.raven-github-sync.json'
)

const PROTECTED_FILES = new Set([
    'line.js',
    '.raven-github-sync.json'
])

let client = null
let running = false
let processingRequest = false
let syncInProgress = false

const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms))

function uploadLog(message) {
    console.log(`[UPLOAD] ${message}`)
}

function getAxiosErrorDetails(error) {
    return {
        message: error?.message || 'Unknown error',
        status: error?.response?.status || null,
        statusText: error?.response?.statusText || null,
        data: error?.response?.data || null,
        url: error?.config?.url || null,
        method: error?.config?.method || null,
        rateLimitRemaining:
            error?.response?.headers?.['x-ratelimit-remaining'] || null,
        rateLimitLimit:
            error?.response?.headers?.['x-ratelimit-limit'] || null,
        rateLimitReset:
            error?.response?.headers?.['x-ratelimit-reset'] || null,
        acceptedPermissions:
            error?.response?.headers?.['x-accepted-github-permissions'] || null
    }
}

function logAxiosError(prefix, error) {
    console.error(
        prefix,
        JSON.stringify(
            getAxiosErrorDetails(error),
            null,
            2
        )
    )
}

async function ensureLineFile() {
    if (await fileExists(LINE_FILE)) {
        return
    }

    const indexPath =
        path.join(PROJECT_DIR, 'index.js')

    const content =
        await fs.promises.readFile(
            indexPath,
            'utf8'
        )

    const lines =
        content.split(/\r?\n/)

    if (lines.length < 19) {
        throw new Error(
            'index.js must contain at least 19 lines.'
        )
    }

    const first19 =
        lines.slice(0, 19).join('\n') + '\n'

    const temp =
        `${LINE_FILE}.tmp`

    await fs.promises.writeFile(
        temp,
        first19,
        'utf8'
    )

    await fs.promises.rename(
        temp,
        LINE_FILE
    )

    console.log(
        '🔐 line.js created from current index.js lines 1-19.'
    )
}

async function readLineFile() {
    const content =
        await fs.promises.readFile(
            LINE_FILE,
            'utf8'
        )

    const lines =
        content.split(/\r?\n/)

    const cleanLines =
        lines.slice(0, 19)

    if (cleanLines.length < 19) {
        throw new Error(
            'line.js must contain the first 19 lines.'
        )
    }

    return cleanLines.join('\n') + '\n'
}

async function fileExists(filePath) {
    try {
        await fs.promises.access(filePath)
        return true
    } catch {
        return false
    }
}

function githubHeaders() {
    return {
        Authorization:
            `Bearer ${GITHUB_TOKEN}`,
        Accept:
            'application/vnd.github+json',
        'User-Agent':
            'AnimeFaarsi-Raven',
        'X-GitHub-Api-Version':
            '2022-11-28'
    }
}

function apiUrl(endpoint) {
    return (
        `https://api.github.com/repos/` +
        `${GITHUB_OWNER}/` +
        `${GITHUB_REPO}/` +
        endpoint
    )
}

async function getRemoteTree() {
    const refResponse =
        await axios.get(
            apiUrl(
                `git/ref/heads/${encodeURIComponent(
                    GITHUB_BRANCH
                )}`
            ),
            {
                headers:
                    githubHeaders(),
                timeout: 30000
            }
        )

    const commitSha =
        refResponse.data.object.sha

    const commitResponse =
        await axios.get(
            apiUrl(
                `git/commits/${commitSha}`
            ),
            {
                headers:
                    githubHeaders(),
                timeout: 30000
            }
        )

    const treeSha =
        commitResponse.data.tree.sha

    const treeResponse =
        await axios.get(
            apiUrl(
                `git/trees/${treeSha}?recursive=1`
            ),
            {
                headers:
                    githubHeaders(),
                timeout: 30000
            }
        )

    if (treeResponse.data.truncated) {
        throw new Error(
            'GitHub tree is truncated.'
        )
    }

    const prefix =
        `${GITHUB_SOURCE_DIR}/`

    const files = {}

    for (
        const item of
        treeResponse.data.tree || []
    ) {
        if (
            item.type !== 'blob' ||
            !item.path.startsWith(prefix)
        ) {
            continue
        }

        const relativePath =
            item.path.slice(
                prefix.length
            )

        if (!relativePath) {
            continue
        }

        files[relativePath] = {
            sha: item.sha,
            size:
                item.size || 0
        }
    }

    return {
        commitSha,
        files
    }
}

function calculateGitBlobSha(buffer) {
    const header =
        Buffer.from(
            `blob ${buffer.length}\0`
        )

    return crypto
        .createHash('sha1')
        .update(
            Buffer.concat([
                header,
                buffer
            ])
        )
        .digest('hex')
}

function resolveProjectPath(relativePath) {
    const absolutePath =
        path.resolve(
            PROJECT_DIR,
            relativePath
        )

    if (
        absolutePath === PROJECT_DIR ||
        !absolutePath.startsWith(
            PROJECT_DIR + path.sep
        )
    ) {
        throw new Error(
            `Unsafe repository path: ${relativePath}`
        )
    }

    return absolutePath
}

async function readManifest() {
    try {
        return JSON.parse(
            await fs.promises.readFile(
                MANIFEST_FILE,
                'utf8'
            )
        )
    } catch {
        return null
    }
}

async function writeManifest(manifest) {
    const temp =
        `${MANIFEST_FILE}.tmp`

    await fs.promises.writeFile(
        temp,
        JSON.stringify(
            manifest,
            null,
            2
        ),
        'utf8'
    )

    await fs.promises.rename(
        temp,
        MANIFEST_FILE
    )
}

async function downloadGitBlob(sha) {
    const response =
        await axios.get(
            apiUrl(
                `git/blobs/${sha}`
            ),
            {
                headers:
                    githubHeaders(),
                timeout: 120000,
                maxContentLength:
                    100 * 1024 * 1024,
                maxBodyLength:
                    100 * 1024 * 1024
            }
        )

    if (
        response.data.encoding !==
        'base64'
    ) {
        throw new Error(
            `Unsupported GitHub blob encoding: ${response.data.encoding}`
        )
    }

    return Buffer.from(
        response.data.content.replace(
            /\s/g,
            ''
        ),
        'base64'
    )
}

async function buildProtectedIndex(remoteBuffer) {
    const remoteText =
        remoteBuffer.toString('utf8')

    const remoteLines =
        remoteText.split(/\r?\n/)

    if (remoteLines.length < 19) {
        throw new Error(
            'GitHub index.js has fewer than 19 lines.'
        )
    }

    const lineContent =
        await readLineFile()

    const codeLines =
        remoteLines.slice(19)

    return Buffer.from(
        lineContent +
        codeLines.join('\n'),
        'utf8'
    )
}

async function syncIndexFile(remoteFile) {
    console.log(
        '⬇️ Updating GitHub index.js...'
    )

    const remoteBuffer =
        await downloadGitBlob(
            remoteFile.sha
        )

    const remoteSha =
        calculateGitBlobSha(
            remoteBuffer
        )

    if (remoteSha !== remoteFile.sha) {
        throw new Error(
            'GitHub index.js checksum mismatch.'
        )
    }

    const finalBuffer =
        await buildProtectedIndex(
            remoteBuffer
        )

    const localPath =
        path.join(
            PROJECT_DIR,
            'index.js'
        )

    const tempPath =
        `${localPath}.raven-tmp`

    await fs.promises.writeFile(
        tempPath,
        finalBuffer
    )

    await fs.promises.rename(
        tempPath,
        localPath
    )

    console.log(
        '✅ GitHub index.js updated while preserving line.js lines 1-19.'
    )
}

async function syncNormalFile(
    relativePath,
    remoteFile
) {
    const localPath =
        resolveProjectPath(
            relativePath
        )

    let localSha = null

    try {
        const localBuffer =
            await fs.promises.readFile(
                localPath
            )

        localSha =
            calculateGitBlobSha(
                localBuffer
            )
    } catch {}

    if (localSha === remoteFile.sha) {
        return false
    }

    console.log(
        `⬇️ Updating ${relativePath}`
    )

    const data =
        await downloadGitBlob(
            remoteFile.sha
        )

    const downloadedSha =
        calculateGitBlobSha(data)

    if (downloadedSha !== remoteFile.sha) {
        throw new Error(
            `Checksum mismatch: ${relativePath}`
        )
    }

    await fs.promises.mkdir(
        path.dirname(localPath),
        {
            recursive: true
        }
    )

    const tempPath =
        `${localPath}.raven-tmp`

    await fs.promises.writeFile(
        tempPath,
        data
    )

    await fs.promises.rename(
        tempPath,
        localPath
    )

    return true
}

async function syncGitHubProject() {
    if (syncInProgress) {
        return {
            changed: false,
            restartRequired: false
        }
    }

    syncInProgress = true

    try {
        const remote =
            await getRemoteTree()

        const previous =
            await readManifest()

        if (
            previous &&
            previous.commitSha &&
            previous.commitSha ===
            remote.commitSha
        ) {
            console.log(
                `⏭ No new GitHub commit: ${remote.commitSha}`
            )

            return {
                changed: false,
                restartRequired: false,
                newCommit: false
            }
        }

        console.log(
            `🆕 New GitHub commit: ${remote.commitSha}`
        )

        const previousFiles =
            previous &&
            previous.files
                ? previous.files
                : {}

        const changedFiles = []
        const newFiles = {}

        for (
            const [
                relativePath,
                remoteFile
            ] of Object.entries(
                remote.files
            )
        ) {
            if (
                PROTECTED_FILES.has(
                    relativePath
                )
            ) {
                continue
            }

            if (
                relativePath ===
                'index.js'
            ) {
                const previousRemoteSha =
                    previousFiles[
                        'index.js'
                    ] &&
                    previousFiles[
                        'index.js'
                    ].sha

                if (
                    previousRemoteSha !==
                    remoteFile.sha
                ) {
                    await syncIndexFile(
                        remoteFile
                    )

                    changedFiles.push(
                        'index.js'
                    )
                }

                newFiles[
                    relativePath
                ] = remoteFile

                continue
            }

            const changed =
                await syncNormalFile(
                    relativePath,
                    remoteFile
                )

            if (changed) {
                changedFiles.push(
                    relativePath
                )
            }

            newFiles[
                relativePath
            ] = remoteFile
        }

        const deletedFiles =
            Object.keys(
                previousFiles
            ).filter(
                relativePath =>
                    !remote.files[
                        relativePath
                    ]
            )

        for (
            const relativePath
            of deletedFiles
        ) {
            if (
                PROTECTED_FILES.has(
                    relativePath
                )
            ) {
                continue
            }

            if (
                relativePath ===
                'index.js'
            ) {
                console.log(
                    '⚠️ GitHub removed index.js. Local index.js will be kept.'
                )

                newFiles[
                    relativePath
                ] = previousFiles[
                    relativePath
                ]

                continue
            }

            const localPath =
                resolveProjectPath(
                    relativePath
                )

            try {
                await fs.promises.rm(
                    localPath,
                    {
                        force: true
                    }
                )

                console.log(
                    `🗑 Removed ${relativePath}`
                )
            } catch (
                error
            ) {
                console.error(
                    `⚠️ Could not remove ${relativePath}:`,
                    error.message
                )
            }
        }

        await writeManifest({
            commitSha:
                remote.commitSha,
            files:
                newFiles,
            syncedAt:
                Date.now()
        })

        const restartRequired =
            changedFiles.some(
                file => {
                    const ext =
                        path.extname(
                            file
                        ).toLowerCase()

                    return (
                        ext === '.js' ||
                        ext === '.cjs' ||
                        ext === '.mjs' ||
                        ext === '.json'
                    )
                }
            )

        console.log(
            `✅ Sync complete. Changed: ${changedFiles.length}, deleted: ${deletedFiles.length}`
        )

        return {
            changed:
                changedFiles.length > 0 ||
                deletedFiles.length > 0,
            restartRequired,
            newCommit: true,
            changedFiles,
            deletedFiles
        }
    } finally {
        syncInProgress = false
    }
}

async function restartForRaven() {
    console.log(
        '♻️ New code installed. Restarting Raven...'
    )

    running = false

    if (client) {
        try {
            await client.disconnect()
        } catch {}
    }

    process.exit(1)
}

async function githubSyncWatcher() {
    while (running) {
        await sleep(SYNC_INTERVAL)

        if (
            !running ||
            syncInProgress
        ) {
            continue
        }

        try {
            const result =
                await syncGitHubProject()

            if (result.restartRequired) {
                await restartForRaven()
                return
            }
        } catch (error) {
            logAxiosError(
                '❌ GitHub sync error:',
                error
            )

            console.error(
                'ℹ️ Current Raven process continues running.'
            )
        }
    }
}

async function githubReadJson(
    remotePath,
    fallback
) {
    try {
        const response =
            await axios.get(
                apiUrl(
                    `contents/${remotePath}?ref=${encodeURIComponent(
                        GITHUB_BRANCH
                    )}`
                ),
                {
                    headers:
                        githubHeaders(),
                    timeout: 30000
                }
            )

        const decoded =
            Buffer.from(
                response.data.content.replace(
                    /\n/g,
                    ''
                ),
                'base64'
            ).toString('utf8')

        return JSON.parse(decoded)
    } catch (error) {
        if (
            error.response &&
            error.response.status === 404
        ) {
            return fallback
        }

        logAxiosError(
            `❌ GitHub READ failed: ${remotePath}`,
            error
        )

        throw error
    }
}

async function githubWriteJson(
    remotePath,
    data,
    message
) {
    const url =
        apiUrl(
            `contents/${remotePath}`
        )

    uploadLog(
        `GitHub WRITE start: ${remotePath}`
    )

    let sha = null

    try {
        const existing =
            await axios.get(
                url,
                {
                    headers:
                        githubHeaders(),
                    params: {
                        ref:
                            GITHUB_BRANCH
                    },
                    timeout: 30000
                }
            )

        sha =
            existing.data.sha
    } catch (error) {
        if (
            !error.response ||
            error.response.status !== 404
        ) {
            logAxiosError(
                `❌ GitHub existing-file READ failed: ${remotePath}`,
                error
            )

            throw error
        }
    }

    const body = {
        message,
        branch:
            GITHUB_BRANCH,
        content:
            Buffer.from(
                JSON.stringify(
                    data,
                    null,
                    2
                ),
                'utf8'
            ).toString('base64')
    }

    if (sha) {
        body.sha = sha
    }

    try {
        const response =
            await axios.put(
                url,
                body,
                {
                    headers:
                        githubHeaders(),
                    timeout: 30000
                }
            )

        uploadLog(
            `GitHub WRITE success: ${remotePath} | ${response.status}`
        )

        return response.data
    } catch (error) {
        logAxiosError(
            `❌ GitHub WRITE failed: ${remotePath}`,
            error
        )

        throw error
    }
}

async function ensureGithubDatabase() {
    const requests =
        await githubReadJson(
            REQUESTS_FILE,
            null
        )

    if (requests === null) {
        await githubWriteJson(
            REQUESTS_FILE,
            [],
            'Initialize upload requests'
        )
    }

    const results =
        await githubReadJson(
            RESULTS_FILE,
            null
        )

    if (results === null) {
        await githubWriteJson(
            RESULTS_FILE,
            [],
            'Initialize upload results'
        )
    }

    console.log(
        '✅ GitHub database ready.'
    )
}

function normalizeText(value) {
    return String(
        value || ''
    ).trim()
}

function extractUploadLink(text) {
    const matches =
        normalizeText(text).match(
            /https?:\/\/t\.me\/[A-Za-z0-9_/?=-]+/gi
        )

    return matches &&
        matches.length
        ? matches[0]
        : null
}

function getMessageId(message) {
    return Number(
        message &&
        message.id ||
        0
    )
}

async function getLatestUploaderMessageId() {
    const messages =
        await client.getMessages(
            UPLOADER_BOT,
            {
                limit: 1
            }
        )

    return messages &&
        messages.length
        ? getMessageId(
            messages[0]
        )
        : 0
}

async function waitForUploaderLink(
    afterId,
    timeout
) {
    const started =
        Date.now()

    uploadLog(
        `Waiting for uploader link after message ${afterId}`
    )

    while (
        Date.now() -
            started <
        timeout
    ) {
        const messages =
            await client.getMessages(
                UPLOADER_BOT,
                {
                    limit: 30
                }
            )

        for (
            const message of
            (
                messages ||
                []
            ).reverse()
        ) {
            const messageId =
                getMessageId(
                    message
                )

            if (
                messageId <=
                afterId
            ) {
                continue
            }

            const link =
                extractUploadLink(
                    message.message ||
                    message.text ||
                    ''
                )

            if (link) {
                uploadLog(
                    `Uploader link received from message ${messageId}`
                )

                return {
                    link,
                    messageId
                }
            }
        }

        await sleep(
            UPLOADER_POLL_INTERVAL
        )
    }

    throw new Error(
        'Uploader link timeout'
    )
}

async function forwardBridgeMessageToUploader(
    messageId
) {
    const numericMessageId =
        Number(messageId)

    if (
        !numericMessageId
    ) {
        throw new Error(
            'Invalid Bridge message ID'
        )
    }

    uploadLog(
        `Forwarding Bridge message ${numericMessageId} to ${UPLOADER_BOT}`
    )

    try {
        const result =
            await client.forwardMessages(
                UPLOADER_BOT,
                {
                    messages: [
                        numericMessageId
                    ],
                    fromPeer:
                        BRIDGE_CHAT_ID
                }
            )

        uploadLog(
            `Bridge message ${numericMessageId} forwarded successfully`
        )

        return result
    } catch (error) {
        console.error(
            `❌ Telegram forward failed for Bridge message ${numericMessageId}`
        )

        console.error(
            JSON.stringify(
                {
                    message:
                        error?.message ||
                        null,
                    name:
                        error?.name ||
                        null,
                    code:
                        error?.code ||
                        null,
                    errorMessage:
                        error?.errorMessage ||
                        null
                },
                null,
                2
            )
        )

        throw error
    }
}

async function loadRequests() {
    const data =
        await githubReadJson(
            REQUESTS_FILE,
            []
        )

    return Array.isArray(data)
        ? data
        : []
}

async function loadResults() {
    const data =
        await githubReadJson(
            RESULTS_FILE,
            []
        )

    return Array.isArray(data)
        ? data
        : []
}

async function saveRequests(
    requests
) {
    await githubWriteJson(
        REQUESTS_FILE,
        requests,
        'Update upload requests'
    )
}

async function saveResults(
    results
) {
    await githubWriteJson(
        RESULTS_FILE,
        results,
        'Update upload results'
    )
}

async function updateRequest(
    requestId,
    patch
) {
    const requests =
        await loadRequests()

    const index =
        requests.findIndex(
            item =>
                String(item.id) ===
                String(requestId)
        )

    if (index < 0) {
        throw new Error(
            `Request not found: ${requestId}`
        )
    }

    requests[index] = {
        ...requests[index],
        ...patch,
        updatedAt:
            Date.now()
    }

    await saveRequests(
        requests
    )
}

async function addResult(result) {
    const results =
        await loadResults()

    const index =
        results.findIndex(
            item =>
                String(
                    item.requestId
                ) ===
                String(
                    result.requestId
                )
        )

    if (index >= 0) {
        results[index] = {
            ...results[index],
            ...result,
            updatedAt:
                Date.now()
        }
    } else {
        results.push({
            ...result,
            createdAt:
                Date.now()
        })
    }

    await saveResults(
        results
    )
}

async function markRequestFailed(
    request,
    error
) {
    const errorText =
        error?.message ||
        'Unknown upload error'

    try {
        await addResult({
            requestId:
                request.id,
            userId:
                request.userId ||
                null,
            chatId:
                request.chatId ||
                null,
            mode:
                request.mode ||
                null,
            status:
                'failed',
            error:
                errorText,
            failedAt:
                Date.now()
        })
    } catch (saveError) {
        logAxiosError(
            `❌ Failed to save upload error result: ${request.id}`,
            saveError
        )
    }

    try {
        await updateRequest(
            request.id,
            {
                status:
                    'failed',
                error:
                    errorText,
                failedAt:
                    Date.now()
            }
        )
    } catch (saveError) {
        logAxiosError(
            `❌ Failed to update failed request: ${request.id}`,
            saveError
        )
    }
}

async function processRequest(
    request
) {
    const requestId =
        request.id

    uploadLog(
        `Starting request ${requestId} | mode=${request.mode} | files=${Array.isArray(request.files) ? request.files.length : 0}`
    )

    try {
        const files =
            Array.isArray(
                request.files
            )
                ? request.files
                : []

        if (!files.length) {
            throw new Error(
                'Request contains no files'
            )
        }

        try {
            await updateRequest(
                requestId,
                {
                    status:
                        'processing',
                    processingStartedAt:
                        Date.now()
                }
            )

            uploadLog(
                `Request ${requestId} marked as processing`
            )
        } catch (error) {
            logAxiosError(
                `❌ Could not mark request ${requestId} as processing`,
                error
            )

            throw new Error(
                `GitHub request status update failed: ${error.message}`
            )
        }

        let result = null

        if (
            request.mode ===
            'single'
        ) {
            const baseline =
                await getLatestUploaderMessageId()

            uploadLog(
                `Uploader baseline: ${baseline}`
            )

            await forwardBridgeMessageToUploader(
                files[0].messageId
            )

            result =
                await waitForUploaderLink(
                    baseline,
                    REQUEST_TIMEOUT
                )
        } else if (
            request.mode ===
            'group'
        ) {
            let lastLink = null

            let lastMessageId =
                await getLatestUploaderMessageId()

            uploadLog(
                `Group uploader baseline: ${lastMessageId}`
            )

            for (
                let index = 0;
                index < files.length;
                index++
            ) {
                const file =
                    files[index]

                uploadLog(
                    `Processing group file ${index + 1}/${files.length} | Bridge message ${file.messageId}`
                )

                await forwardBridgeMessageToUploader(
                    file.messageId
                )

                const response =
                    await waitForUploaderLink(
                        lastMessageId,
                        REQUEST_TIMEOUT
                    )

                lastLink =
                    response.link

                lastMessageId =
                    response.messageId

                uploadLog(
                    `Group file ${index + 1}/${files.length} completed`
                )
            }

            result = {
                link:
                    lastLink,
                messageId:
                    lastMessageId
            }
        } else {
            throw new Error(
                `Unsupported mode: ${request.mode}`
            )
        }

        if (
            !result ||
            !result.link
        ) {
            throw new Error(
                'Uploader did not return a valid link'
            )
        }

        uploadLog(
            `Uploader processing completed for ${requestId}`
        )

        try {
            await addResult({
                requestId:
                    requestId,
                userId:
                    request.userId ||
                    null,
                chatId:
                    request.chatId ||
                    null,
                mode:
                    request.mode,
                status:
                    'completed',
                link:
                    result.link,
                filesCount:
                    files.length,
                completedAt:
                    Date.now()
            })

            uploadLog(
                `Result saved for ${requestId}`
            )
        } catch (error) {
            logAxiosError(
                `❌ Result save failed for ${requestId}`,
                error
            )

            throw new Error(
                `Upload completed but result could not be saved: ${error.message}`
            )
        }

        try {
            await updateRequest(
                requestId,
                {
                    status:
                        'completed',
                    resultLink:
                        result.link,
                    completedAt:
                        Date.now()
                }
            )

            uploadLog(
                `Request ${requestId} marked completed`
            )
        } catch (error) {
            logAxiosError(
                `❌ Final request update failed for ${requestId}`,
                error
            )
        }

        console.log(
            `✅ Upload completed: ${requestId}`
        )
    } catch (error) {
        console.error(
            `❌ Upload failed: ${requestId}`,
            error.message
        )

        if (
            error?.response
        ) {
            logAxiosError(
                `❌ Upload HTTP error: ${requestId}`,
                error
            )
        }

        await markRequestFailed(
            request,
            error
        )
    }
}

async function processQueue() {
    if (
        processingRequest ||
        !running
    ) {
        return
    }

    processingRequest =
        true

    try {
        const requests =
            await loadRequests()

        const request =
            requests.find(
                item =>
                    item &&
                    (
                        item.status ===
                        'ready' ||
                        item.status ===
                        'queued'
                    )
            )

        if (request) {
            await processRequest(
                request
            )
        }
    } catch (error) {
        console.error(
            '❌ Queue error:',
            error.message
        )

        if (error?.response) {
            logAxiosError(
                '❌ Queue HTTP error:',
                error
            )
        }
    } finally {
        processingRequest =
            false
    }
}

async function uploadWatcher() {
    while (running) {
        try {
            await processQueue()
        } catch (error) {
            console.error(
                '❌ Upload watcher error:',
                error.message
            )
        }

        await sleep(
            POLL_INTERVAL
        )
    }
}

async function start() {
    console.log(
        '🤖 Anime Faarsi Raven Upload System'
    )

    await ensureLineFile()

    client =
        new TelegramClient(
            new StringSession(
                SESSION
            ),
            API_ID,
            API_HASH,
            {
                connectionRetries: 5
            }
        )

    await client.connect()

    if (
        !(await client.isUserAuthorized())
    ) {
        throw new Error(
            'Telegram Session is not authorized'
        )
    }

    const me =
        await client.getMe()

    console.log(
        `✅ Telegram connected: ${me.username || me.id}`
    )

    try {
        await ensureGithubDatabase()

        console.log(
            '✅ GitHub database connected.'
        )
    } catch (error) {
        console.error(
            '⚠️ GitHub database initialization failed:',
            error.message
        )

        if (error?.response) {
            logAxiosError(
                '⚠️ GitHub initialization HTTP error:',
                error
            )
        }

        console.log(
            'ℹ️ Raven will continue running.'
        )
    }

    try {
        await client.sendMessage(
            'me',
            {
                message:
                    '✅ Raven Upload System is online.\n' +
                    '🔐 Protected line.js enabled.\n' +
                    '🗄 GitHub database connected.\n' +
                    '🔄 GitHub Auto Sync enabled.'
            }
        )
    } catch (error) {
        console.error(
            'Saved Messages notification failed:',
            error.message
        )
    }

    running = true

    uploadWatcher().catch(
        error =>
            console.error(
                'Upload watcher stopped:',
                error
            )
    )

    githubSyncWatcher().catch(
        error =>
            console.error(
                'GitHub sync watcher stopped:',
                error
            )
    )

    console.log(
        '✅ Upload watcher started.'
    )

    console.log(
        '✅ GitHub Auto Sync started.'
    )

    console.log(
        '🔐 Lines 1-19 are protected by line.js.'
    )

    process.stdin.resume()
}

start().catch(
    error => {
        console.error(
            '❌ FATAL START ERROR:'
        )

        console.error(
            error
        )

        process.exit(1)
    }
)