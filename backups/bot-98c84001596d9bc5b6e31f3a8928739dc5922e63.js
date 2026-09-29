const ADMIN_ID = 2048310529;
const OMDB_API_KEY = 'c984bcec';
let DEFAULT_DOWNLOAD_URL = 'https://t.me/dubb_anime';

const GITHUB_OWNER = 'nafaduka902-gif';
const GITHUB_REPO = 'data-bot';
const GITHUB_FILE = 'set.json';
const GITHUB_CHANNEL_FILE = 'channelpost.json';
const GITHUB_WELCOME_FILE = 'welcome.json';
const GITHUB_ADMIN_FILE = 'admin.json';
const GITHUB_WARNINGS_FILE = 'warnings.json';
const GITHUB_FILTER_FILE = 'filter.json';
const GITHUB_NOFILTER_FILE = 'nofilter.json';
const GITHUB_GROUPS_FILE = 'groups.json';
const GITHUB_SCHEDULE_FILE = 'settimep.json';
const GITHUB_BRANCH = 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_BACKUP_DIR = process.env.GITHUB_BACKUP_DIR || 'backups';
const updateBotStates = new Map();
const GITHUB_NOW_FILE = `${GITHUB_BACKUP_DIR}/now.json`;

const UPDATE_ADMIN_ID = 2048310529;



const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH || 'source/bot.js';

const BOT_USERNAME = 'AnimeFaarsibot';

const setStates = new Map();
const sequenceStates = new Map();
const channelSearchStates = new Map();
const channelAddStates = new Map();
const channelEditStates = new Map();
const welcomeEditStates = new Map();
const scheduleStates = new Map();
const uploaderStates = new Map();
const fixPostStates = new Map();
const managerStates = new Map();
const groupSettingsCacheV1 = new Map();
const jsonStoreCacheV1 = new Map();

const runAIStates = new Map();
const runAIPendingChanges = new Map();

const GROQ_API_URL =
  'https://api.groq.com/openai/v1/chat/completions';

const GROQ_MODEL =
  'openai/gpt-oss-120b';

let githubQueueV1 = Promise.resolve();
let githubChannelQueueV1 = Promise.resolve();
let githubWelcomeQueueV1 = Promise.resolve();
let githubExtraQueueV1 = Promise.resolve();

const DEFAULT_WELCOME_TEXT = `سلام {user}، به گروپ {chat} خوش آمدید!
لطفا قوانین را مطالعه کرده و رعایت بفرمایید.
برای باز شدن دسترسی بر روی خواندن قوانین ، کلیک کنید.

از اینجا نشستم و آرزو نمودم ... بر خالق خویش رو نمودم
ای کاش که قانون خریت ... جاری بشود به آدمیت`;

const DEFAULT_RULES_TEXT = `🌺 سلام به شما دوست عزیز 🌺
🎊 شما در حال حاضر عضو گروهی هستید که برای انجمن انیمه فارسی ایجاد، و در دسترس تمام دوستداران انیمه و مانگا قرار گرفته است. 🎊

🚫 برای ایجاد محیطی مناسب برای فعالیت خود و سایر کاربران، لطفا قوانین گروه را مطالعه و به دقت اجرا فرمایید. 🚫

- قوانین گروه :

1-⛔️ از توهین و بی احترامی (به هر شکلی یا دلیلی) به سایر اعضاء گروه، مدیران، خودداری فرمایید. (در بعضی از موارد بن مستقیم در پی دارد.)
همچنین از استفاده هرگونه الفاظ رکیک و خارج از عرف (به منظور بی‌احترامی یا غیره) در گروه بپرهیزید.

2-⛔️ هرگونه بحث و توهین مذهبی، قومی، سیاسی، نژادی به هر شکل (مرتبط یا غیر مرتبط با انیمه و مانگا) در این گروه ممنوع می باشد.

3-⛔️ درصورتیکه پست شما حاوی اسپویل بوده و قسمتی از داستان انیمه یا مانگا را برای سایر اعضای گروه فاش می کند حتما از اسپویلر تلگرام استفاده کنید تا باعث ناراحتی سایر دوستانی که ممکن است انیمه یا قسمتی از آن را ندیده باشند نشوید.
لازم به ذکر است که پست‌های خاطی به‌محض مشاهده توسط مدیران حذف خواهند شد و درصورت تکرار با فرد ارسال کننده برخورد خواهد شد.

4-⛔️ از کل کل و بحث بی مورد با سایر کاربران و مدیران و عمومی کردن مشکلات شخصی که نتیجه‌ای جز کدورت و برهم خوردن آرامش گروه در پی دارد، خودداری نمایید.
در این صورت مدیران گروه اقدام به برخورد با شما میکنند، در این موقعیت اهمیت ندارد شما بحث را ایجاد کردید یا آن را ادامه دادید.

5-⛔️ از اسپم کردن به هر شکلی، خودداری فرمایید.

6-⛔️ از ارسال مطالب، تصاویر، استیکرها، گیف‌های غیر اخلاقی و مستهجن، کلمات بی ادبانه یا رکیک، شوخی‌های جنسی، تصاویر افراد سیاسی یا کشوری جدا خودداری فرمایید.
توجه داشته باشید که حتی استفاده از کلمات مربوط به این موضوعات در گروه ممنوع می‌باشد.
ارسال گیف و یا استیکر‌های دارای خشونت، آزار و اذیت حیوانات و همچنین انسان، بن مستقیم در پی دارد.

☆ معرفی آثار "هنتای" و همچنین استفاده از اسامی آثار در گروه ممنوع است.
این گروه اقشار سنی مختلفی را در بر می‌گیرد و نیازمند این است که متوجه موضوع اصلی این گروه، و همچنین نوع رفتار و فرهنگی که در این گروه نشان می‌د‌هید باشید.

7-⛔️ از تبلیغات تجاری، سیاسی و انتخاباتی، سایت‌ها، گروه‌ها، فرستادن عکسی که در اون نام سایت و یا تیمی بجز آنیمه فارسی درج شده و یا نام بردن، فرستادن لینک سایت و پست کانال‌های انیمه‌ای دیگر غیر وابسته به انیمه فارسی، کانال‌هایی که موجب دور زدن قوانین می‌شوند ممنوع است، فوروارد و تبلیغ سایت‌ها و کانال‌ها و گروه‌های وابسته به انیمه فارسی که در آدرسنامه فهرست کامل آنها قرار دارد مجاز است.

8-⛔️ از ایجاد مزاحمت برای سایر کاربران در چت شخصی (پیوی) به هر دلیلی بپرهیزید. درخواست یا ارسال شماره تلفن، ارسال درخواست دوستی برای خانم‌های محترم عضو گروه و اشتباه گرفتن این گروه با محل دوستیابی نمونه‌هایی از ایجاد مزاحمت برای سایر کاربران می‌باشد.

9-⛔️ ملاک تشخیص درستی اجرای قوانین توسط کاربران و موارد نقض آنها تنها تشخیص مدیران بوده و هریک از آنها در صورت مشاهده زیر پا گذاشتن قوانین می توانند نسبت به اخطار یا حذف کاربر از گروه اقدام نمایند.

10-⛔️ از بحث و یا توضیح خواستن درباره نوع برخورد یا مدیریت مسئولین گروه بصورت عمومی بپرهیزید. در صورت اعتراض به نحوه مدیریت گروه و یا برخورد مدیران، مراتب اعتراض خود را بصورت خصوصی ( به @tizpc ) اطلاع دهید.
در صورت موجه‌ نبودن اعتراض شما به نحوه مدیریت، اعتراض شما به جایی نخواهد رسید.

- در صورت مشاهده‌ی تخلف، پیام متخلف را با دستور @admin (بدون هیچ اضافاتی) به ادمین‌ها گزارش دهید.

🛑 مدیران گروه مسئولیتی در رابطه با مطالعه نکردن قوانین گروه توسط شما ندارند و از اعتراض در این رابطه جدا خودداری فرمایید.

🎊 انیمه فارسی ورودتان به گروه را تبریک و اوقات خوشی را برای شما آرزو می‌کند.`;

function isAdmin(ctx, permissionOverride = '') {
  const userId = Number(ctx.from?.id);

  if (userId === ADMIN_ID) {
    return true;
  }

  const records =
    jsonStoreCacheV1.get(
      GITHUB_ADMIN_FILE
    ) || [];
  const record =
    records.find(
      item =>
        Number(item.userId) === userId &&
        item.enabled !== false
    );

  if (!record) {
    return false;
  }

  const permission =
    permissionOverride ||
    requestedPermission(ctx);
  const permissions =
    Array.isArray(record.permissions)
      ? record.permissions
      : [];

  if (
    permissions.includes('*') ||
    permissions.includes('full')
  ) {
    return true;
  }

  if (permission === 'any') {
    return permissions.length > 0;
  }

  return permissions.includes(permission);
}

function requestedPermission(ctx) {
  const value = String(
    ctx.message?.text ||
      ctx.callbackQuery?.data ||
      ''
  ).toLowerCase();

  if (/\/(warn|warnings|unwarn|resetwarn|warnlimit|warnclearall)\b|warning/i.test(value)) {
    return 'warnings';
  }
  if (/\/(filter|linkfilter)\b|link filter|لینک/i.test(value)) {
    return 'filter';
  }
  if (/\/nofilter\b|nofilter|no filter/i.test(value)) {
    return 'nofilter';
  }
  if (/\/(welcome|rules)\b|welcome|قوانین/i.test(value)) {
    return 'welcome';
  }
  if (/\/(userid)\b|userinfo/i.test(value)) {
    return 'userInfo';
  }
  if (/\/(settimep|settimeplist|fixpost|destinationadd)\b|fix post|scheduled post|schedule:/i.test(value)) {
    return 'postTools';
  }
  if (/\/(sequence|finish|uploader)\b|sequence|uploader|آپلود/i.test(value)) {
    return 'fileTools';
  }
  if (/\/(setmovie|setseries|setanime|setanimation|setanimition|set)\b|🎬|📺|🇯🇵|🎨/i.test(value)) {
    return 'set';
  }
  if (/\/(admin|manageadmin)\b|manageadmin|مدیریت ادمین/i.test(value)) {
    return 'manageAdmins';
  }
  if (/search|جستجو|اضافه کردن انیمه/i.test(value)) {
    return 'searchTools';
  }
  if (/post tools|File Tools|📝/i.test(value)) {
    return 'postTools';
  }
  if (/group|مدیریت گروه|گروه/i.test(value)) {
    return 'group';
  }

  return 'any';
}

async function safeDelete(ctx, messageId) {
  try {
    await ctx.telegram.deleteMessage(
      ctx.chat.id,
      messageId
    );
  } catch {}
}


const USER_COMMANDS_TEXT = `
<b><u>🎬 Anime Faarsi Bot</u></b>

<b><u>📌 تمامی قابلیت‌ها و دستورات ربات</u></b>
<b><u>در گروه زیر قابل اجرا می‌باشند:</u></b>

<b><u>🎞️ Anime Faarsi Chat</u></b>
🔗 https://t.me/Anime_FaarsiChat

<b><u>⚡ برای استفاده از دستورات ربات،</u></b>
<b><u>وارد گروه شوید و دستورات را همان‌جا اجرا کنید.</u></b>
`;



function infoEscapeHtml(value) {
  return String(value ?? 'نامشخص')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function infoFormatBytes(bytes) {
  if (
    typeof bytes !== 'number' ||
    !Number.isFinite(bytes) ||
    bytes < 0
  ) {
    return 'نامشخص';
  }

  const units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB'
  ];

  let value = bytes;
  let index = 0;

  while (
    value >= 1024 &&
    index < units.length - 1
  ) {
    value /= 1024;
    index++;
  }

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function infoFormatUptime(seconds) {
  if (
    typeof seconds !== 'number' ||
    !Number.isFinite(seconds)
  ) {
    return 'نامشخص';
  }

  let total =
    Math.floor(seconds);

  const days =
    Math.floor(total / 86400);

  total %= 86400;

  const hours =
    Math.floor(total / 3600);

  total %= 3600;

  const minutes =
    Math.floor(total / 60);

  const secs =
    total % 60;

  return `${days} روز، ${hours} ساعت، ${minutes} دقیقه، ${secs} ثانیه`;
}

function detectRuntimeInfo() {
  const result = {
    platform: 'نامشخص',
    url: 'نامشخص'
  };

  try {
    const env = process.env || {};
    const keys = Object.keys(env);

    /*
     * اول هر متغیری که خود سرویس برای
     * معرفی پلتفرم قرار داده باشد.
     */
    const platformKeys = [
      'PLATFORM',
      'PLATFORM_NAME',
      'HOSTING_PLATFORM',
      'HOSTING_PROVIDER',
      'PROVIDER'
    ];

    for (const key of platformKeys) {
      if (
        env[key] &&
        String(env[key]).trim()
      ) {
        result.platform =
          String(env[key]).trim();

        break;
      }
    }

    /*
     * اگر نام عمومی پلتفرم وجود نداشت،
     * از Environment Variable های موجود
     * یک نشانه قابل تشخیص استخراج می‌کنیم.
     */
    if (result.platform === 'نامشخص') {
      for (const key of keys) {
        const value =
          env[key];

        if (
          typeof value !== 'string' ||
          !value
        ) {
          continue;
        }

        const name =
          key.toUpperCase();

        if (
          name.includes('PLATFORM') ||
          name.includes('HOSTING') ||
          name.includes('PROVIDER')
        ) {
          result.platform =
            `${key}: ${value}`;

          break;
        }
      }
    }

    /*
     * هر Environment Variable که URL معتبر
     * سرویس باشد بررسی می‌شود.
     */
    for (const key of keys) {
      const value =
        env[key];

      if (
        typeof value !== 'string' ||
        !value.trim()
      ) {
        continue;
      }

      if (
        /^https?:\/\/[^\s]+$/i.test(
          value.trim()
        )
      ) {
        const name =
          key.toUpperCase();

        if (
          name.includes('URL') ||
          name.includes('DOMAIN') ||
          name.includes('HOST') ||
          name.includes('ENDPOINT') ||
          name.includes('SERVICE') ||
          name.includes('APP')
        ) {
          result.url =
            value.trim();

          break;
        }
      }
    }

  } catch (error) {
    console.error(
      'RUNTIME DETECTION ERROR:',
      error
    );
  }

  return result;
}


// ==========================================
// FULL BOT EXPORT / IMPORT
// ==========================================

const FULL_BACKUP_FILE =
  `${GITHUB_BACKUP_DIR}/full-bot-backup.json`;

const FULL_BACKUP_LOCAL_FILES = [
  GITHUB_FILE,
  GITHUB_CHANNEL_FILE,
  GITHUB_WELCOME_FILE,
  GITHUB_ADMIN_FILE,
  GITHUB_WARNINGS_FILE,
  GITHUB_FILTER_FILE,
  GITHUB_NOFILTER_FILE,
  GITHUB_GROUPS_FILE,
  GITHUB_SCHEDULE_FILE
];


// ==========================================
// GITHUB GET FILE
// ==========================================

async function githubGetFile(filePath) {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  const url =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;

  const response = await axios.get(
    url,
    { headers }
  );

  return response.data;
}


// ==========================================
// GITHUB PUT FILE
// ==========================================

async function githubPutFile(
  filePath,
  content,
  message,
  existingSha = null
) {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  const url =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

  const payload = {
    message,
    content: Buffer.from(
      content,
      'utf8'
    ).toString('base64'),
    branch: GITHUB_BRANCH
  };

  if (existingSha) {
    payload.sha = existingSha;
  }

  const response = await axios.put(
    url,
    payload,
    { headers }
  );

  return response.data;
}


// ==========================================
// /export
// ==========================================

bot.command('export', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return ctx.reply(
        '❌ Only the main owner can use this command.'
      );
    }

    const progress = await ctx.reply(
      '⏳ Creating full bot backup...'
    );

    // ======================================
    // GET CURRENT bot.js
    // ======================================

    const botFile =
      await githubGetFile(
        GITHUB_FILE_PATH
      );

    const botSource =
      Buffer.from(
        botFile.content.replace(/\s/g, ''),
        'base64'
      ).toString('utf8');


    // ======================================
    // GET ALL DATABASES
    // ======================================

    const databases = {};

    for (
      const fileName of FULL_BACKUP_LOCAL_FILES
    ) {
      try {
        const file =
          await githubGetFile(fileName);

        const decoded =
          Buffer.from(
            file.content.replace(/\s/g, ''),
            'base64'
          ).toString('utf8');

        databases[fileName] = {
          content: JSON.parse(decoded)
        };

      } catch (error) {
        databases[fileName] = {
          content: null,
          error: 'File not found'
        };
      }
    }


    // ======================================
    // CREATE FULL BACKUP
    // ======================================

    const backup = {
      backupType: 'FULL_BOT_BACKUP',
      backupVersion: 2,
      createdAt: new Date().toISOString(),

      bot: {
        username: BOT_USERNAME,
        adminId: ADMIN_ID,
        file: GITHUB_FILE_PATH,
        source: botSource
      },

      config: {
        defaultDownloadUrl:
          DEFAULT_DOWNLOAD_URL
      },

      defaults: {
        welcomeText:
          DEFAULT_WELCOME_TEXT,

        rulesText:
          DEFAULT_RULES_TEXT
      },

      databases
    };


    const backupContent =
      JSON.stringify(
        backup,
        null,
        2
      );


    // ======================================
    // CHECK EXISTING BACKUP
    // ======================================

    let existingSha = null;

    try {
      const existing =
        await githubGetFile(
          FULL_BACKUP_FILE
        );

      existingSha =
        existing.sha;

    } catch (error) {
      if (
        !error.response ||
        error.response.status !== 404
      ) {
        throw error;
      }
    }


    // ======================================
    // SAVE FULL BACKUP
    // ======================================

    await githubPutFile(
      FULL_BACKUP_FILE,
      backupContent,
      'Create full bot backup',
      existingSha
    );


    const rawUrl =
      `https://raw.githubusercontent.com/` +
      `${GITHUB_OWNER}/${GITHUB_REPO}/` +
      `${GITHUB_BRANCH}/${FULL_BACKUP_FILE}`;


    // ======================================
    // SUCCESS
    // ======================================

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      progress.message_id,
      undefined,

      '✅ Full bot backup created successfully.\n\n' +

      '📦 Backup:\n' +
      rawUrl +
      '\n\n' +

      '📋 Backup contains:\n' +
      '🤖 Full bot.js\n' +
      '🗄️ All JSON databases\n' +
      '👥 Groups\n' +
      '🛡️ Admins & permissions\n' +
      '👋 Welcome & rules\n' +
      '⚠️ Warnings\n' +
      '🔍 Filters & no-filters\n' +
      '📢 Channel settings\n' +
      '⏰ Schedules\n' +
      '🔗 Download URL\n' +
      '⚙️ Bot configuration\n\n' +

      '🔐 Private credentials are excluded.'
    );

  } catch (error) {

    console.error(
      'full export:',
      error
    );

    await ctx.reply(
      '❌ Full export failed.\n\n' +
      (error.message ||
        'Please try again.')
    );
  }
});


// ==========================================
// /import
// ==========================================

bot.command('import', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return ctx.reply(
        '❌ Only the main owner can use this command.'
      );
    }

    const progress = await ctx.reply(
      '⏳ Loading full bot backup...'
    );


    // ======================================
    // LOAD BACKUP
    // ======================================

    const backupFile =
      await githubGetFile(
        FULL_BACKUP_FILE
      );

    const decoded =
      Buffer.from(
        backupFile.content.replace(/\s/g, ''),
        'base64'
      ).toString('utf8');

    const backup =
      JSON.parse(decoded);


    // ======================================
    // VALIDATE BACKUP
    // ======================================

    if (
      backup.backupType !==
      'FULL_BOT_BACKUP'
    ) {
      throw new Error(
        'Invalid full bot backup.'
      );
    }

    if (
      !backup.databases ||
      typeof backup.databases !== 'object'
    ) {
      throw new Error(
        'Backup databases are missing.'
      );
    }

    if (
      !backup.bot ||
      typeof backup.bot.source !== 'string'
    ) {
      throw new Error(
        'Backup bot.js source is missing.'
      );
    }


    // ======================================
    // RESTORE DATABASES FIRST
    // ======================================

    for (
      const fileName of FULL_BACKUP_LOCAL_FILES
    ) {

      const database =
        backup.databases[fileName];

      if (
        !database ||
        database.content === null ||
        database.content === undefined
      ) {
        continue;
      }

      let existingSha = null;

      try {

        const current =
          await githubGetFile(fileName);

        existingSha =
          current.sha;

      } catch (error) {

        if (
          !error.response ||
          error.response.status !== 404
        ) {
          throw error;
        }
      }


      await githubPutFile(
        fileName,

        JSON.stringify(
          database.content,
          null,
          2
        ),

        `Restore ${fileName} from full bot backup`,

        existingSha
      );
    }


    // ======================================
    // RESTORE DOWNLOAD URL
    // ======================================

    if (
      backup.config &&
      typeof backup.config.defaultDownloadUrl ===
        'string'
    ) {

      DEFAULT_DOWNLOAD_URL =
        backup.config.defaultDownloadUrl;
    }


    // ======================================
    // RESTORE WELCOME CACHE
    // ======================================

    try {

      if (
        backup.databases[
          GITHUB_WELCOME_FILE
        ]?.content !== undefined
      ) {

        jsonStoreCacheV1.set(
          GITHUB_WELCOME_FILE,

          backup.databases[
            GITHUB_WELCOME_FILE
          ].content
        );
      }

    } catch (_) {}


    // ======================================
    // RESTORE bot.js LAST
    // ======================================
    // This is intentionally done last.
    // If GitHub Actions deploys source/bot.js,
    // the restored code becomes the active version.

    let currentBotSha = null;

    try {

      const currentBot =
        await githubGetFile(
          GITHUB_FILE_PATH
        );

      currentBotSha =
        currentBot.sha;

    } catch (error) {

      if (
        !error.response ||
        error.response.status !== 404
      ) {
        throw error;
      }
    }


    await githubPutFile(
      GITHUB_FILE_PATH,

      backup.bot.source,

      'Restore bot.js from full bot backup',

      currentBotSha
    );


    // ======================================
    // SUCCESS
    // ======================================

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      progress.message_id,
      undefined,

      '✅ Full bot restore completed.\n\n' +

      '🤖 bot.js: restored\n' +
      '🗄️ JSON databases: restored\n' +
      '⚙️ Configuration: restored\n' +
      '🔗 Download URL: restored\n' +
      '👥 Groups: restored\n' +
      '🛡️ Admins & permissions: restored\n' +
      '👋 Welcome & rules: restored\n' +
      '⚠️ Warnings: restored\n' +
      '🔍 Filters & no-filters: restored\n' +
      '📢 Channel settings: restored\n' +
      '⏰ Schedules: restored\n\n' +

      '🚀 Restored bot.js was uploaded to GitHub.'
    );

  } catch (error) {

    console.error(
      'full import:',
      error
    );

    await ctx.reply(
      '❌ Full import failed.\n\n' +
      (error.message ||
        'Please try again.')
    );
  }
});




async function runGroqCodeAI(userRequest, currentSource) {
  if (!GROQ_API_KEY) {
    throw new Error(
      'GROQ_API_KEY is not configured.'
    );
  }

  const systemPrompt = `
You are the code modification AI for a Telegram bot running on NxCreator.

Your job is to modify the EXISTING bot.js source according to the administrator's request.

IMPORTANT RULES:

1. Do NOT rewrite the entire bot.
2. Modify only the code necessary for the requested change.
3. Preserve all existing functionality.
4. Never remove unrelated handlers.
5. Never expose secrets, API keys, tokens or environment values.
6. NxCreator restrictions:
   - Do not use require
   - Do not use import
   - Do not create a new Telegraf instance
   - Do not use bot.launch()
   - Do not use npm
   - axios is already available globally
   - bot is already available globally
7. Return JSON ONLY.
8. The JSON must contain:
   explanation
   oldCode
   newCode
9. oldCode must be an EXACT unique substring from the supplied source.
10. newCode must replace oldCode directly.
11. If the request cannot be safely implemented, return:
{
  "explanation": "reason",
  "oldCode": "",
  "newCode": ""
}

The administrator will manually approve the change before it is applied.
`;

  const response =
    await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content:
              'ADMIN REQUEST:\\n' +
              userRequest +
              '\\n\\nCURRENT BOT.JS:\\n' +
              currentSource
          }
        ]
      },
      {
        headers: {
          Authorization:
            'Bearer ' + GROQ_API_KEY,
          'Content-Type':
            'application/json'
        },
        timeout: 120000
      }
    );

  const raw =
    response.data?.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error(
      'Groq returned an empty response.'
    );
  }

  let cleaned = raw.trim();

  cleaned = cleaned
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const result =
    JSON.parse(cleaned);

  if (
    typeof result.explanation !== 'string' ||
    typeof result.oldCode !== 'string' ||
    typeof result.newCode !== 'string'
  ) {
    throw new Error(
      'Invalid AI response format.'
    );
  }

  if (
    !result.oldCode ||
    !result.newCode
  ) {
    throw new Error(
      result.explanation ||
      'AI could not safely determine the required code change.'
    );
  }

  const occurrences =
    currentSource.split(
      result.oldCode
    ).length - 1;

  if (occurrences !== 1) {
    throw new Error(
      'AI selected code that is not uniquely identifiable. ' +
      'Change was rejected for safety.'
    );
  }

  const newSource =
    currentSource.replace(
      result.oldCode,
      result.newCode
    );

  return {
    explanation:
      result.explanation,
    oldCode:
      result.oldCode,
    newCode:
      result.newCode,
    newSource
  };
}


bot.command('runaiicmd', async (ctx) => {
  try {
    if (
      Number(ctx.from.id) !== UPDATE_ADMIN_ID
    ) {
      return;
    }

    runAIStates.set(
      ctx.chat.id,
      {
        active: true
      }
    );

    await ctx.reply(
      '🤖 گفت‌وگو با عالیجناب سخنگوی هوش مصنوعی شروع شد.\n\n' +
      'تغییری که می‌خواهید در ربات ایجاد شود را توضیح دهید.'
    );

  } catch (error) {
    console.error(
      'runaiicmd:',
      error
    );
  }
});



bot.command('runaicmdoff', async (ctx) => {
  try {
    if (
      Number(ctx.from.id) !== UPDATE_ADMIN_ID
    ) {
      return;
    }

    runAIStates.delete(
      ctx.chat.id
    );

    await ctx.reply(
      '🔴 حالت ویرایش هوشمند خاموش شد.'
    );

  } catch (error) {
    console.error(
      'runaicmdoff:',
      error
    );
  }
});





bot.command(
  'info',
  async ctx => {
    try {
      let memory = {};

      try {
        memory =
          process.memoryUsage();
      } catch {
        memory = {};
      }

      const runtime =
        detectRuntimeInfo();

      let nodeVersion =
        'نامشخص';

      let operatingSystem =
        'نامشخص';

      let architecture =
        'نامشخص';

      let processId =
        'نامشخص';

      let processUptime =
        'نامشخص';

      try {
        nodeVersion =
          process.version ||
          'نامشخص';

        operatingSystem =
          process.platform ||
          'نامشخص';

        architecture =
          process.arch ||
          'نامشخص';

        processId =
          process.pid ||
          'نامشخص';

        processUptime =
          infoFormatUptime(
            process.uptime()
          );
      } catch {}

      let availableMemory =
        'نامشخص';

      try {
        if (
          typeof process.availableMemory ===
          'function'
        ) {
          availableMemory =
            infoFormatBytes(
              process.availableMemory()
            );
        }
      } catch {}

      let cpu = {};

      try {
        cpu =
          process.cpuUsage();
      } catch {
        cpu = {};
      }

      const cpuUser =
        Number(cpu.user || 0) /
        1000000;

      const cpuSystem =
        Number(cpu.system || 0) /
        1000000;

      const rss =
        infoFormatBytes(
          memory.rss
        );

      const heapUsed =
        infoFormatBytes(
          memory.heapUsed
        );

      const heapTotal =
        infoFormatBytes(
          memory.heapTotal
        );

      const external =
        infoFormatBytes(
          memory.external
        );

      const arrayBuffers =
        infoFormatBytes(
          memory.arrayBuffers
        );

      const platform =
        infoEscapeHtml(
          runtime.platform
        );

      const os =
        infoEscapeHtml(
          operatingSystem
        );

      const arch =
        infoEscapeHtml(
          architecture
        );

      const node =
        infoEscapeHtml(
          nodeVersion
        );

      const pid =
        infoEscapeHtml(
          processId
        );

      const url =
        infoEscapeHtml(
          runtime.url
        );

      const message =
        `<b><u>اطلاعات ربات</u></b>

<b>پلتفرم:</b> ${platform}

<b>سیستم‌عامل:</b> ${os}

<b>معماری:</b> ${arch}

<b>نسخه Node.js:</b> ${node}

<b>Process ID:</b> ${pid}

<u>حافظه</u>

<b>RAM مصرفی:</b> ${rss}

<b>Heap استفاده‌شده:</b> ${heapUsed}

<b>Heap کل:</b> ${heapTotal}

<b>External Memory:</b> ${external}

<b>Array Buffers:</b> ${arrayBuffers}

<b>حافظه قابل دسترس:</b> ${infoEscapeHtml(availableMemory)}

<u>پردازنده</u>

<b>CPU User:</b> ${cpuUser.toFixed(2)} ثانیه

<b>CPU System:</b> ${cpuSystem.toFixed(2)} ثانیه

<u>وضعیت اجرا</u>

<b>Uptime:</b> ${infoEscapeHtml(processUptime)}

<u>میزبان</u>

<b>آدرس سرویس:</b> ${url}`;

      await ctx.reply(
        message,
        {
          parse_mode: 'HTML',
          link_preview_options: {
            is_disabled: true
          }
        }
      );

    } catch (error) {
      console.error(
        'INFO COMMAND ERROR:',
        error
      );

      /*
       * حتی اگر ارسال HTML مشکل داشت،
       * دوباره یک پیام ساده ارسال می‌کنیم.
       */
      try {
        await ctx.reply(
          'اطلاعات سیستم قابل دریافت است، اما نمایش کامل آن با خطا مواجه شد.'
        );
      } catch {}
    }
  }
);




bot.command(
  'help',
  async ctx => {
    await ctx.reply(
      USER_COMMANDS_TEXT,
      {
        parse_mode: 'HTML',
        link_preview_options: {
          is_disabled: true
        }
      }
    );
  }
);

bot.command(
  'delky',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const message =
      await ctx.reply(
        '⌨️',
        {
          reply_markup: {
            remove_keyboard: true
          }
        }
      );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await safeDelete(
      ctx,
      message.message_id
    );
  }
);



function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function mainKeyboard(){return{keyboard:[['Tools','Manage Admin']],resize_keyboard:true};}

function toolsKeyboard() {
  return {
    keyboard: [
      ['Search Tools', 'File Tools'],
      ['Post Tools', 'Post News'],
      ['👤User', '👥 Group'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function userKeyboard() {
  return {
    keyboard: [
      ['👤 UserInfo'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function groupKeyboard() {
  return {
    keyboard: [
      ['👋 Welcome', '🛡 Group Manager'],
      ['⚠️ Warning', '🔗 Link Filter'],
      ['🟢 NoFilter', '📋 Group Lists'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function welcomeKeyboard(enabled) {
  return {
    keyboard: [
      ['✏️ ویرایش Welcome', '📜 ویرایش قوانین'],
      ['👁 پیش‌نمایش', enabled ? '🔴 غیرفعال کردن' : '🟢 فعال کردن'],
      ['⏱ تنظیمات پاک‌سازی'],
      ['🗑 حذف تنظیمات'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function searchToolsKeyboard() {
  return {
    keyboard: [
      ['Find', 'Add X to Archive'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function postToolsKeyboard() {
  return {
    keyboard: [
      ['Movie', 'Series'],
      ['Anime', 'Animation'],
      ['🔧 Fix Post', '⏰ Scheduled Post'],
      ['📋 Scheduled List'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function fileToolsKeyboard() {
  return {
    keyboard: [
      ['📁 Sequence', '⬆️ Uploader'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function groupManagerKeyboard() {
  return {
    keyboard: [
      ['🔇 Mute', '🔊 Unmute'],
      ['🚫 Ban', '♻️ Unban'],
      ['👢 Kick', '🧹 Purge'],
      ['📌 Pin', '📍 Unpin'],
      ['🔒 Lock', '🔓 Unlock'],
      ['📋 Group Lists', '⚙️ Group Settings'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function warningKeyboard() {
  return {
    keyboard: [
      ['📋 لیست Warningها', '🔢 تعداد مجاز'],
      ['🧹 پاک کردن همه Warningها'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function filterKeyboard() {
  return {
    keyboard: [
      ['🟢 فعال‌سازی Filter', '🔴 غیرفعال‌سازی Filter'],
      ['📊 وضعیت Filter'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function noFilterKeyboard() {
  return {
    keyboard: [
      ['📋 لیست NoFilter', '🗑 حذف همه NoFilter'],
      ['➖ حذف لینک مجاز'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

function sequenceKeyboard() {
  return {
    keyboard: [
      ['🔙 Back To Menu', '✅ Done']
    ],
    resize_keyboard: true
  };
}

function setKeyboard() {
  return {
    keyboard: [
      ['Skip', 'Cancel'],
      ['🔙 Back To Menu']
    ],
    resize_keyboard: true
  };
}

async function mainMenu(ctx) {
  await ctx.reply(
    '<b>Owner Panell</b>',
    {
      parse_mode: 'HTML',
      reply_markup: mainKeyboard()
    }
  );
}

function normalizeCacheTitle(title) {
  return String(title || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function cacheType(type) {
  return String(type || '')
    .trim()
    .toLowerCase();
}

function githubHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

function githubUrl(file = GITHUB_FILE) {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file}`;
}

async function githubReadFileV1(file) {
  if (!GITHUB_TOKEN) {
    console.error(
      'GITHUB_TOKEN is missing'
    );

    return {
      records: [],
      sha: null,
      available: false
    };
  }

  try {
    const response =
      await axios.get(
        githubUrl(file),
        {
          headers: githubHeaders(),
          params: {
            ref: GITHUB_BRANCH
          }
        }
      );

    const encoded =
      response.data?.content || '';

    if (!encoded) {
      return {
        records: [],
        sha: response.data?.sha || null,
        available: true
      };
    }

    const cleaned =
      encoded.replace(/\s/g, '');

    const decoded =
      Buffer.from(
        cleaned,
        'base64'
      ).toString('utf8');

    let parsed = [];

    try {
      parsed = JSON.parse(decoded);
    } catch {
      parsed = [];
    }

    if (
      parsed &&
      !Array.isArray(parsed) &&
      Array.isArray(parsed.records)
    ) {
      parsed = parsed.records;
    }

    if (!Array.isArray(parsed)) {
      parsed = [];
    }

    return {
      records: parsed,
      sha: response.data?.sha || null,
      available: true
    };
  } catch (error) {
    const status =
      error?.response?.status;

    if (status === 404) {
      return {
        records: [],
        sha: null,
        available: true
      };
    }

    console.error(
      `GitHub read error (${file}):`,
      status,
      error?.response?.data ||
        error?.message
    );

    return {
      records: [],
      sha: null,
      available: false
    };
  }
}

async function githubReadCacheV1() {
  return githubReadFileV1(
    GITHUB_FILE
  );
}

async function githubWriteFileV1(
  file,
  records,
  queueType = 'set'
) {
  if (!GITHUB_TOKEN) {
    console.error(
      'GITHUB_TOKEN is missing'
    );

    return false;
  }

  const runWrite = async () => {
    const current =
      await githubReadFileV1(file);

    const content =
      JSON.stringify(
        records,
        null,
        2
      );

    const encoded =
      Buffer.from(
        content,
        'utf8'
      ).toString('base64');

    const body = {
      message:
        file === GITHUB_CHANNEL_FILE
          ? 'Update channelpost.json'
          : file === GITHUB_WELCOME_FILE
            ? 'Update welcome.json'
            : 'Update set.json',
      content: encoded,
      branch: GITHUB_BRANCH
    };

    if (current.sha) {
      body.sha = current.sha;
    }

    try {
      const response =
        await axios.put(
          githubUrl(file),
          body,
          {
            headers:
              githubHeaders()
          }
        );

      return Boolean(
        response.data
      );
    } catch (error) {
      const status =
        error?.response?.status;

      console.error(
        `GitHub write error (${file}):`,
        status,
        error?.response?.data ||
          error?.message
      );

      if (status === 409) {
        try {
          const retry =
            await githubReadFileV1(
              file
            );

          const retryRecords =
            [...retry.records];

          for (
            const item of records
          ) {
            let index = -1;

            if (
              file === GITHUB_FILE
            ) {
              index =
                retryRecords.findIndex(
                  existing =>
                    normalizeCacheTitle(
                      existing.searchTitle
                    ) ===
                      normalizeCacheTitle(
                        item.searchTitle
                      ) &&
                    cacheType(
                      existing.searchType
                    ) ===
                      cacheType(
                        item.searchType
                      )
                );
            } else if (
              file ===
              GITHUB_CHANNEL_FILE
            ) {
              index =
                retryRecords.findIndex(
                  existing =>
                    normalizeChannelName(
                      existing.name
                    ) ===
                      normalizeChannelName(
                        item.name
                      )
                );
            } else {
              index =
                retryRecords.findIndex(
                  existing =>
                    existing.kind ===
                      item.kind &&
                    String(
                      existing.userId || ''
                    ) ===
                      String(
                        item.userId || ''
                      )
                );
            }

            if (index >= 0) {
              retryRecords[index] = {
                ...retryRecords[index],
                ...item
              };
            } else {
              retryRecords.push(item);
            }
          }

          const retryContent =
            JSON.stringify(
              retryRecords,
              null,
              2
            );

          const retryEncoded =
            Buffer.from(
              retryContent,
              'utf8'
            ).toString(
              'base64'
            );

          const retryBody = {
            message:
              file === GITHUB_CHANNEL_FILE
                ? 'Update channelpost.json'
                : file === GITHUB_WELCOME_FILE
                  ? 'Update welcome.json'
                  : 'Update set.json',
            content:
              retryEncoded,
            branch:
              GITHUB_BRANCH
          };

          if (retry.sha) {
            retryBody.sha =
              retry.sha;
          }

          const retryResponse =
            await axios.put(
              githubUrl(file),
              retryBody,
              {
                headers:
                  githubHeaders()
              }
            );

          return Boolean(
            retryResponse.data
          );
        } catch (retryError) {
          console.error(
            `GitHub retry error (${file}):`,
            retryError?.response
              ?.status,
            retryError?.response
              ?.data ||
              retryError?.message
          );

          return false;
        }
      }

      return false;
    }
  };

  if (queueType === 'channel') {
    githubChannelQueueV1 =
      githubChannelQueueV1.then(
        runWrite
      );

    return githubChannelQueueV1;
  }

  if (queueType === 'welcome') {
    githubWelcomeQueueV1 =
      githubWelcomeQueueV1.then(
        runWrite
      );

    return githubWelcomeQueueV1;
  }

  githubQueueV1 =
    githubQueueV1.then(
      runWrite
    );

  return githubQueueV1;
}

async function githubWriteCacheV1(records) {
  return githubWriteFileV1(
    GITHUB_FILE,
    records,
    'set'
  );
}

async function readJsonStoreV1(file) {
  if (jsonStoreCacheV1.has(file)) {
    return jsonStoreCacheV1.get(file);
  }

  const result =
    await githubReadFileV1(file);
  const records =
    Array.isArray(result.records)
      ? result.records
      : [];

  jsonStoreCacheV1.set(
    file,
    records
  );

  return records;
}

async function writeJsonStoreV1(
  file,
  records
) {
  const safeRecords =
    Array.isArray(records)
      ? records
      : [];
  const saved =
    await githubWriteFileV1(
      file,
      safeRecords,
      'extra'
    );

  if (saved) {
    jsonStoreCacheV1.set(
      file,
      safeRecords
    );
  }

  return saved;
}

function adminPermissionList() {
  return [
    'group',
    'welcome',
    'warnings',
    'filter',
    'nofilter',
    'userInfo',
    'postTools',
    'fileTools',
    'searchTools',
    'set',
    'sequence',
    'manageAdmins'
  ];
}

function groupDefaults(chatId) {
  return {
    chatId: Number(chatId),
    welcomeEnabled: true,
    welcomeDeleteAfterSeconds: 120,
    joinNoticeDeleteAfterSeconds: 0,
    captchaEnabled: true,
    linkFilterEnabled: false,
    warningLimit: 3,
    warningAction: 'ban',
    locked: false
  };
}

async function getGroupSettingsV1(chatId) {
  const key = String(chatId);

  if (groupSettingsCacheV1.has(key)) {
    return groupSettingsCacheV1.get(key);
  }

  const records =
    await readJsonStoreV1(
      GITHUB_GROUPS_FILE
    );
  const record =
    records.find(
      item =>
        Number(item.chatId) ===
        Number(chatId)
    );
  const settings = {
    ...groupDefaults(chatId),
    ...(record || {})
  };

  groupSettingsCacheV1.set(
    key,
    settings
  );

  return settings;
}

async function saveGroupSettingsV1(
  chatId,
  patch
) {
  const records =
    await readJsonStoreV1(
      GITHUB_GROUPS_FILE
    );
  const current =
    await getGroupSettingsV1(chatId);
  const updated = {
    ...current,
    ...patch,
    chatId: Number(chatId),
    updatedAt:
      new Date().toISOString()
  };
  const index =
    records.findIndex(
      item =>
        Number(item.chatId) ===
        Number(chatId)
    );

  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...updated,
      kind: 'group'
    };
  } else {
    records.push({
      kind: 'group',
      ...updated
    });
  }

  const saved =
    await writeJsonStoreV1(
      GITHUB_GROUPS_FILE,
      records
    );

  if (saved) {
    groupSettingsCacheV1.set(
      String(chatId),
      updated
    );
  }

  return saved;
}

async function requireGroupModerator(ctx) {
  if (
    ctx.chat?.type !== 'group' &&
    ctx.chat?.type !== 'supergroup'
  ) {
    await ctx.reply(
      'این دستور فقط داخل گروه قابل استفاده است.'
    );
    return false;
  }

  if (
    Number(ctx.from?.id) === ADMIN_ID
  ) {
    return true;
  }

  try {
    const member =
      await ctx.telegram.getChatMember(
        ctx.chat.id,
        ctx.from.id
      );
    const allowed =
      member.status === 'creator' ||
      member.status === 'administrator';

    if (!allowed) {
      await ctx.reply(
        'این دستور فقط برای مدیران گروه است.'
      );
    }

    return allowed;
  } catch {
    await ctx.reply(
      'دسترسی مدیر گروه بررسی نشد؛ ربات باید در گروه دسترسی لازم را داشته باشد.'
    );
    return false;
  }
}

function messageLinkTarget(link) {
  const value = String(link || '').trim();
  let match =
    value.match(
      /(?:https?:\/\/)?t\.me\/(?:c\/)?([A-Za-z0-9_+-]+)\/(\d+)/i
    );

  if (!match) {
    match =
      value.match(
        /(?:https?:\/\/)?telegram\.me\/([A-Za-z0-9_]+)\/(\d+)/i
      );
  }

  if (!match) {
    return null;
  }

  let chatId = match[1];

  if (/^\d+$/.test(chatId) && value.includes('/c/')) {
    chatId = `-100${chatId}`;
  } else if (!chatId.startsWith('-')) {
    chatId = `@${chatId}`;
  }

  return {
    chatId,
    messageId: Number(match[2])
  };
}

function parseScheduleDelay(input) {
  const match =
    String(input || '')
      .trim()
      .match(/^([hd])(\d{1,3})$/i);

  if (!match) {
    return null;
  }

  const amount = Number(match[2]);

  if (
    !Number.isInteger(amount) ||
    amount < 1 ||
    amount > 365
  ) {
    return null;
  }

  const unit =
    match[1].toLowerCase();

  return {
    milliseconds:
      amount *
      (unit === 'h' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
    label:
      `${amount} ${unit === 'h' ? 'ساعت' : 'روز'}`
  };
}

function scheduleRecords(records) {
  return records.filter(
    item =>
      String(item.kind || '')
        .startsWith('scheduled:')
  );
}

function scheduleDestinations(records) {
  return records.filter(
    item =>
      String(item.kind || '')
        .startsWith('destination:')
  );
}

function scheduleKeyboard(destinations) {
  return {
    keyboard: [
      ...destinations.map(
        item => [item.name]
      ),
      ['✖️ لغو زمان‌بندی']
    ],
    resize_keyboard: true
  };
}

function formatRemaining(timestamp) {
  const remaining =
    Math.max(
      0,
      Number(timestamp) - Date.now()
    );
  const hours =
    Math.floor(remaining / 3600000);
  const days =
    Math.floor(hours / 24);
  const minutes =
    Math.floor(
      (remaining % 3600000) / 60000
    );
  const remHours = hours % 24;

  if (days > 0) {
    return `${days} روز و ${remHours} ساعت`;
  }

  if (hours > 0) {
    return `${hours} ساعت و ${minutes} دقیقه`;
  }

  return `${minutes} دقیقه`;
}

function formatScheduleItem(item) {
  const statusLabels = {
    pending: '⏳ در انتظار',
    sent: '✅ ارسال شده',
    error: '❌ خطا',
    cancelled: '⏸ لغو شده'
  };
  const preview =
    String(item.text || item.title || item.sourceLink || 'پست رسانه‌ای')
      .replace(/\s+/g, ' ')
      .slice(0, 180);
  const remaining =
    item.status === 'pending'
      ? formatRemaining(item.sendAt)
      : '—';

  return `<b>شناسه:</b> <code>${escapeHtml(item.id)}</code>
<b>محتوا:</b> ${escapeHtml(preview || 'پست رسانه‌ای')}
<b>زمان باقی‌مانده:</b> ${remaining}
<b>زمان ارسال:</b> ${escapeHtml(new Date(item.sendAt).toLocaleString('fa-IR', { timeZone: 'Asia/Kabul' }))}
<b>کانال:</b> ${escapeHtml(item.destinationName || item.destinationId)}
<b>وضعیت:</b> ${statusLabels[item.status] || '❓ نامشخص'}${item.error ? `\n<b>خطا:</b> ${escapeHtml(item.error)}` : ''}`;
}

function getMessagePayload(message) {
  const file = getSequenceFile(message);

  if (file) {
    return {
      sourceChatId:
        Number(message.chat?.id),
      sourceMessageId:
        Number(message.message_id),
      text: '',
      type: file.type,
      fileName: file.name
    };
  }

  const photo =
    Array.isArray(message.photo) &&
    message.photo.length
      ? message.photo[message.photo.length - 1]
      : null;

  if (photo) {
    return {
      sourceChatId:
        Number(message.chat?.id),
      sourceMessageId:
        Number(message.message_id),
      text: '',
      type: 'photo',
      fileName: 'photo'
    };
  }

  if (message.voice || message.video_note) {
    return {
      sourceChatId:
        Number(message.chat?.id),
      sourceMessageId:
        Number(message.message_id),
      text: '',
      type: message.voice
        ? 'voice'
        : 'video_note',
      fileName: message.voice
        ? 'voice'
        : 'video note'
    };
  }

  if (
    message.text ||
    message.caption
  ) {
    return {
      sourceChatId:
        Number(message.chat?.id),
      sourceMessageId:
        Number(message.message_id),
      text:
        message.text ||
        message.caption ||
        '',
      entities:
        message.entities ||
        message.caption_entities ||
        [],
      type: 'text',
      fileName: ''
    };
  }

  return null;
}

function detectSetRecordForPost(
  text,
  records
) {
  const haystack =
    String(text || '')
      .toLowerCase();

  return records
    .filter(
      item =>
        item.searchTitle ||
        item.title
    )
    .sort(
      (a, b) =>
        String(b.searchTitle || b.title).length -
        String(a.searchTitle || a.title).length
    )
    .find(item => {
      const names = [
        item.searchTitle,
        item.title
      ]
        .filter(Boolean)
        .map(value =>
          String(value)
            .toLowerCase()
            .trim()
        );

      return names.some(
        name =>
          name.length >= 3 &&
          haystack.includes(name)
      );
    }) || null;
}

function getFixPostEntities(
  text,
  existingEntities = []
) {
  const value = String(text || '');
  const additions = [];
  const patterns = [
    /^\s*[^\n]{1,180}\s*$/gm,
    /(?:IMDb|IMDB|ژانر|محصول|کشور|بازیگران|ستارگان|خلاصه داستان|وضعیت|فصل|قسمت|زیرنویس|دوبله فارسی)\s*[:：|]*/gi,
    /720p/gi
  ];

  for (const pattern of patterns) {
    let match;

    while ((match = pattern.exec(value))) {
      const span = {
        offset: match.index,
        length: match[0].length,
        type: 'bold'
      };
      const overlapsExisting =
        existingEntities.some(
          entity =>
            entity.offset <
              span.offset + span.length &&
            span.offset <
              entity.offset + entity.length
        );
      const alreadyBold =
        existingEntities.some(
          entity =>
            entity.type === 'bold' &&
            entity.offset === span.offset &&
            entity.length === span.length
        );

      if (
        span.length > 0 &&
        !overlapsExisting &&
        !alreadyBold &&
        !additions.some(
          item =>
            item.offset <
              span.offset + span.length &&
            span.offset <
              item.offset + item.length
        )
      ) {
        additions.push(span);
      }
    }
  }

  return [
    ...existingEntities,
    ...additions
  ].sort(
    (a, b) =>
      a.offset - b.offset ||
      b.length - a.length
  );
}

async function saveScheduleItem(item) {
  const records =
    await readJsonStoreV1(
      GITHUB_SCHEDULE_FILE
    );
  const key = `scheduled:${item.id}`;
  const index =
    records.findIndex(
      current =>
        current.kind === key
    );
  const savedItem = {
    ...item,
    kind: key,
    updatedAt:
      new Date().toISOString()
  };

  if (index >= 0) {
    records[index] = savedItem;
  } else {
    records.push(savedItem);
  }

  return writeJsonStoreV1(
    GITHUB_SCHEDULE_FILE,
    records
  );
}

async function saveScheduleDestination(
  ctx,
  target
) {
  const value =
    String(target || '').trim();

  if (!value) {
    return null;
  }

  let chat;

  try {
    chat =
      await ctx.telegram.getChat(value);
    const me =
      await ctx.telegram.getMe();
    const botMember =
      await ctx.telegram.getChatMember(
        chat.id,
        me.id
      );

    if (
      botMember.status !== 'administrator' &&
      botMember.status !== 'creator'
    ) {
      await ctx.reply(
        'ربات باید در کانال مقصد ادمین باشد.'
      );
      return null;
    }
  } catch {
    await ctx.reply(
      'کانال پیدا نشد یا ربات به آن دسترسی ندارد. آیدی عددی یا @username را بررسی کنید.'
    );
    return null;
  }

  const records =
    await readJsonStoreV1(
      GITHUB_SCHEDULE_FILE
    );
  const id = String(chat.id);
  const kind = `destination:${id}`;
  const destination = {
    kind,
    chatId: chat.id,
    id,
    name:
      chat.title ||
      (chat.username
        ? `@${chat.username}`
        : String(chat.id)),
    username:
      chat.username || '',
    updatedAt:
      new Date().toISOString()
  };
  const index =
    records.findIndex(
      item => item.kind === kind
    );

  if (index >= 0) {
    records[index] = destination;
  } else {
    records.push(destination);
  }

  const saved =
    await writeJsonStoreV1(
      GITHUB_SCHEDULE_FILE,
      records
    );

  return saved
    ? destination
    : null;
}

async function sendScheduledPost(item) {
  if (
    item.sourceChatId &&
    item.sourceMessageId
  ) {
    await bot.telegram.copyMessage(
      item.destinationId,
      item.sourceChatId,
      item.sourceMessageId
    );
    return;
  }

  if (!item.text) {
    throw new Error(
      'متن یا پیام منبع برای ارسال وجود ندارد.'
    );
  }

  const options = {};

  if (item.entities?.length) {
    options.entities = item.entities;
  } else if (item.parseMode) {
    options.parse_mode = item.parseMode;
  }

  await bot.telegram.sendMessage(
    item.destinationId,
    item.text,
    options
  );
}

let schedulePollRunningV1 = false;

async function pollScheduledPostsV1() {
  if (schedulePollRunningV1) {
    return;
  }

  schedulePollRunningV1 = true;

  try {
    const records =
      await readJsonStoreV1(
        GITHUB_SCHEDULE_FILE
      );
    const now = Date.now();
    const due =
      scheduleRecords(records)
        .filter(
          item =>
            item.status === 'pending' &&
            Number(item.sendAt) <= now
        );

    for (const item of due) {
      try {
        await sendScheduledPost(item);
        item.status = 'sent';
        item.sentAt =
          new Date().toISOString();
        item.error = '';
      } catch (error) {
        item.status = 'error';
        item.error =
          String(
            error?.response?.description ||
              error?.message ||
              'خطای ناشناخته'
          ).slice(0, 400);
        console.error(
          'SCHEDULED POST ERROR:',
          item.id,
          item.error
        );
      }

      item.updatedAt =
        new Date().toISOString();
    }

    if (due.length) {
      await writeJsonStoreV1(
        GITHUB_SCHEDULE_FILE,
        records
      );
    }
  } catch (error) {
    console.error(
      'SCHEDULE POLL ERROR:',
      error?.message || error
    );
  } finally {
    schedulePollRunningV1 = false;
  }
}

async function beginScheduledPost(ctx) {
  scheduleStates.set(
    ctx.chat.id,
    {
      step: 'post',
      ownerId: Number(ctx.from.id)
    }
  );

  await ctx.reply(
    `<b>⏰ زمان‌بندی پست</b>

پست آماده، لینک پست کانال، یا فقط عنوان را بفرستید.
برای ساخت پست از اطلاعات ذخیره‌شده، عنوان باید در set.json موجود باشد.
برای لغو: <code>/cancel</code>`,
    {
      parse_mode: 'HTML',
      reply_markup: setKeyboard()
    }
  );
}

async function askScheduleTime(ctx, state) {
  state.step = 'time';

  await ctx.reply(
    `<b>زمان ارسال را بفرستید:</b>

<code>H26</code> یعنی ۲۶ ساعت بعد
<code>H5</code> یعنی ۵ ساعت بعد
<code>D2</code> یعنی ۲ روز بعد
<code>D1</code> یعنی ۱ روز بعد`,
    {
      parse_mode: 'HTML',
      reply_markup: setKeyboard()
    }
  );
}

async function askScheduleDestination(ctx, state) {
  const records =
    await readJsonStoreV1(
      GITHUB_SCHEDULE_FILE
    );
  const destinations =
    scheduleDestinations(records);

  if (!destinations.length) {
    state.step = 'destination';
    await ctx.reply(
      `<b>هنوز کانال مقصدی ثبت نشده است.</b>

ابتدا دستور زیر را اجرا کنید:
<code>/destinationadd @channel</code>

سپس زمان‌بندی را دوباره شروع کنید.`,
      {
        parse_mode: 'HTML',
        reply_markup: mainKeyboard()
      }
    );
    scheduleStates.delete(ctx.chat.id);
    return;
  }

  state.step = 'destination';
  await ctx.reply(
    '<b>کانال مقصد را انتخاب کنید:</b>',
    {
      parse_mode: 'HTML',
      reply_markup:
        scheduleKeyboard(destinations)
    }
  );
}

async function handleScheduleText(ctx, text) {
  const state =
    scheduleStates.get(ctx.chat.id);

  if (
    !state ||
    Number(state.ownerId) !== Number(ctx.from.id)
  ) {
    return false;
  }

  if (/^\/cancel(?:@\w+)?$/i.test(text)) {
    scheduleStates.delete(ctx.chat.id);
    await ctx.reply(
      'زمان‌بندی لغو شد.',
      { reply_markup: mainKeyboard() }
    );
    return true;
  }

  if (state.step === 'post') {
    const source =
      messageLinkTarget(text);

    if (source) {
      state.sourceChatId =
        source.chatId;
      state.sourceMessageId =
        source.messageId;
      state.sourceLink = text;
      await askScheduleTime(ctx, state);
      return true;
    }

    if (
      text.includes('\n') ||
      /IMDb|IMDB|ژانر|خلاصه داستان|بازیگران|720p|فیلم|سریال|انیمه|انیمیشن/i.test(text)
    ) {
      state.text = text;
      state.entities =
        ctx.message.entities || [];
      await askScheduleTime(ctx, state);
      return true;
    }

    const generated =
      await getAutoType(text);

    if (!generated) {
      await ctx.reply(
        'عنوان در set.json یا اطلاعات قابل ساخت پیدا نشد. متن کامل پست یا لینک پست را بفرستید.'
      );
      return true;
    }

    state.title = text;
    state.generated = generated;
    state.step = 'link';
    await ctx.reply(
      `<b>عنوان شناسایی شد: ${escapeHtml(text)}</b>

حالا لینک پست/فایل یا لینک دانلود را بفرستید تا قالب از اطلاعات /set ساخته شود.`,
      {
        parse_mode: 'HTML',
        reply_markup: setKeyboard()
      }
    );
    return true;
  }

  if (state.step === 'link') {
    if (!/^https?:\/\//i.test(text)) {
      await ctx.reply(
        'لطفاً لینک معتبر با http:// یا https:// بفرستید.'
      );
      return true;
    }

    try {
      const generated =
        state.generated;
      state.text =
        await buildPost(
          generated.type,
          generated.data,
          text,
          generated.status,
          generated.translatedPlotFa
        );
      state.parseMode = 'HTML';
      state.title = state.title || '';
      await askScheduleTime(ctx, state);
    } catch (error) {
      console.error(
        'SCHEDULE POST BUILD ERROR:',
        error?.message || error
      );
      await ctx.reply(
        'ساخت متن پست ناموفق بود. عنوان و لینک را دوباره بررسی کنید.'
      );
    }
    return true;
  }

  if (state.step === 'time') {
    const delay =
      parseScheduleDelay(text);

    if (!delay) {
      await ctx.reply(
        'زمان نامعتبر است. نمونه‌های مجاز: H26، H5، D2 یا D1.'
      );
      return true;
    }

    state.sendAt =
      Date.now() + delay.milliseconds;
    await askScheduleDestination(ctx, state);
    return true;
  }

  if (state.step === 'destination') {
    if (text === '✖️ لغو زمان‌بندی') {
      scheduleStates.delete(ctx.chat.id);
      await ctx.reply(
        'زمان‌بندی لغو شد.',
        { reply_markup: mainKeyboard() }
      );
      return true;
    }

    const records =
      await readJsonStoreV1(
        GITHUB_SCHEDULE_FILE
      );
    const destination =
      scheduleDestinations(records)
        .find(
          item =>
            item.name === text ||
            String(item.chatId) === text
        );

    if (!destination) {
      await ctx.reply(
        'کانال را از فهرست انتخاب کنید.'
      );
      return true;
    }

    const id =
      `${Date.now()}-${Number(ctx.from.id)}`;
    const item = {
      id,
      ownerId: Number(ctx.from.id),
      chatId: Number(ctx.chat.id),
      text: state.text || '',
      entities: state.entities || [],
      parseMode: state.parseMode || '',
      sourceChatId:
        state.sourceChatId || '',
      sourceMessageId:
        state.sourceMessageId || 0,
      sourceLink: state.sourceLink || '',
      title: state.title || '',
      destinationId:
        destination.chatId,
      destinationName:
        destination.name,
      sendAt: state.sendAt,
      status: 'pending',
      createdAt:
        new Date().toISOString()
    };
    const saved =
      await saveScheduleItem(item);

    scheduleStates.delete(ctx.chat.id);
    await ctx.reply(
      saved
        ? `<b>✅ به صف اضافه شد.</b>

شناسه: <code>${escapeHtml(id)}</code>
ارسال: ${escapeHtml(new Date(state.sendAt).toLocaleString('fa-IR', { timeZone: 'Asia/Kabul' }))}
کانال: ${escapeHtml(destination.name)}`
        : 'ذخیره در settimep.json انجام نشد. اتصال GitHub را بررسی کنید.',
      {
        parse_mode: 'HTML',
        reply_markup: postToolsKeyboard()
      }
    );
    return true;
  }

  if (
    state.step === 'edit-text' ||
    state.step === 'edit-time' ||
    state.step === 'edit-destination'
  ) {
    const records =
      await readJsonStoreV1(
        GITHUB_SCHEDULE_FILE
      );
    const item =
      scheduleRecords(records)
        .find(
          entry =>
            entry.id === state.itemId
        );

    if (!item) {
      scheduleStates.delete(ctx.chat.id);
      await ctx.reply(
        'پیام زمان‌بندی‌شده پیدا نشد.'
      );
      return true;
    }

    if (state.step === 'edit-text') {
      item.text = text;
      item.entities =
        ctx.message.entities || [];
      item.sourceChatId = '';
      item.sourceMessageId = 0;
      item.sourceLink = '';
    } else if (state.step === 'edit-time') {
      const delay =
        parseScheduleDelay(text);
      if (!delay) {
        await ctx.reply(
          'زمان نامعتبر است. از H5 یا D2 مانند نمونه استفاده کنید.'
        );
        return true;
      }
      item.sendAt =
        Date.now() + delay.milliseconds;
      item.status = 'pending';
    } else {
      const target =
        scheduleDestinations(records)
          .find(
            destination =>
              destination.name === text ||
              String(destination.chatId) === text
          );
      if (!target) {
        await ctx.reply(
          'کانال از فهرست پیدا نشد.'
        );
        return true;
      }
      item.destinationId = target.chatId;
      item.destinationName = target.name;
    }

    const saved =
      await writeJsonStoreV1(
        GITHUB_SCHEDULE_FILE,
        records
      );
    scheduleStates.delete(ctx.chat.id);
    await ctx.reply(
      saved
        ? '✅ مورد زمان‌بندی‌شده ویرایش شد.'
        : '❌ ذخیره تغییر انجام نشد.',
      { reply_markup: postToolsKeyboard() }
    );
    return true;
  }

  return false;
}

async function handleScheduleMedia(ctx) {
  const state =
    scheduleStates.get(ctx.chat.id);

  if (
    !state ||
    state.step !== 'post' ||
    Number(state.ownerId) !== Number(ctx.from?.id)
  ) {
    return false;
  }

  const payload =
    getMessagePayload(ctx.message);

  if (!payload) {
    return false;
  }

  state.sourceChatId =
    payload.sourceChatId;
  state.sourceMessageId =
    payload.sourceMessageId;
  state.sourceLink = '';

  if (
    payload.text &&
    !ctx.message.photo &&
    !ctx.message.video &&
    !ctx.message.document
  ) {
    state.text = payload.text;
    state.entities =
      payload.entities || [];
    state.sourceChatId = '';
    state.sourceMessageId = 0;
  }

  await askScheduleTime(ctx, state);
  return true;
}

async function beginUploader(ctx) {
  uploaderStates.set(
    ctx.chat.id,
    {
      step: 'files',
      ownerId: Number(ctx.from.id),
      files: []
    }
  );
  await ctx.reply(
    `<b>⬆️ Uploader فعال شد.</b>

فایل‌ها یا پیام‌های رسانه‌ای را ارسال کنید. برای پایان <code>/finish</code> بزنید.
سپس @username یا آیدی کانال مقصد را می‌فرستید.`,
    {
      parse_mode: 'HTML',
      reply_markup: sequenceKeyboard()
    }
  );
}

async function collectUploaderMessage(ctx) {
  const state =
    uploaderStates.get(ctx.chat.id);

  if (
    !state ||
    state.step !== 'files' ||
    Number(state.ownerId) !== Number(ctx.from?.id)
  ) {
    return false;
  }

  const payload =
    getMessagePayload(ctx.message);

  if (!payload) {
    return false;
  }

  state.files.push({
    sourceChatId:
      payload.sourceChatId,
    sourceMessageId:
      payload.sourceMessageId,
    name:
      payload.fileName ||
      `message-${payload.sourceMessageId}`
  });

  await ctx.reply(
    `✅ به Uploader اضافه شد. تعداد: ${state.files.length}. برای پایان /finish بزنید.`
  );
  return true;
}

async function finishChannelAdd(ctx) {
  const chatId = ctx.chat.id;

  const state =
    channelAddStates.get(chatId);

  if (!state?.items?.length) {
    await ctx.reply(
      '❌ هیچ موردی برای ذخیره وجود ندارد.'
    );

    return true;
  }

  const items = state.items;

  try {
    const cache =
      await githubReadChannelPosts();

    const records =
      Array.isArray(cache.records)
        ? [...cache.records]
        : [];

    let added = 0;
    let updated = 0;

    for (const item of items) {
      const index =
        records.findIndex(
          record =>
            normalizeChannelName(
              record.name
            ) ===
            normalizeChannelName(
              item.name
            )
        );

      if (index >= 0) {
        records[index] = {
          ...records[index],
          name: item.name,
          link: item.link
        };

        updated++;
      } else {
        records.push({
          name: item.name,
          link: item.link
        });

        added++;
      }
    }

    const saved =
      await githubWriteFileV1(
        GITHUB_CHANNEL_FILE,
        records,
        'channel'
      );

    if (!saved) {
      await ctx.reply(
        '❌ ذخیره در GitHub انجام نشد.'
      );

      return true;
    }

    channelAddStates.delete(chatId);

    await ctx.reply(
      `<b>✅ با موفقیت ذخیره شد</b>\n\n` +
      `➕ جدید: ${added}\n` +
      `🔄 بروزرسانی: ${updated}\n` +
      `📦 مجموع: ${items.length}`,
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return true;

  } catch (error) {
    console.error(
      'finishChannelAdd error:',
      error
    );

    await ctx.reply(
      '❌ هنگام ذخیره در GitHub خطایی رخ داد.'
    );

    return true;
  }
}


async function finishUploader(ctx) {
  const state =
    uploaderStates.get(ctx.chat.id);

  if (
    !state ||
    Number(state.ownerId) !== Number(ctx.from?.id)
  ) {
    return false;
  }

  if (!state.files.length) {
    uploaderStates.delete(ctx.chat.id);
    await ctx.reply(
      'هیچ فایلی دریافت نشد.',
      { reply_markup: mainKeyboard() }
    );
    return true;
  }

  state.files.sort(
    (a, b) =>
      a.name.localeCompare(
        b.name,
        { numeric: true, sensitivity: 'base' }
      )
  );
  state.step = 'destination';
  await ctx.reply(
    `<b>📤 مقصد را مشخص کنید.</b>

@username یا آیدی عددی کانال را ارسال کنید. ربات باید در کانال ادمین باشد.`,
    {
      parse_mode: 'HTML',
      reply_markup: setKeyboard()
    }
  );
  return true;
}

async function sendUploaderToChannel(ctx, target) {
  const state =
    uploaderStates.get(ctx.chat.id);

  if (
    !state ||
    state.step !== 'destination' ||
    Number(state.ownerId) !== Number(ctx.from?.id)
  ) {
    return false;
  }

  let destination;

  try {
    destination =
      await ctx.telegram.getChat(target);
    const me =
      await ctx.telegram.getMe();
    const botMember =
      await ctx.telegram.getChatMember(
        destination.id,
        me.id
      );
    if (
      botMember.status !== 'administrator' &&
      botMember.status !== 'creator'
    ) {
      await ctx.reply(
        'ربات در کانال مقصد دسترسی ادمین ندارد.'
      );
      return true;
    }
  } catch {
    await ctx.reply(
      'کانال پیدا نشد یا ربات به آن دسترسی ندارد.'
    );
    return true;
  }

  let sent = 0;
  let failed = 0;

  for (const file of state.files) {
    try {
      await ctx.telegram.copyMessage(
        destination.id,
        file.sourceChatId,
        file.sourceMessageId
      );
      sent++;
    } catch (error) {
      failed++;
      console.error(
        'UPLOADER COPY ERROR:',
        error?.message || error
      );
    }
  }

  uploaderStates.delete(ctx.chat.id);
  await ctx.reply(
    `✅ ارسال Uploader تمام شد.
موفق: ${sent}
خطا: ${failed}`,
    { reply_markup: mainKeyboard() }
  );
  return true;
}

function warningRecordKey(chatId, userId) {
  return `warning:${chatId}:${userId}`;
}

async function findWarningRecordV1(
  chatId,
  userId
) {
  const records =
    await readJsonStoreV1(
      GITHUB_WARNINGS_FILE
    );

  return {
    records,
    item:
      records.find(
        entry =>
          entry.kind ===
          warningRecordKey(chatId, userId)
      ) || null
  };
}

async function addWarningV1(
  ctx,
  userId,
  reason = 'اخطار مدیر'
) {
  const result =
    await findWarningRecordV1(
      ctx.chat.id,
      userId
    );
  const item = {
    kind: warningRecordKey(
      ctx.chat.id,
      userId
    ),
    chatId: Number(ctx.chat.id),
    userId: Number(userId),
    count:
      Number(result.item?.count || 0) + 1,
    lastReason:
      String(reason || '').slice(0, 300),
    updatedAt:
      new Date().toISOString()
  };
  const index =
    result.records.findIndex(
      entry =>
        entry.kind === item.kind
    );

  if (index >= 0) {
    result.records[index] = item;
  } else {
    result.records.push(item);
  }

  const saved =
    await writeJsonStoreV1(
      GITHUB_WARNINGS_FILE,
      result.records
    );
  const settings =
    await getGroupSettingsV1(ctx.chat.id);
  const limit =
    Math.max(1, Number(settings.warningLimit || 3));

  if (saved && item.count >= limit) {
    try {
      if (settings.warningAction === 'kick') {
        await ctx.telegram.banChatMember(
          ctx.chat.id,
          Number(userId)
        );
        await ctx.telegram.unbanChatMember(
          ctx.chat.id,
          Number(userId),
          { only_if_banned: true }
        );
      } else {
        await ctx.telegram.banChatMember(
          ctx.chat.id,
          Number(userId)
        );
      }

      item.actionTaken =
        settings.warningAction === 'kick'
          ? 'kick'
          : 'ban';
      item.count = 0;
      await writeJsonStoreV1(
        GITHUB_WARNINGS_FILE,
        result.records
      );
    } catch (error) {
      console.error(
        'WARNING ACTION ERROR:',
        error?.message || error
      );
    }
  }

  return {
    item,
    saved,
    limit,
    actionTaken: item.actionTaken || ''
  };
}

function normalizeAllowedLink(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .replace(/^@/, '');
}

async function getAllowedLinksV1(chatId) {
  const records =
    await readJsonStoreV1(
      GITHUB_NOFILTER_FILE
    );
  const record =
    records.find(
      item =>
        Number(item.chatId) ===
        Number(chatId)
    );

  return Array.isArray(record?.links)
    ? record.links
    : [];
}

async function updateAllowedLinksV1(
  chatId,
  links
) {
  const records =
    await readJsonStoreV1(
      GITHUB_NOFILTER_FILE
    );
  const index =
    records.findIndex(
      item =>
        Number(item.chatId) ===
        Number(chatId)
    );
  const record = {
    kind: `nofilter:${chatId}`,
    chatId: Number(chatId),
    links: [
      ...new Set(
        links
          .map(normalizeAllowedLink)
          .filter(Boolean)
      )
    ],
    updatedAt:
      new Date().toISOString()
  };

  if (index >= 0) {
    records[index] = record;
  } else {
    records.push(record);
  }

  return writeJsonStoreV1(
    GITHUB_NOFILTER_FILE,
    records
  );
}

async function getFilterStateV1(chatId) {
  const records =
    await readJsonStoreV1(
      GITHUB_FILTER_FILE
    );

  return (
    records.find(
      item =>
        Number(item.chatId) ===
        Number(chatId)
    ) || {
      kind: `filter:${chatId}`,
      chatId: Number(chatId),
      enabled: false,
      autoWarning: true
    }
  );
}

async function saveFilterStateV1(
  chatId,
  patch
) {
  const records =
    await readJsonStoreV1(
      GITHUB_FILTER_FILE
    );
  const index =
    records.findIndex(
      item =>
        Number(item.chatId) ===
        Number(chatId)
    );
  const current =
    index >= 0
      ? records[index]
      : await getFilterStateV1(chatId);
  const updated = {
    ...current,
    ...patch,
    kind: `filter:${chatId}`,
    chatId: Number(chatId),
    updatedAt:
      new Date().toISOString()
  };

  if (index >= 0) {
    records[index] = updated;
  } else {
    records.push(updated);
  }

  return writeJsonStoreV1(
    GITHUB_FILTER_FILE,
    records
  );
}

async function isTelegramAdminV1(
  ctx,
  userId
) {
  try {
    const member =
      await ctx.telegram.getChatMember(
        ctx.chat.id,
        userId
      );
    return (
      member.status === 'creator' ||
      member.status === 'administrator'
    );
  } catch {
    return false;
  }
}

function containsExternalLink(text) {
  return /(?:https?:\/\/|www\.|t\.me\/|telegram\.me\/|tg:\/\/|(?:^|\s)@[A-Za-z0-9_]{5,})/i.test(
    String(text || '')
  );
}

function linkIsAllowed(text, allowedLinks) {
  const normalized =
    String(text || '').toLowerCase();
  const tokens =
    normalized.match(
      /(?:https?:\/\/)?(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}|@[a-z0-9_]{5,}/gi
    ) || [];
  const safeList =
    allowedLinks.map(normalizeAllowedLink);

  return tokens.some(token => {
    const value =
      normalizeAllowedLink(token);

    return safeList.some(
      allowed =>
        value === allowed ||
        value.endsWith(`.${allowed}`)
    );
  });
}

async function handleLinkFilterMessageV1(ctx) {
  const message = ctx.message;
  const text =
    message?.text ||
    message?.caption ||
    '';

  if (
    !text ||
    !ctx.chat ||
    !['group', 'supergroup'].includes(ctx.chat.type) ||
    !containsExternalLink(text) ||
    message.from?.is_bot ||
    await isTelegramAdminV1(
      ctx,
      message.from?.id
    )
  ) {
    return false;
  }

  const settings =
    await getFilterStateV1(ctx.chat.id);

  if (!settings.enabled) {
    return false;
  }

  const allowed =
    await getAllowedLinksV1(ctx.chat.id);

  if (linkIsAllowed(text, allowed)) {
    return false;
  }

  await safeDelete(
    ctx,
    message.message_id
  );

  if (settings.autoWarning !== false) {
    const warning =
      await addWarningV1(
        ctx,
        message.from.id,
        'ارسال لینک غیرمجاز'
      );
    const notice =
      await ctx.reply(
        `⚠️ لینک غیرمجاز حذف شد. اخطار ${warning.item.count}/${warning.limit}`
      );
    setTimeout(
      () =>
        safeDelete(
          ctx,
          notice.message_id
        ),
      10000
    );
  } else {
    const notice =
      await ctx.reply(
        'لینک‌های تبلیغاتی در این گروه مجاز نیستند.'
      );
    setTimeout(
      () =>
        safeDelete(
          ctx,
          notice.message_id
        ),
      10000
    );
  }

  return true;
}

function resolveTargetUser(ctx, text = '') {
  const replied =
    ctx.message?.reply_to_message?.from;

  if (replied?.id) {
    return Number(replied.id);
  }

  const match =
    String(text || '').match(/-?\d{5,}/);

  return match
    ? Number(match[0])
    : null;
}

async function handleModerationActionV1(
  ctx,
  action,
  argument = ''
) {
  if (!(await requireGroupModerator(ctx))) {
    return;
  }

  const message =
    ctx.message || {};
  const target =
    resolveTargetUser(ctx, argument);

  if (action === 'purge') {
    const replyId =
      message.reply_to_message?.message_id;

    if (!replyId) {
      await ctx.reply(
        'برای پاک‌سازی، این دستور را روی یک پیام Reply کنید.'
      );
      return;
    }

    const count =
      Math.min(
        100,
        Math.max(
          1,
          Number(argument.match(/\d+/)?.[0] || 1)
        )
      );

    for (
      let id = replyId;
      id < replyId + count;
      id++
    ) {
      await safeDelete(ctx, id);
    }
    await safeDelete(ctx, message.message_id);
    return;
  }

  if (action === 'pin' || action === 'unpin') {
    const replyId =
      message.reply_to_message?.message_id;
    if (!replyId) {
      await ctx.reply(
        'این دستور را روی پیام موردنظر Reply کنید.'
      );
      return;
    }
    try {
      if (action === 'pin') {
        await ctx.telegram.pinChatMessage(
          ctx.chat.id,
          replyId
        );
      } else {
        await ctx.telegram.unpinChatMessage(
          ctx.chat.id,
          replyId
        );
      }
      await ctx.reply(
        action === 'pin'
          ? '📌 پیام سنجاق شد.'
          : '📍 سنجاق پیام برداشته شد.'
      );
    } catch {
      await ctx.reply(
        'عملیات انجام نشد؛ دسترسی Pin Messages را به ربات بدهید.'
      );
    }
    return;
  }

  if (action === 'lock' || action === 'unlock') {
    try {
      const allowed =
        action === 'unlock';
      await ctx.telegram.setChatPermissions(
        ctx.chat.id,
        {
          can_send_messages: allowed,
          can_send_audios: allowed,
          can_send_documents: allowed,
          can_send_photos: allowed,
          can_send_videos: allowed,
          can_send_video_notes: allowed,
          can_send_voice_notes: allowed,
          can_send_polls: allowed,
          can_send_other_messages: allowed,
          can_add_web_page_previews: allowed
        }
      );
      await saveGroupSettingsV1(
        ctx.chat.id,
        { locked: !allowed }
      );
      await ctx.reply(
        allowed
          ? '🔓 ارسال پیام در گروه باز شد.'
          : '🔒 ارسال پیام در گروه قفل شد.'
      );
    } catch {
      await ctx.reply(
        'دسترسی تغییر مجوزهای گروه را به ربات بدهید.'
      );
    }
    return;
  }

  if (!target) {
    await ctx.reply(
      'کاربر را Reply کنید یا آیدی عددی او را بعد از دستور بفرستید.'
    );
    return;
  }

  try {
    if (action === 'warn') {
      const reason =
        argument.replace(/-?\d{5,}/, '').trim() ||
        'اخطار مدیر';
      const result =
        await addWarningV1(
          ctx,
          target,
          reason
        );
      await ctx.reply(
        result.actionTaken
          ? `⛔️ حد اخطار رسید؛ کاربر ${result.actionTaken === 'kick' ? 'از گروه اخراج' : 'بن'} شد.`
          : `⚠️ اخطار ثبت شد: ${result.item.count}/${result.limit}`
      );
      return;
    }

    if (action === 'mute') {
      const duration =
        argument.match(/\b(\d+)([hd])\b/i);
      const hours =
        duration
          ? Number(duration[1]) *
            (duration[2].toLowerCase() === 'd' ? 24 : 1)
          : 24;
      await ctx.telegram.restrictChatMember(
        ctx.chat.id,
        target,
        {
          can_send_messages: false,
          can_send_audios: false,
          can_send_documents: false,
          can_send_photos: false,
          can_send_videos: false,
          can_send_video_notes: false,
          can_send_voice_notes: false,
          can_send_polls: false,
          can_send_other_messages: false,
          can_add_web_page_previews: false
        },
        {
          until_date:
            Math.floor(Date.now() / 1000) +
            Math.max(1, hours) * 3600
        }
      );
    } else if (action === 'unmute') {
      await unmuteUser(
        ctx,
        ctx.chat.id,
        target
      );
    } else if (action === 'ban') {
      await ctx.telegram.banChatMember(
        ctx.chat.id,
        target
      );
    } else if (action === 'kick') {
      await ctx.telegram.banChatMember(
        ctx.chat.id,
        target
      );
      await ctx.telegram.unbanChatMember(
        ctx.chat.id,
        target,
        { only_if_banned: true }
      );
    } else if (action === 'unban') {
      await ctx.telegram.unbanChatMember(
        ctx.chat.id,
        target,
        { only_if_banned: true }
      );
    }

    await ctx.reply(
      `✅ ${action} برای کاربر <code>${target}</code> انجام شد.`,
      { parse_mode: 'HTML' }
    );
  } catch (error) {
    console.error(
      'GROUP MODERATION ERROR:',
      action,
      error?.message || error
    );
    await ctx.reply(
      'عملیات انجام نشد. دسترسی مناسب را به ربات بدهید و بررسی کنید کاربر مدیر گروه نباشد.'
    );
  }
}

async function showGroupListsV1(ctx, listName = 'all') {
  const chatId = Number(ctx.chat.id);
  const parts = [];

  if (
    listName === 'admins' ||
    listName === 'all'
  ) {
    try {
      const admins =
        await ctx.telegram.getChatAdministrators(ctx.chat.id);
      parts.push(
        `<b>🛡 مدیران گروه</b>\n${admins
          .map(
            item =>
              `• ${escapeHtml(
                [item.user.first_name, item.user.last_name]
                  .filter(Boolean)
                  .join(' ') ||
                  String(item.user.id)
              )} — <code>${item.user.id}</code>`
          )
          .join('\n') || 'موردی نیست'}`
      );
    } catch {
      parts.push(
        '<b>🛡 مدیران گروه</b>\nدریافت فهرست ممکن نشد.'
      );
    }
  }

  if (
    listName === 'warnings' ||
    listName === 'all'
  ) {
    const records =
      await readJsonStoreV1(
        GITHUB_WARNINGS_FILE
      );
    const warnings =
      records.filter(
        item =>
          Number(item.chatId) === chatId &&
          Number(item.count) > 0
      );
    parts.push(
      `<b>⚠️ Warningها</b>\n${warnings
        .map(
          item =>
            `• <code>${item.userId}</code>: ${item.count}`
        )
        .join('\n') || 'موردی نیست'}`
    );
  }

  if (
    listName === 'nofilter' ||
    listName === 'all'
  ) {
    const links =
      await getAllowedLinksV1(chatId);
    parts.push(
      `<b>🟢 NoFilter</b>\n${links
        .map(link => `• ${escapeHtml(link)}`)
        .join('\n') || 'فهرست خالی است'}`
    );
  }

  if (
    listName === 'filter' ||
    listName === 'all'
  ) {
    const filter =
      await getFilterStateV1(chatId);
    parts.push(
      `<b>🔗 Link Filter</b>\nوضعیت: ${filter.enabled ? 'فعال' : 'غیرفعال'}\nاخطار خودکار: ${filter.autoWarning === false ? 'غیرفعال' : 'فعال'}`
    );
  }

  if (
    listName === 'welcome' ||
    listName === 'all'
  ) {
    const welcome =
      await getWelcomeData();
    const settings =
      await getGroupSettingsV1(chatId);
    parts.push(
      `<b>👋 Welcome</b>\nوضعیت گروه: ${settings.welcomeEnabled ? 'فعال' : 'غیرفعال'}\nوضعیت سراسری: ${welcome.settings.enabled ? 'فعال' : 'غیرفعال'}`
    );
  }

  const group =
    await getGroupSettingsV1(chatId);
  parts.push(
    `<b>⚙️ Group Settings</b>\nCaptcha: ${group.captchaEnabled ? 'فعال' : 'غیرفعال'}\nحد اخطار: ${group.warningLimit}\nاقدام حد: ${group.warningAction}\nپاک‌سازی خوش‌آمد: ${group.welcomeDeleteAfterSeconds} ثانیه`
  );

  await ctx.reply(
    parts.join('\n\n'),
    {
      parse_mode: 'HTML',
      reply_markup: groupKeyboard()
    }
  );
}

async function showWarningsV1(ctx) {
  const records =
    await readJsonStoreV1(
      GITHUB_WARNINGS_FILE
    );
  const items =
    records.filter(
      item =>
        Number(item.chatId) ===
          Number(ctx.chat.id) &&
        Number(item.count) > 0
    );

  await ctx.reply(
    `<b>⚠️ Warningها</b>

${items
  .map(
    item =>
      `• <code>${item.userId}</code> — ${item.count} اخطار${item.lastReason ? ` (${escapeHtml(item.lastReason)})` : ''}`
  )
  .join('\n') || 'فهرست اخطارها خالی است.'}`,
    {
      parse_mode: 'HTML',
      reply_markup: warningKeyboard()
    }
  );
}

async function clearWarningsV1(ctx) {
  const records =
    await readJsonStoreV1(
      GITHUB_WARNINGS_FILE
    );
  const kept =
    records.filter(
      item =>
        Number(item.chatId) !==
        Number(ctx.chat.id)
    );
  const saved =
    await writeJsonStoreV1(
      GITHUB_WARNINGS_FILE,
      kept
    );
  await ctx.reply(
    saved
      ? '✅ Warningهای این گروه پاک شد.'
      : '❌ پاک‌کردن Warningها ذخیره نشد.',
    { reply_markup: warningKeyboard() }
  );
}

async function handleFixPost(ctx, link) {
  const source =
    messageLinkTarget(link);

  if (!source) {
    await ctx.reply(
      'لینک معتبر پست کانال را با قالب t.me/channel/123 یا t.me/c/123/456 بفرستید.'
    );
    return;
  }

  let copied;
  try {
    copied =
      await ctx.telegram.copyMessage(
        ctx.chat.id,
        source.chatId,
        source.messageId
      );
  } catch (error) {
    console.error(
      'FIX POST FETCH ERROR:',
      error?.message || error
    );
    await ctx.reply(
      'دریافت پست ممکن نشد. برای کانال خصوصی، ربات باید به پست دسترسی داشته باشد.'
    );
    return;
  }

  let original;
  try {
    const fetched =
      await ctx.telegram.forwardMessage(
        ctx.chat.id,
        source.chatId,
        source.messageId
      );
    original =
      fetched.text ||
      fetched.caption ||
      copied.text ||
      copied.caption ||
      '';
    await safeDelete(
      ctx,
      fetched.message_id
    );
  } catch {
    original =
      copied.text ||
      copied.caption ||
      '';
  }

  await safeDelete(
    ctx,
    copied.message_id
  );

  if (!original) {
    await ctx.reply(
      'پست متن یا کپشن قابل‌دریافت ندارد؛ قالب‌بندی متن خالی انجام نشد.'
    );
    return;
  }

  const cache =
    await githubReadCacheV1();
  const record =
    detectSetRecordForPost(
      original,
      cache.records
    );

  if (!record) {
    await ctx.reply(
      'نوع پست از set.json تشخیص داده نشد. پست اصلی تغییری نکرده است؛ عنوان باید در اطلاعات ذخیره‌شده وجود داشته باشد.'
    );
    return;
  }

  const existing =
    copied.entities ||
    copied.caption_entities ||
    [];
  const entities =
    getFixPostEntities(
      original,
      existing
    );

  await ctx.reply(
    original,
    {
      entities,
      reply_markup: postToolsKeyboard()
    }
  );
}

async function manageAdminCommandV1(ctx, text) {
  if (Number(ctx.from?.id) !== ADMIN_ID) {
    await ctx.reply(
      'مدیریت دسترسی ادمین‌ها فقط برای مالک اصلی بات فعال است.'
    );
    return;
  }

  const parts =
    String(text || '')
      .replace(/^\/(?:admin|manageadmin)(?:@\w+)?\s*/i, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  const action =
    (parts.shift() || 'list').toLowerCase();
  const userId =
    Number(parts.shift());
  const records =
    await readJsonStoreV1(
      GITHUB_ADMIN_FILE
    );

  if (action === 'list') {
    await ctx.reply(
      `<b>🛡 Adminها</b>

${records
  .map(
    item =>
      `• <code>${item.userId}</code> — ${item.enabled === false ? 'غیرفعال' : 'فعال'} — ${escapeHtml((item.permissions || []).join(', '))}`
  )
  .join('\n') || 'ادمین اضافه‌ای ثبت نشده است.'}

مجوزها: ${adminPermissionList().join(', ')}, full`,
      {
        parse_mode: 'HTML',
        reply_markup: groupKeyboard()
      }
    );
    return;
  }

  if (!Number.isSafeInteger(userId) || userId <= 0) {
    await ctx.reply(
      'فرمت: /admin add 123456 group,welcome یا /admin list'
    );
    return;
  }

  const index =
    records.findIndex(
      item =>
        Number(item.userId) === userId
    );

  if (action === 'remove' || action === 'delete') {
    if (index >= 0) {
      records.splice(index, 1);
    }
  } else if (action === 'off' || action === 'disable') {
    if (index >= 0) {
      records[index].enabled = false;
    }
  } else if (action === 'on' || action === 'enable') {
    if (index >= 0) {
      records[index].enabled = true;
    }
  } else if (action === 'info') {
    const item =
      index >= 0
        ? records[index]
        : null;
    await ctx.reply(
      item
        ? `ID: <code>${item.userId}</code>\nوضعیت: ${item.enabled === false ? 'غیرفعال' : 'فعال'}\nدسترسی: ${escapeHtml((item.permissions || []).join(', '))}`
        : 'ادمین پیدا نشد.',
      { parse_mode: 'HTML' }
    );
    return;
  } else if (
    action === 'add' ||
    action === 'edit' ||
    action === 'permissions'
  ) {
    const permissions =
      (parts.join('') || '')
        .split(/[,\s]+/)
        .map(value => value.trim())
        .filter(Boolean);
    const allowed =
      new Set([
        ...adminPermissionList(),
        'full',
        '*'
      ]);

    if (
      !permissions.length ||
      permissions.some(
        permission =>
          !allowed.has(permission)
      )
    ) {
      await ctx.reply(
        `مجوز نامعتبر است. مجوزهای مجاز: ${adminPermissionList().join(', ')}, full`
      );
      return;
    }

    const item = {
      kind: `admin:${userId}`,
      userId,
      enabled: true,
      permissions,
      updatedAt:
        new Date().toISOString()
    };

    if (index >= 0) {
      records[index] = {
        ...records[index],
        ...item
      };
    } else {
      records.push(item);
    }
  } else {
    await ctx.reply(
      'دستورها: /admin list | add ID permissions | edit ID permissions | info ID | off ID | on ID | remove ID'
    );
    return;
  }

  const saved =
    await writeJsonStoreV1(
      GITHUB_ADMIN_FILE,
      records
    );
  await ctx.reply(
    saved
      ? '✅ تغییرات admin.json ذخیره شد.'
      : '❌ ذخیره admin.json انجام نشد.'
  );
}

function scheduleActionsKeyboard(item) {
  const toggleText =
    item.status === 'cancelled'
      ? '🔄 بازگردانی'
      : '🔄 لغو';
  return {
    inline_keyboard: [
      [
        {
          text: '✏️ ویرایش متن',
          callback_data: `schedule:text:${item.id}`
        },
        {
          text: '⏰ ویرایش زمان',
          callback_data: `schedule:time:${item.id}`
        }
      ],
      [
        {
          text: '📢 تغییر کانال',
          callback_data: `schedule:channel:${item.id}`
        },
        {
          text: '🗑 حذف از صف',
          callback_data: `schedule:delete:${item.id}`
        }
      ],
      [
        {
          text: '▶️ ارسال فوری',
          callback_data: `schedule:now:${item.id}`
        },
        {
          text: toggleText,
          callback_data: `schedule:toggle:${item.id}`
        }
      ]
    ]
  };
}

async function showScheduledList(ctx) {
  const records =
    await readJsonStoreV1(
      GITHUB_SCHEDULE_FILE
    );
  const items =
    scheduleRecords(records)
      .sort(
        (a, b) =>
          Number(a.sendAt) -
          Number(b.sendAt)
      );

  if (!items.length) {
    await ctx.reply(
      'صف زمان‌بندی خالی است.',
      { reply_markup: postToolsKeyboard() }
    );
    return;
  }

  for (const item of items) {
    await ctx.reply(
      formatScheduleItem(item),
      {
        parse_mode: 'HTML',
        reply_markup:
          scheduleActionsKeyboard(item)
      }
    );
  }
}

async function handleScheduleAction(ctx, action, id) {
  const records =
    await readJsonStoreV1(
      GITHUB_SCHEDULE_FILE
    );
  const index =
    records.findIndex(
      item =>
        String(item.id) === String(id) &&
        String(item.kind || '')
          .startsWith('scheduled:')
    );

  if (index < 0) {
    try {
      await ctx.answerCbQuery(
        'این مورد در صف پیدا نشد.'
      );
    } catch {}
    return;
  }

  const item = records[index];
  const allowed =
    Number(ctx.from?.id) === ADMIN_ID ||
    Number(ctx.from?.id) ===
      Number(item.ownerId);

  if (!allowed) {
    try {
      await ctx.answerCbQuery(
        'دسترسی به این پست ندارید.'
      );
    } catch {}
    return;
  }

  if (
    action === 'text' ||
    action === 'time' ||
    action === 'channel'
  ) {
    const step =
      action === 'text'
        ? 'edit-text'
        : action === 'time'
          ? 'edit-time'
          : 'edit-destination';
    scheduleStates.set(
      ctx.chat.id,
      {
        step,
        itemId: item.id,
        ownerId: Number(ctx.from.id)
      }
    );

    if (action === 'channel') {
      const destinations =
        scheduleDestinations(records);
      await ctx.reply(
        'کانال مقصد جدید را انتخاب کنید:',
        {
          reply_markup:
            scheduleKeyboard(destinations)
        }
      );
    } else {
      await ctx.reply(
        action === 'text'
          ? 'متن جدید پست را ارسال کنید.'
          : 'زمان جدید را مثل H5 یا D2 ارسال کنید.'
      );
    }
    try {
      await ctx.answerCbQuery();
    } catch {}
    return;
  }

  if (action === 'delete') {
    records.splice(index, 1);
    const saved =
      await writeJsonStoreV1(
        GITHUB_SCHEDULE_FILE,
        records
      );
    try {
      await ctx.answerCbQuery(
        saved ? 'از صف حذف شد.' : 'ذخیره حذف انجام نشد.'
      );
      await ctx.editMessageReplyMarkup({
        inline_keyboard: []
      });
    } catch {}
    return;
  }

  if (action === 'toggle') {
    item.status =
      item.status === 'cancelled'
        ? 'pending'
        : 'cancelled';
    item.error = '';
    item.updatedAt =
      new Date().toISOString();
    const saved =
      await writeJsonStoreV1(
        GITHUB_SCHEDULE_FILE,
        records
      );
    try {
      await ctx.answerCbQuery(
        saved
          ? item.status === 'pending'
            ? 'به صف بازگردانده شد.'
            : 'لغو شد.'
          : 'ذخیره تغییر انجام نشد.'
      );
      await ctx.editMessageText(
        formatScheduleItem(item),
        {
          parse_mode: 'HTML',
          reply_markup:
            scheduleActionsKeyboard(item)
        }
      );
    } catch {}
    return;
  }

  if (action === 'now') {
    try {
      await sendScheduledPost(item);
      item.status = 'sent';
      item.sentAt =
        new Date().toISOString();
      item.error = '';
    } catch (error) {
      item.status = 'error';
      item.error =
        String(
          error?.response?.description ||
            error?.message ||
            'خطای ارسال'
        ).slice(0, 400);
    }
    const saved =
      await writeJsonStoreV1(
        GITHUB_SCHEDULE_FILE,
        records
      );
    try {
      await ctx.answerCbQuery(
        item.status === 'sent'
          ? 'ارسال فوری انجام شد.'
          : 'ارسال ناموفق بود.'
      );
      await ctx.editMessageText(
        formatScheduleItem(item),
        {
          parse_mode: 'HTML',
          reply_markup:
            scheduleActionsKeyboard(item)
        }
      );
    } catch {}
    if (!saved) {
      await ctx.reply(
        'ارسال انجام شد، اما وضعیت در settimep.json ذخیره نشد.'
      );
    }
  }
}

async function findCachedOmdbV1(
  title,
  type
) {
  const cache =
    await githubReadCacheV1();

  const normalizedTitle =
    normalizeCacheTitle(title);

  const normalizedType =
    cacheType(type);

  return (
    cache.records.find(
      item =>
        normalizeCacheTitle(
          item.searchTitle
        ) === normalizedTitle &&
        cacheType(
          item.searchType
        ) === normalizedType
    ) || null
  );
}

async function saveOmdbCacheV1(
  title,
  type,
  data,
  episodeCount,
  status,
  translatedPlotFa = ''
) {
  const cache =
    await githubReadCacheV1();

  const normalizedTitle =
    normalizeCacheTitle(title);

  const normalizedType =
    cacheType(type);

  const now =
    new Date().toISOString();

  const index =
    cache.records.findIndex(
      item =>
        normalizeCacheTitle(
          item.searchTitle
        ) === normalizedTitle &&
        cacheType(
          item.searchType
        ) === normalizedType
    );

  const oldRecord =
    index >= 0
      ? cache.records[index]
      : null;

  const record = {
    searchTitle: title,
    searchType: type,
    searchTitleNormalized:
      normalizedTitle,
    imdbID: data.imdbID || '',
    title: data.Title || '',
    year: data.Year || '',
    rated: data.Rated || '',
    released: data.Released || '',
    runtime: data.Runtime || '',
    genre: data.Genre || '',
    director: data.Director || '',
    writer: data.Writer || '',
    actors: data.Actors || '',
    plot: data.Plot || '',
    language: data.Language || '',
    country: data.Country || '',
    awards: data.Awards || '',
    poster: data.Poster || '',
    imdbRating:
      data.imdbRating || '',
    imdbVotes:
      data.imdbVotes || '',
    type: data.Type || '',
    totalSeasons:
      data.totalSeasons || '',
    episodeCount:
      Number(episodeCount || 0),
    status: status || '',
    translatedPlotFa:
      translatedPlotFa ||
      oldRecord?.translatedPlotFa ||
      '',
    omdb: data,
    createdAt:
      oldRecord?.createdAt ||
      now,
    updatedAt: now
  };

  if (index >= 0) {
    cache.records[index] = {
      ...oldRecord,
      ...record
    };
  } else {
    cache.records.push(record);
  }

  await githubWriteCacheV1(
    cache.records
  );

  return record;
}

async function translateText(text) {
  if (
    !text ||
    text === 'N/A'
  ) {
    return 'خلاصه داستان موجود نیست.';
  }

  const chunks = [];
  let current = '';

  for (
    const word of
    String(text).split(/\s+/)
  ) {
    const next = current
      ? `${current} ${word}`
      : word;

    if (next.length > 450) {
      if (current) {
        chunks.push(current);
      }

      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    chunks.push(current);
  }

  const result = [];

  for (
    const chunk of chunks
  ) {
    try {
      const response =
        await axios.get(
          'https://api.mymemory.translated.net/get',
          {
            params: {
              q: chunk,
              langpair: 'en|fa'
            }
          }
        );

      result.push(
        response.data
          ?.responseData
          ?.translatedText ||
          chunk
      );
    } catch {
      result.push(chunk);
    }
  }

  return result.join(' ');
}

const titleMap = {
  'Family Guy': 'مرد خانواده',
  'The Legend of Nezha':
    'افسانه نژا',
  'Ragna Crimson':
    'راگنا کریمسون',
  'Attack on Titan':
    'حمله به تایتان',
  'Solo Leveling':
    'تک‌رو شدن در سطح',
  'Death Note':
    'دفترچه مرگ',
  'Blue Lock':
    'بلو لاک',
  'Spy x Family':
    'خانواده جاسوس',
  Gotham: 'گاتهام',
  Mantis: 'آخوندک'
};

const genreMap = {
  Action: 'اکشن',
  Adventure: 'ماجراجویی',
  Animation: 'انیمیشن',
  Comedy: 'کمدی',
  Crime: 'جنایی',
  Drama: 'درام',
  Fantasy: 'فانتزی',
  Horror: 'ترسناک',
  Mystery: 'معمایی',
  Romance: 'عاشقانه',
  'Sci-Fi': 'علمی تخیلی',
  'Science Fiction':
    'علمی تخیلی',
  Thriller: 'هیجان‌انگیز',
  War: 'جنگی',
  Western: 'وسترن',
  Family: 'خانوادگی',
  Music: 'موسیقی',
  Musical: 'موزیکال',
  History: 'تاریخی',
  Biography: 'زندگی‌نامه',
  Sport: 'ورزشی',
  Short: 'کوتاه',
  Documentary: 'مستند',
  'Talk-Show': 'تاک‌شو',
  'Reality-TV': 'رئالیتی شو'
};

const countryMap = {
  'United States': 'آمریکا',
  'United States of America':
    'آمریکا',
  USA: 'آمریکا',
  US: 'آمریکا',
  Japan: 'ژاپن',
  'South Korea': 'کره جنوبی',
  China: 'چین',
  'United Kingdom':
    'انگلستان',
  UK: 'انگلستان',
  Canada: 'کانادا',
  France: 'فرانسه',
  Germany: 'آلمان',
  India: 'هند',
  Australia: 'استرالیا',
  Spain: 'اسپانیا',
  Italy: 'ایتالیا'
};

function translateTitle(title) {
  return (
    titleMap[title] ||
    title
  );
}

function translateGenres(genre) {
  if (
    !genre ||
    genre === 'N/A'
  ) {
    return 'نامشخص';
  }

  return genre
    .split(',')
    .map(
      x =>
        genreMap[x.trim()] ||
        x.trim()
    )
    .join(' | ');
}

function translateCountries(
  country
) {
  if (
    !country ||
    country === 'N/A'
  ) {
    return 'نامشخص';
  }

  return country
    .split(',')
    .map(
      x =>
        countryMap[x.trim()] ||
        x.trim()
    )
    .join(' | ');
}

function getStars(data) {
  if (
    !data.Actors ||
    data.Actors === 'N/A'
  ) {
    return 'نامشخص';
  }

  return data.Actors
    .split(',')
    .map(x => x.trim())
    .join(' | ');
}

function getImdb(data) {
  if (
    !data.imdbRating ||
    data.imdbRating === 'N/A'
  ) {
    return 'نامشخص';
  }

  return data.imdbRating;
}

async function getEpisodeCount(
  data
) {
  const seasons =
    Number(data.totalSeasons);

  if (!seasons) {
    return 0;
  }

  let total = 0;

  for (
    let i = 1;
    i <= seasons;
    i++
  ) {
    try {
      const response =
        await axios.get(
          'https://www.omdbapi.com/',
          {
            params: {
              apikey:
                OMDB_API_KEY,
              i: data.imdbID,
              Season: i
            }
          }
        );

      if (
        response.data
          ?.Response === 'True' &&
        Array.isArray(
          response.data.Episodes
        )
      ) {
        total +=
          response.data
            .Episodes.length;
      }
    } catch (error) {
      console.error(
        'OMDb season error:',
        error?.response
          ?.data ||
          error?.message
      );
    }
  }

  return total;
}

async function getStatus(data) {
  const seasons =
    Number(data.totalSeasons);

  if (!seasons) {
    return '';
  }

  const episodes =
    await getEpisodeCount(data);

  if (episodes) {
    return `${seasons} فصل ${episodes} قسمت`;
  }

  return `${seasons} فصل`;
}

async function getOmdbFresh(
  title,
  type = ''
) {
  try {
    const params = {
      apikey: OMDB_API_KEY,
      t: title
    };

    if (type) {
      params.type = type;
    }

    const response =
      await axios.get(
        'https://www.omdbapi.com/',
        {
          params
        }
      );

    if (
      response.data?.Response !==
      'True'
    ) {
      console.error(
        'OMDb error:',
        response.data
      );

      return null;
    }

    return response.data;
  } catch (error) {
    console.error(
      'OMDb request error:',
      error?.response?.data ||
        error?.message
    );

    return null;
  }
}

async function getOmdbCachedV1(
  title,
  type = ''
) {
  const cached =
    await findCachedOmdbV1(
      title,
      type
    );

  if (cached?.omdb) {
    return {
      data: cached.omdb,
      episodeCount:
        Number(
          cached.episodeCount ||
            0
        ),
      status:
        cached.status || '',
      translatedPlotFa:
        cached.translatedPlotFa ||
        ''
    };
  }

  const data =
    await getOmdbFresh(
      title,
      type
    );

  if (!data) {
    return null;
  }

  let episodeCount = 0;
  let status = '';

  if (
    data.Type === 'series'
  ) {
    episodeCount =
      await getEpisodeCount(
        data
      );

    const seasons =
      Number(data.totalSeasons);

    if (seasons) {
      status = episodeCount
        ? `${seasons} فصل ${episodeCount} قسمت`
        : `${seasons} فصل`;
    }
  }

  const translatedPlotFa =
    await translateText(
      data.Plot
    );

  await saveOmdbCacheV1(
    title,
    type,
    data,
    episodeCount,
    status,
    translatedPlotFa
  );

  return {
    data,
    episodeCount,
    status,
    translatedPlotFa
  };
}

async function getAutoType(
  title
) {
  const cachedMovie =
    await findCachedOmdbV1(
      title,
      'movie'
    );

  if (cachedMovie?.omdb) {
    return {
      data: cachedMovie.omdb,
      type: 'movie',
      episodeCount:
        Number(
          cachedMovie.episodeCount ||
            0
        ),
      status:
        cachedMovie.status ||
        '',
      translatedPlotFa:
        cachedMovie.translatedPlotFa ||
        ''
    };
  }

  const cachedSeries =
    await findCachedOmdbV1(
      title,
      'series'
    );

  if (cachedSeries?.omdb) {
    return {
      data: cachedSeries.omdb,
      type: 'series',
      episodeCount:
        Number(
          cachedSeries.episodeCount ||
            0
        ),
      status:
        cachedSeries.status ||
        '',
      translatedPlotFa:
        cachedSeries.translatedPlotFa ||
        ''
    };
  }

  const data =
    await getOmdbFresh(title);

  if (!data) {
    return null;
  }

  const type =
    data.Type === 'movie'
      ? 'movie'
      : 'series';

  let episodeCount = 0;
  let status = '';

  if (type === 'series') {
    episodeCount =
      await getEpisodeCount(
        data
      );

    const seasons =
      Number(data.totalSeasons);

    if (seasons) {
      status = episodeCount
        ? `${seasons} فصل ${episodeCount} قسمت`
        : `${seasons} فصل`;
    }
  }

  const translatedPlotFa =
    await translateText(
      data.Plot
    );

  await saveOmdbCacheV1(
    title,
    type,
    data,
    episodeCount,
    status,
    translatedPlotFa
  );

  return {
    data,
    type,
    episodeCount,
    status,
    translatedPlotFa
  };
}



function formatBytes(bytes) {
  if (!bytes) {
    return '0 B';
  }

  const units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB'
  ];

  let size = Number(bytes);
  let index = 0;

  while (
    size >= 1024 &&
    index < units.length - 1
  ) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(
    index === 0 ? 0 : 2
  )} ${units[index]}`;
}

function getSequenceFile(message) {
  if (!message) {
    return null;
  }

  if (message.document) {
    return {
      type: 'document',
      fileId: message.document.file_id,
      name:
        message.document.file_name ||
        'document',
      size:
        Number(
          message.document.file_size || 0
        ),
      caption:
        message.caption || '',
      captionEntities:
        message.caption_entities || []
    };
  }

  if (message.video) {
    return {
      type: 'video',
      fileId: message.video.file_id,
      name:
        message.video.file_name ||
        'video',
      size:
        Number(
          message.video.file_size || 0
        ),
      caption:
        message.caption || '',
      captionEntities:
        message.caption_entities || []
    };
  }

  if (message.audio) {
    return {
      type: 'audio',
      fileId: message.audio.file_id,
      name:
        message.audio.file_name ||
        message.audio.title ||
        'audio',
      size:
        Number(
          message.audio.file_size || 0
        ),
      caption:
        message.caption || '',
      captionEntities:
        message.caption_entities || []
    };
  }

  if (message.animation) {
    return {
      type: 'animation',
      fileId: message.animation.file_id,
      name:
        message.animation.file_name ||
        'animation',
      size:
        Number(
          message.animation.file_size || 0
        ),
      caption:
        message.caption || '',
      captionEntities:
        message.caption_entities || []
    };
  }

  return null;
}

function getSequenceEpisodeInfo(name) {
  const value =
    String(name || '');

  const match =
    value.match(
      /S(\d{1,2})E(\d{1,4})/i
    );

  if (!match) {
    return {
      season: null,
      episode: null
    };
  }

  return {
    season:
      Number(match[1]),
    episode:
      Number(match[2])
  };
}

function sequenceFileSort(a, b) {
  const aInfo =
    getSequenceEpisodeInfo(
      a.name
    );

  const bInfo =
    getSequenceEpisodeInfo(
      b.name
    );

  if (
    aInfo.season !== null &&
    bInfo.season !== null
  ) {
    if (
      aInfo.season !==
      bInfo.season
    ) {
      return (
        aInfo.season -
        bInfo.season
      );
    }

    if (
      aInfo.episode !==
      bInfo.episode
    ) {
      return (
        aInfo.episode -
        bInfo.episode
      );
    }
  }

  if (
    aInfo.season !== null &&
    bInfo.season === null
  ) {
    return -1;
  }

  if (
    aInfo.season === null &&
    bInfo.season !== null
  ) {
    return 1;
  }

  return String(
    a.name || ''
  ).localeCompare(
    String(
      b.name || ''
    ),
    undefined,
    {
      numeric: true,
      sensitivity: 'base'
    }
  );
}

function sequenceStatus(
  state,
  file
) {
  const info =
    getSequenceEpisodeInfo(
      file.name
    );

  const seasonText =
    info.season !== null
      ? `Season ${info.season}`
      : 'Unknown';

  const episodeText =
    info.episode !== null
      ? `Episode ${info.episode}`
      : 'Unknown';

  return `<b>📁 Sequence Active

📊 Current Status:

📦 Files: ${state.files.length}
💾 Total Size: ${formatBytes(
    state.totalSize
  )}

📄 Last File:
${escapeHtml(
  file.name || 'Unknown'
)}

🎬 Season:
${escapeHtml(
  seasonText
)}

🎞 Episode:
${escapeHtml(
  episodeText
)}

📦 File Size:
${formatBytes(file.size)}

📝 Caption:
${
  file.caption
    ? escapeHtml(file.caption)
    : 'No Caption'
}

Send the next file.

Press «✅ Done» when finished.</b>`;
}

async function updateSequenceStatus(
  ctx,
  state,
  file
) {
  try {
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      state.statusMessageId,
      undefined,
      sequenceStatus(
        state,
        file
      ),
      {
        parse_mode: 'HTML',
        reply_markup:
          sequenceKeyboard()
      }
    );
  } catch (error) {
    console.error(
      'SEQUENCE STATUS UPDATE ERROR:',
      error
    );
  }
}

async function startSequence(ctx) {
  sequenceStates.delete(
    ctx.chat.id
  );

  const message =
    await ctx.reply(
      `<b>📁 Sequence Activated

Send the files one by one.
There is no file limit.

After sending all files, press «✅ Done».</b>`,
      {
        parse_mode: 'HTML',
        reply_markup:
          sequenceKeyboard()
      }
    );

  sequenceStates.set(
    ctx.chat.id,
    {
      files: [],
      totalSize: 0,
      statusMessageId:
        message.message_id
    }
  );
}

async function handleSequenceFile(
  ctx
) {
  const state =
    sequenceStates.get(
      ctx.chat.id
    );

  if (!state) {
    return false;
  }

  const file =
    getSequenceFile(
      ctx.message
    );

  if (!file) {
    return false;
  }

  state.files.push(
    file
  );

  state.totalSize +=
    file.size || 0;

  sequenceStates.set(
    ctx.chat.id,
    state
  );

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  await updateSequenceStatus(
    ctx,
    state,
    file
  );

  return true;
}

function getSequenceSeasons(
  files
) {
  const seasons =
    new Map();

  for (const file of files) {
    const info =
      getSequenceEpisodeInfo(
        file.name
      );

    if (
      info.season === null
    ) {
      continue;
    }

    if (
      !seasons.has(
        info.season
      )
    ) {
      seasons.set(
        info.season,
        []
      );
    }

    seasons
      .get(info.season)
      .push(file);
  }

  return seasons;
}

async function sendSequenceFile(
  ctx,
  file
) {
  const extra =
    file.caption
      ? {
          caption:
            file.caption,
          caption_entities:
            file.captionEntities ||
            []
        }
      : {};

  if (
    file.type ===
    'document'
  ) {
    await ctx.replyWithDocument(
      file.fileId,
      extra
    );

    return;
  }

  if (
    file.type ===
    'video'
  ) {
    await ctx.replyWithVideo(
      file.fileId,
      extra
    );

    return;
  }

  if (
    file.type ===
    'audio'
  ) {
    await ctx.replyWithAudio(
      file.fileId,
      extra
    );

    return;
  }

  if (
    file.type ===
    'animation'
  ) {
    await ctx.replyWithAnimation(
      file.fileId,
      extra
    );

    return;
  }
}

async function finishSequence(ctx) {
  const state =
    sequenceStates.get(
      ctx.chat.id
    );

  if (!state) {
    await mainMenu(ctx);
    return;
  }

  sequenceStates.delete(
    ctx.chat.id
  );

  const files =
    [...state.files].sort(
      sequenceFileSort
    );

  const seasons =
    getSequenceSeasons(
      files
    );

  const sentSeasons =
    new Set();

  let sentCount = 0;

  for (
    const file of files
  ) {
    try {
      await sendSequenceFile(
        ctx,
        file
      );

      sentCount++;

      const info =
        getSequenceEpisodeInfo(
          file.name
        );

      if (
        info.season !== null &&
        seasons.has(
          info.season
        )
      ) {
        const seasonFiles =
          seasons.get(
            info.season
          );

        const seasonComplete =
          seasonFiles.every(
            seasonFile =>
              files.indexOf(
                seasonFile
              ) <
              files.indexOf(
                file
              ) + 1
          );

        if (
          seasonComplete &&
          !sentSeasons.has(
            info.season
          )
        ) {
          sentSeasons.add(
            info.season
          );

          await ctx.reply(
            `<b>Season ${info.season} sended</b>`,
            {
              parse_mode:
                'HTML'
            }
          );
        }
      }
    } catch (error) {
      console.error(
        'SEQUENCE SEND ERROR:',
        error
      );

      await ctx.reply(
        `❌ خطا در ارسال فایل:\n<code>${escapeHtml(
          file.name
        )}</code>`,
        {
          parse_mode:
            'HTML'
        }
      );
    }
  }

  try {
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      state.statusMessageId,
      undefined,
      `<b>📁 Sequence Completed

📦 Files: ${files.length}
📤 Sended: ${sentCount}
💾 Total Size: ${formatBytes(
        state.totalSize
      )}

${Array.from(
  sentSeasons
)
  .map(
    season =>
      `✅ Season ${season} sended`
  )
  .join('\n')}</b>`,
      {
        parse_mode:
          'HTML'
      }
    );
  } catch (error) {
    console.error(
      'SEQUENCE COMPLETE STATUS ERROR:',
      error
    );
  }

  await ctx.reply(
    `<b>✅ Sequence Completed

📦 Files: ${files.length}
📤 Sended: ${sentCount}
💾 Total Size: ${formatBytes(
      state.totalSize
    )}</b>
/sequence » For Sequence`,
    {
      parse_mode:
        'HTML',
      reply_markup:
        mainKeyboard()
    }
  );
}

async function startSet(
  ctx,
  type,
  title = '',
  auto = false
) {
  setStates.delete(
    ctx.chat.id
  );

  const state = {
    type,
    title: title.trim(),
    auto,
    messages: []
  };

  setStates.set(
    ctx.chat.id,
    state
  );

  if (!state.title) {
    const message =
      await ctx.reply(
        '<b>🎬 عنوان را ارسال کنید:</b>',
        {
          parse_mode: 'HTML',
          reply_markup:
            setKeyboard()
        }
      );

    state.messages.push(
      message.message_id
    );

    return;
  }

  const message =
    await ctx.reply(
      '<b>🔗 لینک دانلود را ارسال کنید:</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          setKeyboard()
      }
    );

  state.messages.push(
    message.message_id
  );
}

async function setTitleReceived(
  ctx,
  title
) {
  const state =
    setStates.get(
      ctx.chat.id
    );

  if (!state) {
    return;
  }

  state.title =
    title.trim();

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  for (
    const messageId of
    state.messages
  ) {
    await safeDelete(
      ctx,
      messageId
    );
  }

  state.messages = [];

  const message =
    await ctx.reply(
      '<b>🔗 لینک دانلود را ارسال کنید:</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          setKeyboard()
      }
    );

  state.messages.push(
    message.message_id
  );
}

function detectCinema(
  type,
  data
) {
  if (
    data.Type !== 'movie'
  ) {
    return false;
  }

  return (
    type === 'anime' ||
    type === 'animation'
  );
}

async function buildPost(
  type,
  data,
  url,
  cachedStatus = '',
  cachedPlot = ''
) {
  const title =
    escapeHtml(
      translateTitle(
        data.Title
      )
    );

  const originalTitle =
    escapeHtml(
      data.Title || ''
    );

  const imdb =
    escapeHtml(
      getImdb(data)
    );

  const genre =
    escapeHtml(
      translateGenres(
        data.Genre
      )
    );

  const country =
    escapeHtml(
      translateCountries(
        data.Country
      )
    );

  const actors =
    escapeHtml(
      getStars(data)
    );

  const plot =
    escapeHtml(
      cachedPlot ||
        await translateText(
          data.Plot
        )
    );

  const finalUrl =
    escapeHtml(url);

  if (type === 'movie') {
    return `<b>📼 فیلم « ${title} »

📹 ${originalTitle}
✨ IMDb: ${imdb}

🎭 ژانر: ${genre}
🪙 محصول: ${country}
🍿 بازیگران: ${actors}

📝 خلاصه داستان : ${plot}

✂️ بدون سانسور و حذفیات ❗️

🎤 دوبله فارسی:
⬇️ <a href="${finalUrl}">(برای دانلود اینجا کلیک کنید)</a> ➡️

✅ @FaarsiMovie</b>`;
  }

  if (type === 'anime') {
    if (
      detectCinema(
        type,
        data
      )
    ) {
      return `<b>📼 انیمه سینمایی « ${title} »

📹 ${originalTitle}
⭐️ IMDB : ${imdb}

🎭 ژانر : ${genre}
🌐 محصول : ${country}
👤ستارگان : ${actors}

💬 خلاصه داستان : ${plot}

🚫 بدون سانسور و حذفیات !

📥 دوبله فارسی | <a href="${finalUrl}">720p</a>

✅ @Anime_Faarsi</b>`;
    }

    const status =
      cachedStatus ||
      await getStatus(data);

    const statusLine =
      status
        ? `⌨ وضعیت : ${escapeHtml(
            status
          )}\n`
        : '';

    return `<b>📼 انیمه سریالی « ${title} »

📹 ${originalTitle}
⭐️ IMDB : ${imdb}

🎭 ژانر : ${genre}
🌐 محصول : ${country}
${statusLine}👤ستارگان : ${actors}

💬 خلاصه داستان : ${plot}

🚫 بدون سانسور و حذفیات !

📥 فصل 01 دوبله فارسی | <a href="${finalUrl}">720p</a>

✅ @Anime_Faarsi</b>`;
  }

  if (type === 'animation') {
    if (
      detectCinema(
        type,
        data
      )
    ) {
      return `<b>📺 انیمیشن سینمایی « ${title} »

📼 ${originalTitle}
✨ IMDb: ${imdb}

🎭 ژانر: ${genre}
🪙 محصول: ${country}
🍿 بازیگران: ${actors}

📝 خلاصه داستان : ${plot}

✂️ بدون سانسور و حذفیات ❗️

📥 دوبله فارسی | <a href="${finalUrl}">720p</a>

✅ @Anime_Faarsi</b>`;
    }

    const status =
      cachedStatus ||
      await getStatus(data);

    const statusLine =
      status
        ? `⭕ وضعیت: ${escapeHtml(
            status
          )}\n`
        : '';

    return `<b>📺 انیمیشن سریالی « ${title} »

📼 ${originalTitle}
✨ IMDb: ${imdb}

🎭 ژانر: ${genre}
🪙 محصول: ${country}
${statusLine}🍿 بازیگران: ${actors}

📝 خلاصه داستان : ${plot}

✂️ بدون سانسور و حذفیات ❗️

📥 فصل 01 دوبله فارسی | <a href="${finalUrl}">720p</a>

✅ @Anime_Faarsi</b>`;
  }

  const status =
    cachedStatus ||
    await getStatus(data);

  return `<b>📺 سریال « ${title} »

📼 ${originalTitle}
✨ IMDb: ${imdb}

🎭 ژانر: ${genre}
🪙 محصول: ${country}
⭕ وضعیت: ${escapeHtml(status)}
🍿 بازیگران: ${actors}

📝 خلاصه داستان : ${plot}

✂️ بدون سانسور و حذفیات ❗️

📥 فصل 01 دوبله فارسی | <a href="${finalUrl}">720p</a>

✅ @FaarsiMovie</b>`;
}

async function handleSetLink(
  ctx,
  url
) {
  const state =
    setStates.get(
      ctx.chat.id
    );

  if (!state) {
    return;
  }

  try {
    let result;
    let type = state.type;

    if (state.auto) {
      result =
        await getAutoType(
          state.title
        );

      if (!result) {
        await ctx.reply(
          '<b>❌ عنوان پیدا نشد. عنوان را بررسی کنید.</b>',
          {
            parse_mode: 'HTML',
            reply_markup:
              setKeyboard()
          }
        );

        return;
      }

      type = result.type;
    } else {
      result =
        await getOmdbCachedV1(
          state.title,
          type === 'movie'
            ? 'movie'
            : 'series'
        );

      if (!result) {
        await ctx.reply(
          '<b>❌ عنوان پیدا نشد. عنوان را بررسی کنید.</b>',
          {
            parse_mode: 'HTML',
            reply_markup:
              setKeyboard()
          }
        );

        return;
      }
    }

    const data =
      result.data;

    const post =
      await buildPost(
        type,
        data,
        url,
        result.status,
        result.translatedPlotFa
      );

    for (
      const messageId of
      state.messages
    ) {
      await safeDelete(
        ctx,
        messageId
      );
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    setStates.delete(
      ctx.chat.id
    );

    if (
      data.Poster &&
      data.Poster !== 'N/A'
    ) {
      try {
        await ctx.replyWithPhoto(
          data.Poster,
          {
            caption: post,
            parse_mode: 'HTML',
            reply_markup:
              mainKeyboard()
          }
        );
      } catch {
        await ctx.reply(
          post,
          {
            parse_mode: 'HTML',
            reply_markup:
              mainKeyboard()
          }
        );
      }
    } else {
      await ctx.reply(
        post,
        {
          parse_mode: 'HTML',
          reply_markup:
            mainKeyboard()
        }
      );
    }
  } catch (error) {
    console.error(
      'SET ERROR:',
      error?.response?.data ||
        error?.message ||
        error
    );

    await ctx.reply(
      '<b>❌ خطایی هنگام دریافت اطلاعات رخ داد.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          setKeyboard()
      }
    );
  }
}

function normalizeChannelName(
  name
) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ۀة]/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/إ|أ|ٱ/g, 'ا')
    .replace(/‌/g, ' ')
    .replace(/ـ/g, '')
    .replace(
      /[^\p{L}\p{N}\s]/gu,
      ' '
    )
    .replace(/\s+/g, ' ')
    .replace(
      /^(انیمه|anime)\s+/i,
      ''
    )
    .trim();
}

async function githubReadChannelPosts() {
  return githubReadFileV1(
    GITHUB_CHANNEL_FILE
  );
}

async function githubWriteChannelPosts(
  records
) {
  return githubWriteFileV1(
    GITHUB_CHANNEL_FILE,
    records,
    'channel'
  );
}

function findChannelPost(
  records,
  query
) {
  const normalizedQuery =
    normalizeChannelName(
      query
    );

  if (!normalizedQuery) {
    return null;
  }

  const exact =
    records.find(
      item =>
        normalizeChannelName(
          item.name
        ) === normalizedQuery
    );

  if (exact) {
    return exact;
  }

  const contains =
    records.find(
      item => {
        const name =
          normalizeChannelName(
            item.name
          );

        return (
          name.includes(
            normalizedQuery
          ) ||
          normalizedQuery.includes(
            name
          )
        );
      }
    );

  return contains || null;
}

function channelSearchReply(record) {
  const name =
    escapeHtml(record.name || 'نامشخص');

  return `<b><u>🎬 ${name}</u></b>

این <u>انیمه</u> در <u> بزرگترین آرشیو</u> کانال انیمه فارسی تلگرام موجود است.`;
}

function channelSearchKeyboard(record) {
  const name =
    escapeHtml(record.name || 'نامشخص');

  return {
    inline_keyboard: [
      [
        {
          text: `📥 دانلود: ${name}`,
          url: record.link
        }
      ]
    ]
  };
}

async function searchChannelPostForUser(
  ctx,
  query
) {
  try {
    const cache =
      await githubReadChannelPosts();

    const record =
      findChannelPost(
        cache.records,
        query
      );

    if (!record) {
      return false;
    }

    await ctx.reply(
      channelSearchReply(record),
      {
        parse_mode: 'HTML',
        link_preview_options: {
          is_disabled: true
        },
        reply_markup:
          channelSearchKeyboard(record),
        reply_parameters: {
          message_id:
            ctx.message.message_id
        }
      }
    );

    return true;
  } catch (error) {
    console.error(
      'Channel search reply error:',
      error
    );

    return false;
  }
}

function channelEditKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: 'Edit',
          callback_data:
            'channel_edit'
        }
      ]
    ]
  };
}



async function startChannelSearch(
  ctx
) {
  channelSearchStates.set(
    ctx.chat.id,
    true
  );

  await ctx.reply(
    '<b>Send Anime Name:</b>',
    {
      parse_mode: 'HTML',
      reply_markup:
        searchToolsKeyboard()
    }
  );
}

async function handleChannelSearchAdmin(
  ctx,
  query
) {
  channelSearchStates.delete(
    ctx.chat.id
  );

  const cache =
    await githubReadChannelPosts();

  const record =
    findChannelPost(
      cache.records,
      query
    );

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  if (!record) {
    await ctx.reply(
      '<b>❌ این انیمه در channelpost.json پیدا نشد.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  await ctx.reply(
    channelSearchReply(
      record
    ),
    {
      parse_mode: 'HTML',
      reply_markup:
        channelEditKeyboard()
    }
  );
}

function extractAnimeLinksFromMessage(message) {
  const text = String(message?.text || '');
  const entities = Array.isArray(message?.entities)
    ? message.entities
    : [];

  const items = [];

  for (const entity of entities) {
    const offset = Number(entity.offset || 0);
    const length = Number(entity.length || 0);

    const entityText = text
      .slice(offset, offset + length);

    let link = '';

    if (entity.type === 'text_link') {
      link = String(entity.url || '');
    } else if (entity.type === 'url') {
      link = entityText.trim();
    }

    if (!link) {
      continue;
    }

    const name = entityText
      .replace(
        /^[➖\-•▪️◾️🔹🔸]\s*/u,
        ''
      )
      .trim();

    if (!name) {
      continue;
    }

    items.push({
      name,
      link
    });
  }

  return items;
}




async function startChannelAdd(ctx) {
  channelAddStates.set(
    ctx.chat.id,
    {
      step: 'items',
      items: []
    }
  );

  await ctx.reply(
    '<b>لیست انیمه‌های لینک‌دار را ارسال کنید.</b>\n\n' +
    'می‌توانید همه را در یک پیام بفرستید.\n' +
    'هر اسم باید لینک تلگرامی داشته باشد.\n\n' +
    'بعد از اتمام، روی <b>Done</b> بزنید.',
    {
      parse_mode: 'HTML',
      reply_markup: sequenceKeyboard()
    }
  );
}




function getTextLink(ctx) {
  const message = ctx.message;

  const text =
    message?.text || '';

  const entities =
    message?.entities || [];

  const entity =
    entities.find(
      item =>
        item.type === 'text_link'
    );

  if (!entity?.url) {
    return null;
  }

  return {
    name: text.trim(),
    link: entity.url
  };
}

async function handleChannelAddName(
  ctx,
  name
) {
  const state =
    channelAddStates.get(
      ctx.chat.id
    );

  if (!state) {
    return;
  }

  const textLink =
    getTextLink(ctx);

  if (textLink) {
    state.name =
      textLink.name;

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await handleChannelAddLink(
      ctx,
      textLink.link
    );

    return;
  }

  state.name =
    name.trim();

  state.step = 'link';

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  await ctx.reply(
    '<b>لینک انیمه را ارسال کنید:</b>',
    {
      parse_mode: 'HTML',
      reply_markup:
        searchToolsKeyboard()
    }
  );
}

async function handleChannelAddLink(
  ctx,
  link
) {
  const state =
    channelAddStates.get(
      ctx.chat.id
    );

  if (!state) {
    return;
  }

  if (
    !/^https?:\/\//i.test(
      link
    )
  ) {
    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>❌ لینک معتبر ارسال کنید.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  const cache =
    await githubReadChannelPosts();

  const normalizedName =
    normalizeChannelName(
      state.name
    );

  const now =
    new Date().toISOString();

  const index =
    cache.records.findIndex(
      item =>
        normalizeChannelName(
          item.name
        ) === normalizedName
    );

  const record = {
    name: state.name,
    nameNormalized:
      normalizedName,
    link: link.trim(),
    createdAt:
      index >= 0
        ? cache.records[index]
            ?.createdAt ||
          now
        : now,
    updatedAt: now
  };

  if (index >= 0) {
    cache.records[index] = {
      ...cache.records[index],
      ...record
    };
  } else {
    cache.records.push(
      record
    );
  }

  const saved =
    await githubWriteChannelPosts(
      cache.records
    );

  channelAddStates.delete(
    ctx.chat.id
  );

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  if (!saved) {
    await ctx.reply(
      '<b>❌ ذخیره در channelpost.json انجام نشد.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  await ctx.reply(
    `<b>Anime or X Successfuly Added to Archive.</b>

Name: ${escapeHtml(state.name)}
Link: ${escapeHtml(link)}`,
    {
      parse_mode: 'HTML',
      reply_markup:
        searchToolsKeyboard()
    }
  );
}



async function handleChannelEditStart(
  ctx
) {
  if (!isAdmin(ctx)) {
    return;
  }

  channelEditStates.set(
    ctx.chat.id,
    {
      step: 'name',
      name: ''
    }
  );

  try {
    await ctx.answerCbQuery();
  } catch {}

  await ctx.reply(
    '<b>نام انیمه‌ای که می‌خواهید ادیت کنید را ارسال کنید:</b>',
    {
      parse_mode: 'HTML',
      reply_markup:
        searchToolsKeyboard()
    }
  );
}

async function handleChannelEditName(
  ctx,
  name
) {
  const state =
    channelEditStates.get(
      ctx.chat.id
    );

  if (!state) {
    return;
  }

  const cache =
    await githubReadChannelPosts();

  const record =
    findChannelPost(
      cache.records,
      name
    );

  if (!record) {
    channelEditStates.delete(
      ctx.chat.id
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>❌ این انیمه در channelpost.json پیدا نشد.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  state.name =
    record.name;

  state.recordName =
    record.name;

  state.step = 'link';

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  await ctx.reply(
    `<b>ادیت انیمه:</b> ${escapeHtml(record.name)}

لینک جدید را ارسال کنید.`,
    {
      parse_mode: 'HTML',
      reply_markup:
        searchToolsKeyboard()
    }
  );
}

async function handleChannelEditLink(
  ctx,
  link
) {
  const state =
    channelEditStates.get(
      ctx.chat.id
    );

  if (!state) {
    return;
  }

  if (
    !/^https?:\/\//i.test(
      link
    )
  ) {
    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>❌ لینک معتبر ارسال کنید.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  const cache =
    await githubReadChannelPosts();

  const index =
    cache.records.findIndex(
      item =>
        normalizeChannelName(
          item.name
        ) ===
        normalizeChannelName(
          state.recordName
        )
    );

  if (index < 0) {
    channelEditStates.delete(
      ctx.chat.id
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>❌ رکورد پیدا نشد.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  cache.records[index] = {
    ...cache.records[index],
    link: link.trim(),
    updatedAt:
      new Date().toISOString()
  };

  const saved =
    await githubWriteChannelPosts(
      cache.records
    );

  channelEditStates.delete(
    ctx.chat.id
  );

  await safeDelete(
    ctx,
    ctx.message.message_id
  );

  if (!saved) {
    await ctx.reply(
      '<b>❌ ادیت در channelpost.json انجام نشد.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );

    return;
  }

  await ctx.reply(
    `<b>✅ لینک انیمه با موفقیت ویرایش شد.</b>

${escapeHtml(cache.records[index].name)}`,
    {
      parse_mode: 'HTML',
      reply_markup:
        searchToolsKeyboard()
    }
  );
}

function getWelcomeDefaults() {
  return {
    enabled: true,
    welcomeText:
      DEFAULT_WELCOME_TEXT,
    rulesText:
      DEFAULT_RULES_TEXT,
    buttonText:
      'خواندن قوانین',
    confirmButtonText:
      'تایید و قبول کردن قوانین'
  };
}

async function getWelcomeData() {
  const result =
    await githubReadFileV1(
      GITHUB_WELCOME_FILE
    );

  const settings =
    result.records.find(
      item =>
        item.kind ===
        'settings'
    ) || {};

  const pending =
    result.records.filter(
      item =>
        item.kind ===
        'pending'
    );

  return {
    sha: result.sha,
    available:
      result.available,
    settings: {
      ...getWelcomeDefaults(),
      ...settings
    },
    pending
  };
}

async function saveWelcomeData(
  settings,
  pending
) {
  const records = [
    {
      kind: 'settings',
      ...settings
    },
    ...pending.map(
      item => ({
        kind: 'pending',
        ...item
      })
    )
  ];

  return githubWriteFileV1(
    GITHUB_WELCOME_FILE,
    records,
    'welcome'
  );
}

function welcomeUserName(user) {
  const name =
    [user.first_name, user.last_name]
      .filter(Boolean)
      .join(' ')
      .trim();

  return name ||
    (user.username
      ? `@${user.username}`
      : String(user.id));
}

function welcomeTextBuild(
  template,
  user,
  chat
) {
  return String(template)
    .replace(
      /\{user\}/g,
      escapeHtml(
        welcomeUserName(user)
      )
    )
    .replace(
      /\{chat\}/g,
      escapeHtml(
        chat.title ||
          'گروه'
      )
    );
}

function welcomeGroupText(
  template,
  user,
  chat
) {
  return String(template)
    .replace(
      /\{user\}/g,
      `<b>${escapeHtml(
        welcomeUserName(user)
      )}</b>`
    )
    .replace(
      /\{chat\}/g,
      `<b>${escapeHtml(
        chat.title ||
          'گروه'
      )}</b>`
    )
    .replace(
      /از اینجا نشستم و آرزو نمودم \.\.\. بر خالق خویش رو نمودم\s*ای کاش که قانون خریت \.\.\. جاری بشود به آدمیت/g,
      '<blockquote>از اینجا نشستم و آرزو نمودم ... بر خالق خویش رو نمودم\nای کاش که قانون خریت ... جاری بشود به آدمیت</blockquote>'
    );
}

async function muteUser(
  ctx,
  chatId,
  userId
) {
  try {
    const member =
      await ctx.telegram.getChatMember(
        chatId,
        userId
      );

    if (
      member.status ===
        'administrator' ||
      member.status ===
        'creator'
    ) {
      return true;
    }

    await ctx.telegram.restrictChatMember(
      chatId,
      userId,
      {
        can_send_messages: false,
        can_send_audios: false,
        can_send_documents: false,
        can_send_photos: false,
        can_send_videos: false,
        can_send_video_notes: false,
        can_send_voice_notes: false,
        can_send_polls: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false
      }
    );

    return true;
  } catch (error) {
    console.error(
      'MUTE ERROR:',
      error?.response?.data ||
        error?.message ||
        error
    );

    return false;
  }
}

async function unmuteUser(
  ctx,
  chatId,
  userId
) {
  try {
    await ctx.telegram.restrictChatMember(
      chatId,
      userId,
      {
        can_send_messages: true,
        can_send_audios: true,
        can_send_documents: true,
        can_send_photos: true,
        can_send_videos: true,
        can_send_video_notes: true,
        can_send_voice_notes: true,
        can_send_polls: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true
      }
    );

    return true;
  } catch (error) {
    console.error(
      'UNMUTE ERROR:',
      error?.response?.data ||
        error?.message ||
        error
    );

    return false;
  }
}

async function handleNewMembers(
  ctx
) {
  const members =
    ctx.message?.new_chat_members;

  if (
    !Array.isArray(members) ||
    !members.length
  ) {
    return;
  }

  const welcome =
    await getWelcomeData();
  const groupSettings =
    await getGroupSettingsV1(
      ctx.chat.id
    );

  if (
    !welcome.settings.enabled ||
    !groupSettings.welcomeEnabled
  ) {
    return;
  }

  const joinNoticeId =
    ctx.message?.message_id;

  for (
    const user of members
  ) {
    if (
      user.is_bot
    ) {
      continue;
    }

    const muted =
      groupSettings.captchaEnabled
        ? await muteUser(
            ctx,
            ctx.chat.id,
            user.id
          )
        : true;

    if (!muted) {
      continue;
    }

    const pending =
      welcome.pending.filter(
        item =>
          Number(item.userId) !==
          Number(user.id)
      );

    const welcomeMessageText =
      welcomeGroupText(
        welcome.settings.welcomeText,
        user,
        ctx.chat
      );

    const startUrl =
      `https://t.me/${BOT_USERNAME}?start=captcha_-${user.id}`;

    let sent;

    try {
      sent =
        await ctx.reply(
          welcomeMessageText,
          {
            parse_mode: 'HTML',
            ...(groupSettings.captchaEnabled
              ? {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text:
                            welcome.settings
                              .buttonText,
                          url: startUrl
                        }
                      ]
                    ]
                  }
                }
              : {})
          }
        );
    } catch {
      continue;
    }

    if (groupSettings.captchaEnabled) {
      pending.push({
        userId: Number(user.id),
        chatId:
          Number(ctx.chat.id),
        chatTitle:
          ctx.chat.title || '',
        welcomeMessageId:
          sent.message_id,
        createdAt:
          new Date().toISOString()
      });
    }

    welcome.pending =
      pending;

    if (groupSettings.captchaEnabled) {
      await saveWelcomeData(
        welcome.settings,
        welcome.pending
      );
    }

    setTimeout(
      async () => {
        try {
          await ctx.telegram.deleteMessage(
            ctx.chat.id,
            sent.message_id
          );
        } catch {}
      },
      Math.max(
  10,
  Number(
    groupSettings.welcomeDeleteAfterSeconds ?? 120
  )
) * 1000
    );
  }

  if (joinNoticeId) {
    setTimeout(
      () =>
        safeDelete(
          ctx,
          joinNoticeId
        ),
      Math.max(
        1,
        Number(
          groupSettings.joinNoticeDeleteAfterSeconds ||
            1
        )
      ) * 1000
    );
  }
}

async function findPendingCaptcha(
  userId
) {
  const data =
    await getWelcomeData();

  const item =
    data.pending.find(
      x =>
        Number(x.userId) ===
        Number(userId)
    );

  return {
    data,
    item
  };
}

async function sendRulesToUser(
  ctx,
  data
) {
  const rules =
    data.settings.rulesText;

  const max =
    3900;

  const chunks = [];
  let current = '';

  for (
    const line of
    String(rules).split('\n')
  ) {
    const next =
      current
        ? `${current}\n${line}`
        : line;

    if (
      next.length > max &&
      current
    ) {
      chunks.push(current);
      current = line;
    } else {
      current = next;
    }
  }

  if (current) {
    chunks.push(current);
  }

  for (
    let i = 0;
    i < chunks.length;
    i++
  ) {
    if (
      i ===
      chunks.length - 1
    ) {
      await ctx.reply(
        chunks[i],
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text:
                    data.settings
                      .confirmButtonText,
                  callback_data:
                    'captcha_accept'
                }
              ]
            ]
          }
        }
      );
    } else {
      await ctx.reply(
        chunks[i]
      );
    }
  }
}

function userInfoText(
  user
) {
  const username =
    user.username
      ? `@${user.username}`
      : 'ندارد';

  const name =
    [
      user.first_name,
      user.last_name
    ]
      .filter(Boolean)
      .join(' ') ||
    'None';

  const language =
    user.language_code ||
    'Nonw';

  return `<b>👤 UserInfo</b>

<b>ID:</b> <code>${user.id}</code>
<b>Name:</b> ${escapeHtml(name)}
<b>Username:</b> ${escapeHtml(username)}
<b>Bot:</b> ${user.is_bot ? 'Yes' : 'Nope'}
<b>Language:</b> ${escapeHtml(language)}

<a href="tg://user?id=${user.id}">User Profile</a>`;
}

async function handleUserId(
  ctx,
  argument = ''
) {
  if (!isAdmin(ctx)) {
    return;
  }

  const replyUser =
    ctx.message?.reply_to_message
      ?.from;

  if (
    replyUser &&
    !argument
  ) {
    await ctx.reply(
      userInfoText(
        replyUser
      ),
      {
        parse_mode: 'HTML'
      }
    );

    return;
  }

  const query =
    String(argument || '')
      .trim();

  if (!query) {
    await ctx.reply(
      userInfoText(
        ctx.from
      ),
      {
        parse_mode: 'HTML'
      }
    );

    return;
  }

  let username =
    query.replace(
      /^@/,
      ''
    );

  try {
    const chat =
      await ctx.telegram.getChat(
        `@${username}`
      );

    let text =
      `<b>Chat Info</b>

<b>ID:</b> <code>${chat.id}</code>
<b>Title:</b> ${escapeHtml(chat.title || 'ندارد')}
<b>Username:</b> ${escapeHtml(chat.username ? `@${chat.username}` : 'ندارد')}
<b>Type:</b> ${escapeHtml(chat.type || 'ندارد')}`;

    if (
      chat.description
    ) {
      text +=
        `\n<b>Description:</b> ${escapeHtml(chat.description)}`;
    }

    await ctx.reply(
      text,
      {
        parse_mode: 'HTML'
      }
    );

    return;
  } catch {}

  await ctx.reply(
    `<b>❌ کاربر با این Username پیدا نشد.</b>

برای گرفتن ID یک کاربر، پیام او را Reply کنید و /userid بزنید.`,
    {
      parse_mode: 'HTML'
    }
  );
}

async function previewWelcome(
  ctx
) {
  const data =
    await getWelcomeData();

  const fakeUser =
    ctx.from;

  const fakeChat =
    ctx.chat;

  const text =
    welcomeGroupText(
      data.settings.welcomeText,
      fakeUser,
      fakeChat
    );

  await ctx.reply(
    text,
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text:
                data.settings
                  .buttonText,
              url:
                `http://t.me/${BOT_USERNAME}?start=captcha_-${fakeUser.id}`
            }
          ]
        ]
      }
    }
  );
}

async function resetWelcome(
  ctx
) {
  const current =
    await getWelcomeData();

  const settings =
    getWelcomeDefaults();

  const saved =
    await saveWelcomeData(
      settings,
      current.pending
    );

  await ctx.reply(
    saved
      ? '<b>✅ تنظیمات Welcome به حالت پیش‌فرض برگشت.</b>'
      : '<b>❌ ذخیره تنظیمات انجام نشد.</b>',
    {
      parse_mode: 'HTML',
      reply_markup:
        welcomeKeyboard(
          settings.enabled
        )
    }
  );
}

async function toggleWelcome(
  ctx,
  enabled
) {
  if (
    ctx.chat?.type === 'group' ||
    ctx.chat?.type === 'supergroup'
  ) {
    const saved =
      await saveGroupSettingsV1(
        ctx.chat.id,
        { welcomeEnabled: enabled }
      );
    const settings =
      await getGroupSettingsV1(ctx.chat.id);
    await ctx.reply(
      saved
        ? `✅ Welcome در این گروه ${enabled ? 'فعال' : 'غیرفعال'} شد.`
        : '❌ ذخیره تنظیمات گروه انجام نشد.',
      {
        reply_markup:
          welcomeKeyboard(
            settings.welcomeEnabled
          )
      }
    );
    return;
  }

  const data =
    await getWelcomeData();

  data.settings.enabled =
    enabled;

  const saved =
    await saveWelcomeData(
      data.settings,
      data.pending
    );

  await ctx.reply(
    saved
      ? `<b>✅ Welcome ${enabled ? 'فعال' : 'غیرفعال'} شد.</b>`
      : '<b>❌ ذخیره تنظیمات انجام نشد.</b>',
    {
      parse_mode: 'HTML',
      reply_markup:
        welcomeKeyboard(
          data.settings.enabled
        )
    }
  );
}

bot.use(
  async (ctx, next) => {
    try {
      await readJsonStoreV1(
        GITHUB_ADMIN_FILE
      );
    } catch {}

    return next();
  }
);

setInterval(
  () => {
    pollScheduledPostsV1();
  },
  15000
);

bot.command(
  'settimep',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await beginScheduledPost(ctx);
  }
);

bot.command(
  'settimeplist',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await showScheduledList(ctx);
  }
);

bot.command(
  'destinationadd',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    const target =
      ctx.message.text
        .replace(
          /^\/destinationadd(?:@\w+)?\s*/i,
          ''
        )
        .trim();

    if (!target) {
      await ctx.reply(
        'فرمت: /destinationadd @channel'
      );
      return;
    }

    const destination =
      await saveScheduleDestination(
        ctx,
        target
      );
    await ctx.reply(
      destination
        ? `✅ کانال «${escapeHtml(destination.name)}» برای زمان‌بندی ثبت شد.`
        : '❌ ثبت کانال مقصد انجام نشد.',
      { parse_mode: 'HTML' }
    );
  }
);

bot.command(
  'fixpost',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    const link =
      ctx.message.text
        .replace(
          /^\/fixpost(?:@\w+)?\s*/i,
          ''
        )
        .trim();
    if (link) {
      await handleFixPost(ctx, link);
      return;
    }
    fixPostStates.set(
      ctx.chat.id,
      { ownerId: Number(ctx.from.id) }
    );
    await ctx.reply(
      'لینک پست کانال را ارسال کنید. پست اصلی تغییر نمی‌کند و نسخهٔ اصلاح‌شده جداگانه فرستاده می‌شود.'
    );
  }
);

bot.command(
  'uploader',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await beginUploader(ctx);
  }
);

bot.command(
  'nkfjjhhhh',
  async ctx => {
    await manageAdminCommandV1(
      ctx,
      ctx.message.text
    );
  }
);

bot.command(
  'manageadmin',
  async ctx => {
    await manageAdminCommandV1(
      ctx,
      ctx.message.text
    );
  }
);

bot.command(
  'filter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const arg =
      ctx.message.text
        .replace(
          /^\/filter(?:@\w+)?\s*/i,
          ''
        )
        .trim()
        .toLowerCase();
    const current =
      await getFilterStateV1(ctx.chat.id);

    if (
      arg === 'on' ||
      arg === 'فعال'
    ) {
      const saved =
        await saveFilterStateV1(
          ctx.chat.id,
          { enabled: true }
        );
      await saveGroupSettingsV1(
        ctx.chat.id,
        { linkFilterEnabled: true }
      );
      await ctx.reply(
        saved
          ? '🟢 Link Filter فعال شد.'
          : 'ذخیره filter.json انجام نشد.'
      );
      return;
    }

    if (
      arg === 'off' ||
      arg === 'غیرفعال'
    ) {
      const saved =
        await saveFilterStateV1(
          ctx.chat.id,
          { enabled: false }
        );
      await saveGroupSettingsV1(
        ctx.chat.id,
        { linkFilterEnabled: false }
      );
      await ctx.reply(
        saved
          ? '🔴 Link Filter غیرفعال شد.'
          : 'ذخیره filter.json انجام نشد.'
      );
      return;
    }

    if (
      arg === 'warning-on' ||
      arg === 'warning-off'
    ) {
      const saved =
        await saveFilterStateV1(
          ctx.chat.id,
          { autoWarning: arg === 'warning-on' }
        );
      await ctx.reply(
        saved
          ? `اخطار خودکار ${arg === 'warning-on' ? 'فعال' : 'غیرفعال'} شد.`
          : 'ذخیره تنظیمات انجام نشد.'
      );
      return;
    }

    await ctx.reply(
      `وضعیت Link Filter: ${current.enabled ? '🟢 فعال' : '🔴 غیرفعال'}
اخطار خودکار: ${current.autoWarning === false ? 'غیرفعال' : 'فعال'}

دستورها: /filter on، /filter off، /filter warning-on، /filter warning-off`,
      { reply_markup: filterKeyboard() }
    );
  }
);

bot.command(
  'nofilter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const arg =
      ctx.message.text
        .replace(
          /^\/nofilter(?:@\w+)?\s*/i,
          ''
        )
        .trim();
    const current =
      await getAllowedLinksV1(ctx.chat.id);
    const lower =
      arg.toLowerCase();

    if (!arg || lower === 'list') {
      await ctx.reply(
        `<b>🟢 NoFilter</b>

${current
  .map(item => `• ${escapeHtml(item)}`)
  .join('\n') || 'فهرست خالی است.'}

افزودن: <code>/nofilter @site1 @site2</code>
حذف تکی: <code>/nofilter remove @site</code>
حذف همه: <code>/nofilter clear</code>`,
        {
          parse_mode: 'HTML',
          reply_markup: noFilterKeyboard()
        }
      );
      return;
    }

    if (lower === 'clear') {
      const saved =
        await updateAllowedLinksV1(
          ctx.chat.id,
          []
        );
      await ctx.reply(
        saved
          ? '✅ فهرست NoFilter پاک شد.'
          : 'ذخیره nofilter.json انجام نشد.'
      );
      return;
    }

    if (/^remove\s+/i.test(arg)) {
      const removeValues =
        arg.replace(/^remove\s+/i, '')
          .split(/[\s,]+/)
          .map(normalizeAllowedLink);
      const saved =
        await updateAllowedLinksV1(
          ctx.chat.id,
          current.filter(
            item =>
              !removeValues.includes(
                normalizeAllowedLink(item)
              )
          )
        );
      await ctx.reply(
        saved
          ? '✅ مورد از NoFilter حذف شد.'
          : 'ذخیره تغییر انجام نشد.'
      );
      return;
    }

    const additions =
      arg.split(/[\s,]+/)
        .map(normalizeAllowedLink)
        .filter(Boolean);
    const saved =
      await updateAllowedLinksV1(
        ctx.chat.id,
        [...current, ...additions]
      );
    await ctx.reply(
      saved
        ? `✅ ${additions.length} مورد به NoFilter اضافه شد.`
        : 'ذخیره nofilter.json انجام نشد.'
    );
  }
);

bot.command(
  'warnings',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    await showWarningsV1(ctx);
  }
);

bot.command(
  'warnclearall',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    await clearWarningsV1(ctx);
  }
);

bot.command(
  'warnlimit',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const value =
      Number(
        ctx.message.text
          .replace(
            /^\/warnlimit(?:@\w+)?\s*/i,
            ''
          )
          .trim()
      );
    if (
      !Number.isInteger(value) ||
      value < 1 ||
      value > 20
    ) {
      await ctx.reply(
        `حد مجاز فعلی: ${(await getGroupSettingsV1(ctx.chat.id)).warningLimit}

برای تغییر: /warnlimit 3`
      );
      return;
    }
    const saved =
      await saveGroupSettingsV1(
        ctx.chat.id,
        { warningLimit: value }
      );
    await ctx.reply(
      saved
        ? `✅ حد Warning روی ${value} تنظیم شد.`
        : 'ذخیره groups.json انجام نشد.'
    );
  }
);

bot.command(
  'welcome',
  async ctx => {
    const inGroup =
      ['group', 'supergroup'].includes(
        ctx.chat?.type
      );
    if (
      inGroup &&
      !(await requireGroupModerator(ctx))
    ) {
      return;
    }
    if (
      !inGroup &&
      !isAdmin(ctx)
    ) {
      return;
    }
    const arg =
      ctx.message.text
        .replace(
          /^\/welcome(?:@\w+)?\s*/i,
          ''
        )
        .trim()
        .toLowerCase();
    if (
      arg === 'on' ||
      arg === 'فعال'
    ) {
      await toggleWelcome(ctx, true);
    } else if (
      arg === 'off' ||
      arg === 'غیرفعال'
    ) {
      await toggleWelcome(ctx, false);
    } else {
      const settings =
        inGroup
          ? await getGroupSettingsV1(ctx.chat.id)
          : (await getWelcomeData()).settings;
      await ctx.reply(
        `وضعیت Welcome: ${settings.welcomeEnabled ?? settings.enabled ? 'فعال' : 'غیرفعال'}

فعال: /welcome on
غیرفعال: /welcome off`
      );
    }
  }
);

bot.command(
  'captcha',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const enabled =
      /^on|فعال$/i.test(
        ctx.message.text
          .replace(
            /^\/captcha(?:@\w+)?\s*/i,
            ''
          )
          .trim()
      );
    const saved =
      await saveGroupSettingsV1(
        ctx.chat.id,
        { captchaEnabled: enabled }
      );
    await ctx.reply(
      saved
        ? `✅ Captcha ${enabled ? 'فعال' : 'غیرفعال'} شد.`
        : 'ذخیره تنظیمات گروه انجام نشد.'
    );
  }
);

bot.command(
  'welcomedelete',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const minutes =
      Number(
        ctx.message.text
          .replace(
            /^\/welcomedelete(?:@\w+)?\s*/i,
            ''
          )
          .trim()
      );
    if (
      !Number.isInteger(minutes) ||
      minutes < 1 ||
      minutes > 1440
    ) {
      await ctx.reply(
        'فرمت: /welcomedelete 5 (دقیقه)'
      );
      return;
    }
    const saved =
      await saveGroupSettingsV1(
        ctx.chat.id,
        {
          welcomeDeleteAfterSeconds:
            minutes * 60
        }
      );
    await ctx.reply(
      saved
        ? `✅ پیام Welcome پس از ${minutes} دقیقه پاک می‌شود.`
        : 'ذخیره تنظیمات انجام نشد.'
    );
  }
);

for (const action of [
  'warn',
  'mute',
  'unmute',
  'ban',
  'kick',
  'unban',
  'purge',
  'pin',
  'unpin',
  'lock',
  'unlock'
]) {
  bot.command(
    action,
    async ctx => {
      const argument =
        ctx.message.text
          .replace(
            new RegExp(`^/${action}(?:@\\\\w+)?\\\\s*`, 'i'),
            ''
          )
          .trim();
      await handleModerationActionV1(
        ctx,
        action,
        argument
      );
    }
  );
}

bot.command(
  'grouplist',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const type =
      ctx.message.text
        .replace(
          /^\/grouplist(?:@\w+)?\s*/i,
          ''
        )
        .trim()
        .toLowerCase();
    await showGroupListsV1(
      ctx,
      type || 'all'
    );
  }
);

bot.command(
  'warningaction',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const action =
      ctx.message.text
        .replace(
          /^\/warningaction(?:@\w+)?\s*/i,
          ''
        )
        .trim()
        .toLowerCase();
    if (!['ban', 'kick'].includes(action)) {
      await ctx.reply(
        'انتخاب کنید: /warningaction ban یا /warningaction kick'
      );
      return;
    }
    const saved =
      await saveGroupSettingsV1(
        ctx.chat.id,
        { warningAction: action }
      );
    await ctx.reply(
      saved
        ? `✅ اقدام پس از رسیدن به حد Warning: ${action}`
        : 'ذخیره تنظیمات انجام نشد.'
    );
  }
);

bot.hears(
  '🛡 Group Manager',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await ctx.reply(
      '<b>🛡 Group Manager</b>\nدستورهای Moderation فقط در گروه و برای مدیر گروه اجرا می‌شوند.',
      {
        parse_mode: 'HTML',
        reply_markup: groupManagerKeyboard()
      }
    );
  }
);

bot.hears(
  '⚠️ Warning',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await ctx.reply(
      '<b>⚠️ مدیریت Warning</b>\nروی پیام کاربر Reply کنید و /warn بزنید. حد پیش‌فرض ۳ است.',
      {
        parse_mode: 'HTML',
        reply_markup: warningKeyboard()
      }
    );
  }
);

bot.hears(
  '🔗 Link Filter',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    const filter =
      ctx.chat?.type === 'group' ||
      ctx.chat?.type === 'supergroup'
        ? await getFilterStateV1(ctx.chat.id)
        : null;
    await ctx.reply(
      `<b>🔗 Link Filter</b>

${filter
  ? `وضعیت این گروه: ${filter.enabled ? '🟢 فعال' : '🔴 غیرفعال'}\nاخطار خودکار: ${filter.autoWarning === false ? 'غیرفعال' : 'فعال'}`
  : 'این بخش را داخل گروه باز کنید یا از /filter در گروه استفاده کنید.'}`,
      {
        parse_mode: 'HTML',
        reply_markup: filterKeyboard()
      }
    );
  }
);

bot.hears(
  '🟢 NoFilter',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    const links =
      ['group', 'supergroup'].includes(ctx.chat?.type)
        ? await getAllowedLinksV1(ctx.chat.id)
        : [];
    await ctx.reply(
      `<b>🟢 NoFilter</b>

${links
  .map(item => `• ${escapeHtml(item)}`)
  .join('\n') || 'برای مدیریت فهرست، این بخش را داخل گروه باز کنید.'}

افزودن: /nofilter @site1 @site2`,
      {
        parse_mode: 'HTML',
        reply_markup: noFilterKeyboard()
      }
    );
  }
);

bot.hears(
  '📋 Group Lists',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    await showGroupListsV1(ctx);
  }
);

bot.hears(
  '📋 لیست Warningها',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    await showWarningsV1(ctx);
  }
);

bot.hears(
  '🔢 تعداد مجاز',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    managerStates.set(
      ctx.chat.id,
      { action: 'warning-limit' }
    );
    await ctx.reply(
      'تعداد Warning مجاز را بین ۱ تا ۲۰ بفرستید.'
    );
  }
);

bot.hears(
  '🧹 پاک کردن همه Warningها',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    await clearWarningsV1(ctx);
  }
);

bot.hears(
  '🟢 فعال‌سازی Filter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const saved =
      await saveFilterStateV1(
        ctx.chat.id,
        { enabled: true }
      );
    await saveGroupSettingsV1(
      ctx.chat.id,
      { linkFilterEnabled: true }
    );
    await ctx.reply(
      saved ? '🟢 Filter فعال شد.' : '❌ ذخیره انجام نشد.'
    );
  }
);

bot.hears(
  '🔴 غیرفعال‌سازی Filter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const saved =
      await saveFilterStateV1(
        ctx.chat.id,
        { enabled: false }
      );
    await saveGroupSettingsV1(
      ctx.chat.id,
      { linkFilterEnabled: false }
    );
    await ctx.reply(
      saved ? '🔴 Filter غیرفعال شد.' : '❌ ذخیره انجام نشد.'
    );
  }
);

bot.hears(
  '📊 وضعیت Filter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const filter =
      await getFilterStateV1(ctx.chat.id);
    await ctx.reply(
      `Filter: ${filter.enabled ? 'فعال' : 'غیرفعال'}\nاخطار خودکار: ${filter.autoWarning === false ? 'غیرفعال' : 'فعال'}`
    );
  }
);

bot.hears(
  '📋 لیست NoFilter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const links =
      await getAllowedLinksV1(ctx.chat.id);
    await ctx.reply(
      `<b>🟢 NoFilter</b>\n${links
        .map(item => `• ${escapeHtml(item)}`)
        .join('\n') || 'فهرست خالی است.'}`,
      {
        parse_mode: 'HTML',
        reply_markup: noFilterKeyboard()
      }
    );
  }
);

bot.hears(
  '🗑 حذف همه NoFilter',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    const saved =
      await updateAllowedLinksV1(
        ctx.chat.id,
        []
      );
    await ctx.reply(
      saved ? '✅ فهرست پاک شد.' : '❌ ذخیره انجام نشد.'
    );
  }
);

bot.hears(
  '➖ حذف لینک مجاز',
  async ctx => {
    if (!(await requireGroupModerator(ctx))) {
      return;
    }
    managerStates.set(
      ctx.chat.id,
      { action: 'nofilter-remove' }
    );
    await ctx.reply(
      'نام کاربری یا دامنه‌ای که می‌خواهید حذف کنید بفرستید؛ چند مورد را با فاصله جدا کنید.'
    );
  }
);

for (const [label, action] of [
  ['🔇 Mute', 'mute'],
  ['🔊 Unmute', 'unmute'],
  ['🚫 Ban', 'ban'],
  ['♻️ Unban', 'unban'],
  ['👢 Kick', 'kick'],
  ['🧹 Purge', 'purge'],
  ['📌 Pin', 'pin'],
  ['📍 Unpin', 'unpin'],
  ['🔒 Lock', 'lock'],
  ['🔓 Unlock', 'unlock']
]) {
  bot.hears(
    label,
    async ctx => {
      if (!isAdmin(ctx)) {
        return;
      }
      managerStates.set(
        ctx.chat.id,
        { action }
      );
      const needsReply =
        ['purge', 'pin', 'unpin'].includes(action);
      await ctx.reply(
        needsReply
          ? `برای ${action} روی پیام موردنظر Reply کنید و تعداد پیام را برای Purge در همان پیام بنویسید.`
          : `کاربر را Reply کنید یا آیدی عددی او را بفرستید تا ${action} اجرا شود.`,
        {
          reply_markup:
            groupManagerKeyboard()
        }
      );
    }
  );
}

bot.hears(
  '📋 Scheduled List',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await showScheduledList(ctx);
  }
);

bot.hears(
  '⏰ Scheduled Post',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await beginScheduledPost(ctx);
  }
);

bot.hears(
  '🔧 Fix Post',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    fixPostStates.set(
      ctx.chat.id,
      { ownerId: Number(ctx.from.id) }
    );
    await ctx.reply(
      'لینک پست کانال را ارسال کنید. پست اصلی تغییر نمی‌کند.'
    );
  }
);

bot.hears(
  '⬆️ Uploader',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await beginUploader(ctx);
  }
);

bot.hears(
  '⏱ تنظیمات پاک‌سازی',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    if (
      !['group', 'supergroup'].includes(
        ctx.chat?.type
      )
    ) {
      await ctx.reply(
        'این تنظیم را داخل گروه با دستور /welcomedelete 5 (دقیقه) انجام دهید.'
      );
      return;
    }
    const settings =
      await getGroupSettingsV1(ctx.chat.id);
    await ctx.reply(
      `پاک‌سازی پیام Welcome: ${Math.round(settings.welcomeDeleteAfterSeconds / 60)} دقیقه\nپاک‌سازی پیام پیوستن: ${Math.round(settings.joinNoticeDeleteAfterSeconds / 60)} دقیقه\nتنظیم: /welcomedelete 5`
    );
  }
);

bot.action(
  /^schedule:(text|time|channel|delete|now|toggle):(.+)$/,
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    await handleScheduleAction(
      ctx,
      ctx.match[1],
      ctx.match[2]
    );
  }
);

bot.start(
  async ctx => {
    const text =
      ctx.message?.text || '';

    const match =
      text.match(
        /^\/start(?:@\w+)?(?:\s+(.+))?$/i
      );

    const payload =
      String(match?.[1] || '').trim();


    if (
      payload.startsWith(
        'captcha_-'
      )
    ) {
      const targetId =
        Number(
          payload.replace(
            'captcha_-',
            ''
          )
        );

      if (
        !Number.isFinite(targetId) ||
        targetId !==
          Number(ctx.from?.id)
      ) {
        return;
      }

      const result =
        await findPendingCaptcha(
          ctx.from.id
        );

      if (!result.item) {
        await ctx.reply(
          '<b>این درخواست منقضی شده یا قبلاً تأیید شده است.</b>',
          {
            parse_mode: 'HTML'
          }
        );

        return;
      }

      await sendRulesToUser(
        ctx,
        result.data
      );

      return;
    }


    if (isAdmin(ctx)) {
      await ctx.reply(
        '<b>Owner Panel</b>',
        {
          parse_mode: 'HTML',
          reply_markup:
            mainKeyboard()
        }
      );

      return;
    }

    await ctx.reply(
      USER_COMMANDS_TEXT,
      {
        parse_mode: 'HTML',
        link_preview_options: {
          is_disabled: true
        }
      }
    );
  }
);



const FM_ARCHIVE_FILE =
  'channelallpost.json';

const FM_ARCHIVE_CHANNEL =
  'FaarsiMovie';

const FM_ARCHIVE_SCAN_LIMIT =
  100000;

let fmArchiveScanRunning =
  false;

function fmArchiveIsOwner(ctx) {
  try {
    return isAdmin(ctx);
  } catch {
    return false;
  }
}

function fmArchiveEscape(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmArchiveExtractTitle(text) {
  if (!text) return '';

  const clean =
    String(text)
      .replace(/\r/g, '')
      .trim();

  if (!clean) return '';

  const lines =
    clean
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);

  if (!lines.length) return '';

  let best = lines[0];
  let bestScore = -1;

  for (const line of lines) {
    const english =
      (line.match(/[A-Za-z]/g) || []).length;

    const numbers =
      (line.match(/[0-9]/g) || []).length;

    const bad =
      (line.match(/[^\x00-\x7F]/g) || []).length;

    const score =
      english * 3 +
      numbers -
      bad;

    if (score > bestScore) {
      bestScore = score;
      best = line;
    }
  }

  return best
    .replace(
      /https?:\/\/\S+/gi,
      ''
    )
    .replace(
      /@\w+/g,
      ''
    )
    .replace(
      /^\s*[-–—|•:]+\s*/,
      ''
    )
    .trim();
}

async function fmArchiveFetchPage(
  channel,
  before
) {
  const url =
    before
      ? `https://t.me/s/${channel}?before=${before}`
      : `https://t.me/s/${channel}`;

  const response =
    await axios.get(
      url,
      {
        timeout: 30000,
        headers: {
          'User-Agent':
            'Mozilla/5.0'
        }
      }
    );

  return String(
    response.data || ''
  );
}

function fmArchiveParsePosts(
  html,
  channel
) {
  const records = [];

  if (!html) {
    return records;
  }

  const pattern =
    /data-post="([^"]+)"/g;

  let match;

  while (
    (match = pattern.exec(html)) !== null
  ) {
    const postRef =
      match[1];

    const parts =
      postRef.split('/');

    const postId =
      Number(
        parts[parts.length - 1]
      );

    if (
      !Number.isInteger(postId) ||
      postId <= 0
    ) {
      continue;
    }

    const start =
      Math.max(
        0,
        match.index - 5000
      );

    const end =
      Math.min(
        html.length,
        match.index + 15000
      );

    const block =
      html.slice(
        start,
        end
      );

    const textMatches =
      [
        ...block.matchAll(
          /<div[^>]*class="[^"]*tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
        )
      ];

    let text = '';

    if (textMatches.length) {
      text =
        textMatches[
          textMatches.length - 1
        ][1]
          .replace(
            /<br\s*\/?>/gi,
            '\n'
          )
          .replace(
            /<[^>]+>/g,
            ' '
          )
          .replace(
            /&nbsp;/g,
            ' '
          )
          .replace(
            /&amp;/g,
            '&'
          )
          .replace(
            /&lt;/g,
            '<'
          )
          .replace(
            /&gt;/g,
            '>'
          )
          .replace(
            /&quot;/g,
            '"'
          )
          .trim();
    }

    const title =
      fmArchiveExtractTitle(
        text
      );

    records.push({
      postId,
      title,
      link:
        `https://t.me/${channel}/${postId}`
    });
  }

  const unique =
    new Map();

  for (const item of records) {
    unique.set(
      item.postId,
      item
    );
  }

  return [
    ...unique.values()
  ].sort(
    (a, b) =>
      a.postId -
      b.postId
  );
}

async function fmArchiveSave(
  records
) {
  const payload = {
    channel:
      FM_ARCHIVE_CHANNEL,
    updatedAt:
      new Date().toISOString(),
    total:
      records.length,
    records
  };

  if (
    typeof writeJsonStoreV1 ===
    'function'
  ) {
    return await writeJsonStoreV1(
      FM_ARCHIVE_FILE,
      records
    );
  }

  return false;
}

async function fmArchiveLoad() {
  if (
    typeof readJsonStoreV1 ===
    'function'
  ) {
    const data =
      await readJsonStoreV1(
        FM_ARCHIVE_FILE
      );

    if (Array.isArray(data)) {
      return data;
    }

    if (
      data &&
      Array.isArray(data.records)
    ) {
      return data.records;
    }
  }

  return [];
}

async function fmArchiveProgress(
  ctx,
  messageId,
  current,
  total,
  lastPost
) {
  const percent =
    total > 0
      ? ((current / total) * 100)
          .toFixed(1)
      : '0.0';

  const bars =
    Math.min(
      20,
      Math.max(
        0,
        Math.round(
          Number(percent) / 5
        )
      )
    );

  const progress =
    '█'.repeat(bars) +
    '░'.repeat(
      20 - bars
    );

  const text =
    `<b>📥 Channel Scan</b>

<b>Progress:</b> ${current} / ${total}
${progress} ${percent}%

<b>Last post:</b> ${lastPost}`;

  try {
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      messageId,
      undefined,
      text,
      {
        parse_mode: 'HTML'
      }
    );
  } catch {}
}








bot.command('updatebot', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return ctx.reply('❌ Only the main owner can use this command.');
    }

    updateBotStates.set(ctx.from.id, {
      waitingForFile: true
    });

    await ctx.reply(
      '📦 Send the new bot.js file.\n\n' +
      '⚠️ Only bot.js is accepted.'
    );

  } catch (error) {
    console.error('updatebot start:', error);
    await ctx.reply('❌ Failed to start update.');
  }
});


bot.on('document', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) return;

    const state = updateBotStates.get(ctx.from.id);
    if (!state || !state.waitingForFile) return;

    const document = ctx.message.document;

    if (!document || document.file_name !== 'bot.js') {
      return ctx.reply(
        '❌ Invalid file.\n\nSend a file named exactly bot.js'
      );
    }

    updateBotStates.delete(ctx.from.id);

    const progress = await ctx.reply('⏳ Updating bot.js...');

    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    // Get current bot.js
    const currentUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;

    const currentResponse = await axios.get(
      currentUrl,
      { headers }
    );

    const currentFile = currentResponse.data;

    if (!currentFile?.sha || !currentFile?.content) {
      throw new Error('Current bot.js not found.');
    }

    const oldSha = currentFile.sha;

    // Backup uses the real GitHub SHA
    const backupPath =
      `${GITHUB_BACKUP_DIR}/bot-${oldSha}.js`;

    const backupUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${backupPath}`;

    // Check if this exact version already has a backup
    let backupExists = false;

    try {
      await axios.get(backupUrl, { headers });
      backupExists = true;
    } catch (error) {
      if (!error.response || error.response.status !== 404) {
        throw error;
      }
    }

    // Create backup only if it does not exist
    if (!backupExists) {
      await axios.put(
        backupUrl,
        {
          message: `Backup bot.js ${oldSha.substring(0, 7)}`,
          content: currentFile.content.replace(/\s/g, ''),
          branch: GITHUB_BRANCH
        },
        { headers }
      );
    }

    // Download new bot.js
    const fileUrl =
      await ctx.telegram.getFileLink(document.file_id);

    const fileResponse = await axios.get(
      fileUrl,
      { responseType: 'arraybuffer' }
    );

    const newCode =
      Buffer.from(fileResponse.data).toString('utf8');

    if (!newCode.trim()) {
      throw new Error('New bot.js is empty.');
    }

    const newContent =
      Buffer.from(newCode, 'utf8').toString('base64');

    // Update bot.js
    const updateUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

    const updateResponse = await axios.put(
      updateUrl,
      {
        message: 'Update bot.js',
        content: newContent,
        sha: oldSha,
        branch: GITHUB_BRANCH
      },
      { headers }
    );

    const newSha =
      updateResponse.data?.content?.sha;

    if (!newSha) {
      throw new Error('GitHub did not return the new SHA.');
    }

    // Update now.json
    const nowPath =
      `${GITHUB_BACKUP_DIR}/now.json`;

    const nowUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${nowPath}`;

    let nowSha = null;

    try {
      const nowResponse = await axios.get(
        `${nowUrl}?ref=${GITHUB_BRANCH}`,
        { headers }
      );

      nowSha = nowResponse.data?.sha || null;

    } catch (error) {
      if (!error.response || error.response.status !== 404) {
        throw error;
      }
    }

    const nowData = {
      version: newSha,
      previousVersion: oldSha,
      file: GITHUB_FILE_PATH,
      branch: GITHUB_BRANCH,
      source: 'github',
      updatedAt: new Date().toISOString(),
      status: 'pending'
    };

    const nowContent =
      Buffer.from(
        JSON.stringify(nowData, null, 2),
        'utf8'
      ).toString('base64');

    const nowPayload = {
      message: 'Update bot version metadata',
      content: nowContent,
      branch: GITHUB_BRANCH
    };

    if (nowSha) {
      nowPayload.sha = nowSha;
    }

    await axios.put(
      nowUrl,
      nowPayload,
      { headers }
    );

    const backupRawUrl =
      `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${backupPath}`;

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      progress.message_id,
      undefined,
      '✅ Update uploaded successfully.\n\n' +
      '🗄 Previous version:\n' +
      backupRawUrl +
      '\n\n' +
      '⏳ Bot is updating...'
    );

  } catch (error) {
    console.error('updatebot:', error);

    updateBotStates.delete(ctx.from.id);

    await ctx.reply(
      '❌ Update failed.\n\n' +
      (error.message || 'Please try again.')
    );
  }
});


bot.command('backupfile', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return ctx.reply('❌ Only the main owner can use this command.');
    }

    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    // Current bot.js
    const currentUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;

    const currentResponse = await axios.get(
      currentUrl,
      { headers }
    );

    const currentFile = currentResponse.data;

    if (!currentFile?.sha) {
      throw new Error('Current bot.js not found.');
    }

    const currentRawUrl =
      `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${GITHUB_FILE_PATH}`;

    // Find backups
    const treeUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;

    const treeResponse = await axios.get(
      treeUrl,
      { headers }
    );

    const backups = (treeResponse.data.tree || [])
      .filter(file =>
        file.type === 'blob' &&
        file.path.startsWith(`${GITHUB_BACKUP_DIR}/bot-`) &&
        file.path.endsWith('.js')
      )
      .sort((a, b) =>
        b.path.localeCompare(a.path)
      );

    let message =
      '📦 Current bot.js:\n' +
      currentRawUrl;

    if (backups.length > 0) {
      const latest = backups[0];

      const backupRawUrl =
        `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${latest.path}`;

      message +=
        '\n\n🗄 Previous version:\n' +
        backupRawUrl;
    } else {
      message +=
        '\n\n🗄 Previous version:\n' +
        'No backup found.';
    }

    await ctx.reply(message);

  } catch (error) {
    console.error('backupfile:', error);

    await ctx.reply(
      '❌ Backup failed.\n\n' +
      (error.message || 'Please try again.')
    );
  }
});


bot.command(
  'testch',
  async ctx => {
    if (!fmArchiveIsOwner(ctx)) {
      return;
    }

    if (fmArchiveScanRunning) {
      await ctx.reply(
        '⏳ یک اسکن دیگر در حال اجراست.'
      );
      return;
    }

    const input =
      ctx.message.text
        .replace(
          /^\/testch(?:@\w+)?/i,
          ''
        )
        .trim();

    const channel =
      input
        .replace(/^@/, '')
        .trim() ||
      FM_ARCHIVE_CHANNEL;

    fmArchiveScanRunning = true;

    let status;

    try {
      status =
        await ctx.reply(
          `<b>📥 Channel Scan Started</b>

<b>Channel:</b> @${fmArchiveEscape(channel)}
<b>Status:</b> Preparing...`,
          {
            parse_mode: 'HTML'
          }
        );

      const recordsStore = {};
      let before = null;
      let pageCount = 0;
      let lastOldest = Infinity;

      while (
        pageCount <
        FM_ARCHIVE_SCAN_LIMIT
      ) {
        pageCount++;

        const html =
          await fmArchiveFetchPage(
            channel,
            before
          );

        const posts =
          fmArchiveParsePosts(
            html,
            channel
          );

        if (!posts.length) {
          break;
        }

        for (const post of posts) {
          recordsStore[
            String(post.postId)
          ] = post;
        }

        const records =
          Object.values(
            recordsStore
          ).sort(
            (a, b) =>
              a.postId -
              b.postId
          );

        const oldest =
          records.length
            ? records[0].postId
            : 0;

        const newest =
          records.length
            ? records[
                records.length - 1
              ].postId
            : 0;

        const estimatedTotal =
          newest > 0
            ? newest
            : records.length;

        await fmArchiveProgress(
          ctx,
          status.message_id,
          records.length,
          estimatedTotal,
          newest
        );

        if (
          oldest <= 1 ||
          oldest >= lastOldest
        ) {
          break;
        }

        lastOldest = oldest;
        before = oldest;

        if (
          records.length >=
          FM_ARCHIVE_SCAN_LIMIT
        ) {
          break;
        }
      }

      const finalRecords =
        Object.values(
          recordsStore
        ).sort(
          (a, b) =>
            a.postId -
            b.postId
        );

      const saved =
        await fmArchiveSave(
          finalRecords
        );

      const firstPost =
        finalRecords.length
          ? finalRecords[0].postId
          : 0;

      const lastPost =
        finalRecords.length
          ? finalRecords[
              finalRecords.length - 1
            ].postId
          : 0;

      await ctx.telegram.editMessageText(
        ctx.chat.id,
        status.message_id,
        undefined,
        `<b>✅ Scan Completed</b>

<b>Channel:</b> @${fmArchiveEscape(channel)}
<b>Total posts:</b> ${finalRecords.length}
<b>Saved:</b> ${saved ? 'YES' : 'NO'}

<b>First post:</b> ${firstPost}
<b>Last post:</b> ${lastPost}

📁 <b>${FM_ARCHIVE_FILE}</b>

🔗 https://t.me/${channel}/${lastPost}`,
        {
          parse_mode: 'HTML',
          link_preview_options: {
            is_disabled: true
          }
        }
      );
    } catch (error) {
      console.error(
        'FM ARCHIVE SCAN ERROR:',
        error
      );

      if (status) {
        try {
          await ctx.telegram.editMessageText(
            ctx.chat.id,
            status.message_id,
            undefined,
            '❌ Scan failed.',
            {
              parse_mode: 'HTML'
            }
          );
        } catch {}
      }
    } finally {
      fmArchiveScanRunning = false;
    }
  }
);

bot.command(
  'testchchange',
  async ctx => {
    if (!fmArchiveIsOwner(ctx)) {
      return;
    }

    const input =
      ctx.message.text
        .replace(
          /^\/testchchange(?:@\w+)?/i,
          ''
        )
        .trim();

    const parts =
      input.split('|');

    if (parts.length !== 2) {
      await ctx.reply(
        `<b>فرمت صحیح:</b>

<code>/testchchange متن قدیمی|متن جدید</code>

مثال:

<code>/testchchange King is|Lord is</code>`,
        {
          parse_mode: 'HTML'
        }
      );
      return;
    }

    const oldText =
      parts[0].trim();

    const newText =
      parts[1].trim();

    if (!oldText) {
      await ctx.reply(
        '❌ متن قبلی نمی‌تواند خالی باشد.'
      );
      return;
    }

    const channel =
      FM_ARCHIVE_CHANNEL;

    try {
      const records =
        await fmArchiveLoad();

      if (
        !Array.isArray(records) ||
        !records.length
      ) {
        await ctx.reply(
          '❌ اطلاعاتی در channelallpost.json وجود ندارد.'
        );
        return;
      }

      let fileChanged = 0;
      let fileReplacements = 0;

      const updatedRecords =
        records.map(item => {
          const title =
            String(item.title || '');

          if (
            !title.includes(oldText)
          ) {
            return item;
          }

          let count = 0;
          let position = 0;

          while (
            (position =
              title.indexOf(
                oldText,
                position
              )) !== -1
          ) {
            count++;
            position +=
              oldText.length;
          }

          fileChanged++;
          fileReplacements += count;

          return {
            ...item,
            title:
              title
                .split(oldText)
                .join(newText)
          };
        });

      const saved =
        await fmArchiveSave(
          updatedRecords
        );

      if (!saved) {
        await ctx.reply(
          '❌ ذخیره channelallpost.json ناموفق بود.'
        );
        return;
      }

      let channelChanged = 0;
      let channelReplacements = 0;

      const status =
        await ctx.reply(
          `<b>🔄 تغییر در کانال شروع شد...</b>

<b>متن قدیمی:</b>
<code>${fmArchiveEscape(oldText)}</code>

<b>متن جدید:</b>
<code>${fmArchiveEscape(newText)}</code>`,
          {
            parse_mode: 'HTML'
          }
        );

      for (
        const item of records
      ) {
        const postId =
          Number(item.postId);

        if (
          !Number.isInteger(postId) ||
          postId <= 0
        ) {
          continue;
        }

        try {
          const page =
            await axios.get(
              `https://t.me/s/${channel}/${postId}`,
              {
                timeout: 20000,
                headers: {
                  'User-Agent':
                    'Mozilla/5.0'
                }
              }
            );

          const html =
            String(
              page.data || ''
            );

          const match =
            html.match(
              /<div[^>]*class="[^"]*tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/i
            );

          if (!match) {
            continue;
          }

          const currentText =
            match[1]
              .replace(
                /<br\s*\/?>/gi,
                '\n'
              )
              .replace(
                /<[^>]+>/g,
                ' '
              )
              .replace(
                /&nbsp;/g,
                ' '
              )
              .replace(
                /&amp;/g,
                '&'
              )
              .replace(
                /&lt;/g,
                '<'
              )
              .replace(
                /&gt;/g,
                '>'
              )
              .replace(
                /&quot;/g,
                '"'
              )
              .trim();

          if (
            !currentText.includes(
              oldText
            )
          ) {
            continue;
          }

          const newMessageText =
            currentText
              .split(oldText)
              .join(newText);

          let count = 0;
          let position = 0;

          while (
            (position =
              currentText.indexOf(
                oldText,
                position
              )) !== -1
          ) {
            count++;
            position +=
              oldText.length;
          }

          await ctx.telegram.editMessageText(
            `@${channel}`,
            postId,
            undefined,
            newMessageText
          );

          channelChanged++;
          channelReplacements += count;

          await new Promise(
            resolve =>
              setTimeout(
                resolve,
                500
              )
          );
        } catch (error) {
          console.error(
            `CHANNEL POST ${postId} ERROR:`,
            error
          );
        }

        if (
          channelChanged % 10 === 0
        ) {
          try {
            await ctx.telegram.editMessageText(
              ctx.chat.id,
              status.message_id,
              undefined,
              `<b>🔄 تغییر در کانال...</b>

<b>بررسی شده:</b> ${records.indexOf(item) + 1} / ${records.length}

<b>پست‌های تغییر کرده:</b> ${channelChanged}

<b>جایگزینی‌ها:</b> ${channelReplacements}`,
              {
                parse_mode: 'HTML'
              }
            );
          } catch {}
        }
      }

      await ctx.telegram.editMessageText(
        ctx.chat.id,
        status.message_id,
        undefined,
        `<b>✅ تغییر با موفقیت انجام شد</b>

<b>🔤 متن قدیمی:</b>
<code>${fmArchiveEscape(oldText)}</code>

<b>🆕 متن جدید:</b>
<code>${fmArchiveEscape(newText)}</code>

<b>📁 فایل آرشیو</b>
پست‌های تغییر کرده: ${fileChanged}
تعداد جایگزینی: ${fileReplacements}

<b>📢 خود کانال</b>
پست‌های تغییر کرده: ${channelChanged}
تعداد جایگزینی: ${channelReplacements}

📁 <b>${FM_ARCHIVE_FILE}</b>`,
        {
          parse_mode: 'HTML'
        }
      );
    } catch (error) {
      console.error(
        'FM ARCHIVE CHANGE ERROR:',
        error
      );

      await ctx.reply(
        '❌ خطا در اجرای تغییرات.'
      );
    }
  }
);



const ANILIST_API_URL = 'https://graphql.anilist.co';

async function anilistRequest(query, variables = {}) {
  try {
    const response = await axios.post(
      ANILIST_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000
      }
    );

    if (!response?.data) {
      throw new Error('Empty AniList response');
    }

    if (
      Array.isArray(response.data.errors) &&
      response.data.errors.length
    ) {
      throw new Error(
        response.data.errors[0]?.message ||
        'AniList GraphQL Error'
      );
    }

    return response.data.data || null;

  } catch (error) {
    console.error('ANILIST REQUEST ERROR:', error);
    return null;
  }
}

async function searchAnimeOnAniList(search) {
  const query = `
    query ($search: String!) {
      Page(page: 1, perPage: 10) {
        media(
          search: $search
          type: ANIME
          isAdult: false
          sort: [POPULARITY_DESC, SCORE_DESC]
        ) {
          id

          title {
            romaji
            english
            native
          }

          synonyms

          type
          format
          status

          description

          startDate {
            year
            month
            day
          }

          endDate {
            year
            month
            day
          }

          season
          seasonYear

          episodes
          duration

          countryOfOrigin
          source

          genres

          averageScore
          meanScore
          popularity
          trending
          favourites

          isLicensed
          isAdult

          nextAiringEpisode {
            episode
            airingAt
            timeUntilAiring
          }

          studios {
            nodes {
              id
              name
              isAnimationStudio
            }
          }

          relations {
            edges {
              relationType

              node {
                id

                title {
                  romaji
                  english
                  native
                }

                format
                status

                startDate {
                  year
                  month
                  day
                }

                endDate {
                  year
                  month
                  day
                }

                season
                seasonYear
                episodes
                duration

                nextAiringEpisode {
                  episode
                  airingAt
                  timeUntilAiring
                }
              }
            }
          }

          coverImage {
            large
            extraLarge
          }

          siteUrl
        }
      }
    }
  `;

  const data = await anilistRequest(
    query,
    { search: String(search) }
  );

  return data?.Page?.media || [];
}


bot.command('airing', async ctx => {
  try {
    const rawText =
      String(ctx.message?.text || '').trim();

    const search =
      rawText
        .replace(/^\/airing(@\w+)?/i, '')
        .trim();

    if (!search) {
      await ctx.reply(
        '❌ نام انیمه را وارد کنید.\n\nمثال:\n/airing Solo Leveling'
      );
      return;
    }

    const results =
      await searchAnimeOnAniList(search);

    if (!Array.isArray(results) || !results.length) {
      await ctx.reply(
        '❌ انیمه موردنظر پیدا نشد.'
      );
      return;
    }

    /*
     * انتخاب بهترین نتیجه
     */
    let anime = results.find(
      x => x?.status === 'RELEASING'
    );

    if (!anime) {
      anime = results.find(
        x => x?.status === 'NOT_YET_RELEASED'
      );
    }

    if (!anime) {
      anime = results[0];
    }

    /*
     * عنوان
     */
    const title =
      anime?.title?.english ||
      anime?.title?.romaji ||
      anime?.title?.native ||
      search;

    const nativeTitle =
      anime?.title?.native ||
      'اعلام نشده';

    const romajiTitle =
      anime?.title?.romaji ||
      'اعلام نشده';

    const englishTitle =
      anime?.title?.english ||
      'اعلام نشده';

    /*
     * وضعیت
     */
    const statusMap = {
      FINISHED: 'پایان یافته',
      RELEASING: 'در حال پخش',
      NOT_YET_RELEASED: 'هنوز منتشر نشده',
      CANCELLED: 'لغو شده',
      HIATUS: 'متوقف شده'
    };

    const status =
      statusMap[anime?.status] ||
      'نامشخص';

    /*
     * فرمت
     */
    const formatMap = {
      TV: 'تلویزیونی',
      TV_SHORT: 'تلویزیونی کوتاه',
      MOVIE: 'فیلم',
      SPECIAL: 'ویژه',
      OVA: 'OVA',
      ONA: 'ONA',
      MUSIC: 'موزیک'
    };

    const format =
      formatMap[anime?.format] ||
      anime?.format ||
      'نامشخص';

    /*
     * فصل
     */
    const seasonMap = {
      WINTER: 'زمستان',
      SPRING: 'بهار',
      SUMMER: 'تابستان',
      FALL: 'پاییز'
    };

    const season =
      anime?.season
        ? `${seasonMap[anime.season] || anime.season} ${anime.seasonYear || ''}`.trim()
        : 'اعلام نشده';

    /*
     * تاریخ شروع
     */
    function formatDate(date) {
      if (!date?.year) {
        return 'اعلام نشده';
      }

      const y = String(date.year);

      const m =
        date.month
          ? String(date.month).padStart(2, '0')
          : '01';

      const d =
        date.day
          ? String(date.day).padStart(2, '0')
          : '01';

      return `${y}/${m}/${d}`;
    }

    const startDate =
      formatDate(anime?.startDate);

    const endDate =
      formatDate(anime?.endDate);

    /*
     * قسمت‌ها
     */
    const totalEpisodes =
      anime?.episodes ||
      'اعلام نشده';

    /*
     * مدت قسمت
     */
    const duration =
      anime?.duration
        ? `${anime.duration} دقیقه`
        : 'اعلام نشده';

    /*
     * کشور
     */
    const countryMap = {
      JP: 'ژاپن',
      CN: 'چین',
      KR: 'کره جنوبی',
      TW: 'تایوان',
      US: 'آمریکا'
    };

    const country =
      countryMap[anime?.countryOfOrigin] ||
      anime?.countryOfOrigin ||
      'اعلام نشده';

    /*
     * منبع
     */
    const sourceMap = {
      ORIGINAL: 'اصلی',
      MANGA: 'مانگا',
      LIGHT_NOVEL: 'لایت ناول',
      VISUAL_NOVEL: 'ویژوال ناول',
      VIDEO_GAME: 'بازی ویدیویی',
      OTHER: 'سایر',
      NOVEL: 'رمان',
      DOUJINSHI: 'دوجینشی',
      ANIME: 'انیمه',
      WEB_MANGA: 'وب مانگا',
      LIVE_ACTION: 'لایو اکشن',
      GAME: 'بازی',
      MULTIMEDIA_PROJECT: 'پروژه چندرسانه‌ای',
      PICTURE_BOOK: 'کتاب تصویری'
    };

    const source =
      sourceMap[anime?.source] ||
      anime?.source ||
      'اعلام نشده';

    /*
     * ژانر
     */
    const genres =
      Array.isArray(anime?.genres) &&
      anime.genres.length
        ? anime.genres.join(' • ')
        : 'اعلام نشده';

    /*
     * استودیو
     */
    const studios =
      Array.isArray(anime?.studios?.nodes)
        ? anime.studios.nodes
            .filter(x => x?.isAnimationStudio !== false)
            .map(x => x?.name)
            .filter(Boolean)
        : [];

    const studioText =
      studios.length
        ? studios.join(' • ')
        : 'اعلام نشده';

    /*
     * امتیاز
     */
    const score =
      typeof anime?.averageScore === 'number'
        ? `${(anime.averageScore / 10).toFixed(2)} / 10`
        : 'اعلام نشده';

    /*
     * محبوبیت
     */
    const popularity =
      typeof anime?.popularity === 'number'
        ? anime.popularity.toLocaleString('en-US')
        : 'اعلام نشده';

    /*
     * علاقه‌مندی
     */
    const favourites =
      typeof anime?.favourites === 'number'
        ? anime.favourites.toLocaleString('en-US')
        : 'اعلام نشده';

    /*
     * Trending
     */
    const trending =
      typeof anime?.trending === 'number'
        ? anime.trending.toLocaleString('en-US')
        : 'اعلام نشده';

    /*
     * لایسنس
     */
    const licensed =
      anime?.isLicensed === true
        ? 'بله'
        : anime?.isLicensed === false
          ? 'خیر'
          : 'نامشخص';

    /*
     * قسمت بعدی
     */
    let nextEpisode =
      'اعلام نشده';

    let releaseTime =
      'اعلام نشده';

    let remaining =
      'اعلام نشده';

    let releaseDay =
      'اعلام نشده';

    let timezone =
      'America/New_York';

    const airing =
      anime?.nextAiringEpisode;

    if (airing?.episode) {
      nextEpisode =
        `قسمت ${airing.episode}`;
    }

    if (airing?.airingAt) {
      const releaseDate =
        new Date(
          Number(airing.airingAt) * 1000
        );

      if (!isNaN(releaseDate.getTime())) {

        releaseTime =
          releaseDate.toLocaleString(
            'en-US',
            {
              timeZone: timezone,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }
          );

        releaseDay =
          releaseDate.toLocaleDateString(
            'fa-IR',
            {
              timeZone: timezone,
              weekday: 'long'
            }
          );
      }
    }

    /*
     * زمان باقی‌مانده
     */
    if (
      typeof airing?.timeUntilAiring === 'number' &&
      airing.timeUntilAiring >= 0
    ) {
      const seconds =
        airing.timeUntilAiring;

      const days =
        Math.floor(seconds / 86400);

      const hours =
        Math.floor(
          (seconds % 86400) / 3600
        );

      const minutes =
        Math.floor(
          (seconds % 3600) / 60
        );

      const secs =
        Math.floor(seconds % 60);

      remaining =
        `${days} روز، ${hours} ساعت، ${minutes} دقیقه و ${secs} ثانیه`;
    }

    /*
     * تعداد فصل‌های مرتبط
     *
     * فقط sequel / prequel های اصلی
     */
    const seasonRelations = [];

    if (
      Array.isArray(anime?.relations?.edges)
    ) {
      for (const edge of anime.relations.edges) {

        if (
          !edge?.node?.id
        ) {
          continue;
        }

        if (
          edge.relationType === 'SEQUEL' ||
          edge.relationType === 'PREQUEL'
        ) {
          seasonRelations.push(
            edge.node
          );
        }
      }
    }

    const seasonCount =
      seasonRelations.length + 1;

    /*
     * توضیحات
     */
    let description =
      anime?.description ||
      'توضیحی ثبت نشده';

    description =
      String(description)
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();

    /*
     * محدود کردن توضیحات
     */
    if (description.length > 700) {
      description =
        description.slice(0, 700) +
        '...';
    }

    /*
     * Escape HTML
     */
    function escapeHtml(text) {
      return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    /*
     * متن نهایی
     */
    const result =
      `<b>⏱ اطلاعات زمان نشر</b>\n` +
      `━━━━━━━━━━━━━━━━━━\n\n` +

      `<b>🎬 نام انیمه:</b>\n` +
      `${escapeHtml(title)}\n\n` +

      `<b>🇯🇵 نام ژاپنی:</b>\n` +
      `${escapeHtml(nativeTitle)}\n\n` +

      `<b>🔤 نام انگلیسی:</b>\n` +
      `${escapeHtml(englishTitle)}\n\n` +

      `<b>🔠 نام رومجی:</b>\n` +
      `${escapeHtml(romajiTitle)}\n\n` +

      `<b>📺 نوع:</b> ${escapeHtml(format)}\n` +

      `<b>📌 وضعیت:</b> ${escapeHtml(status)}\n\n` +

      `<b>🎞 فصل:</b> ${escapeHtml(season)}\n` +

      `<b>📚 تعداد فصل‌های مرتبط:</b> ${seasonCount}\n\n` +

      `<b>🔢 قسمت بعدی:</b> ${escapeHtml(nextEpisode)}\n` +

      `<b>📦 تعداد کل قسمت‌ها:</b> ${totalEpisodes}\n` +

      `<b>⏱ مدت هر قسمت:</b> ${duration}\n\n` +

      `<b>📅 تاریخ شروع:</b> ${startDate}\n` +

      `<b>📅 تاریخ پایان:</b> ${endDate}\n\n` +

      `<b>🌎 زمان پخش به وقت آمریکا:</b>\n` +
      `${escapeHtml(releaseTime)}\n` +

      `<b>📆 روز پخش:</b> ${escapeHtml(releaseDay)}\n` +

      `<b>⏳ زمان باقی‌مانده:</b>\n` +
      `${escapeHtml(remaining)}\n` +

      `<b>⌚ منطقه زمانی:</b> ${timezone}\n\n` +

      `<b>🌐 کشور تولید:</b> ${escapeHtml(country)}\n` +

      `<b>📖 منبع:</b> ${escapeHtml(source)}\n\n` +

      `<b>⭐ امتیاز:</b> ${score}\n` +

      `<b>👥 محبوبیت:</b> ${popularity}\n` +

      `<b>❤️ علاقه‌مندی:</b> ${favourites}\n` +

      `<b>🔥 ترند:</b> ${trending}\n\n` +

      `<b>🎭 ژانر:</b>\n` +
      `${escapeHtml(genres)}\n\n` +

      `<b>🏢 استودیو:</b>\n` +
      `${escapeHtml(studioText)}\n\n` +

      `<b>🔐 لایسنس رسمی:</b> ${licensed}\n\n` +

      `<b>📝 توضیحات:</b>\n` +
      `${escapeHtml(description)}\n\n` +

      `━━━━━━━━━━━━━━━━━━\n` +
      `<i>اطلاعات زمان‌بندی از AniList دریافت می‌شود.</i>`;

    /*
     * دکمه دانلود
     */
    const keyboard =
      typeof airingDownloadKeyboard === 'function'
        ? airingDownloadKeyboard(anime)
        : undefined;

    await ctx.reply(
      result,
      {
        parse_mode: 'HTML',
        reply_markup: keyboard
      }
    );

  } catch (error) {

    console.error(
      'AIRING COMMAND ERROR:',
      error
    );

    try {
      await ctx.reply(
        '❌ هنگام دریافت اطلاعات زمان نشر مشکلی پیش آمد.'
      );
    } catch {}
  }
});


bot.command(
  'seetestch',
  async ctx => {
    if (!fmArchiveIsOwner(ctx)) {
      return;
    }

    try {
      const records =
        await fmArchiveLoad();

      if (!records.length) {
        await ctx.reply(
          '❌ هنوز اطلاعاتی در channelallpost.json ذخیره نشده است.'
        );
        return;
      }

      let text =
        `<b>📚 FaarsiMovie Archive</b>\n\n`;

      for (
        let i = 0;
        i < records.length;
        i++
      ) {
        const item =
          records[i];

        const title =
          item.title ||
          `Post ${item.postId}`;

        text +=
          `${i + 1}. <b>${fmArchiveEscape(title)}</b>\n`;

        if (
          text.length >
          3500
        ) {
          await ctx.reply(
            text,
            {
              parse_mode: 'HTML',
              link_preview_options: {
                is_disabled: true
              }
            }
          );

          text =
            `<b>📚 ادامه لیست</b>\n\n`;
        }
      }

      if (
        text.trim() !==
        '<b>📚 ادامه لیست</b>'
      ) {
        await ctx.reply(
          text,
          {
            parse_mode: 'HTML',
            link_preview_options: {
              is_disabled: true
            }
          }
        );
      }
    } catch (error) {
      console.error(
        'FM ARCHIVE VIEW ERROR:',
        error
      );

      await ctx.reply(
        '❌ خطا در خواندن channelallpost.json'
      );
    }
  }
);






const MAIN_GROUP_ID = -1003900501194;
const ALLOWED_GROUP_ID_2 = -1002239235244;
const ALLOWED_GROUP_ID_3 = -1004489761102;

bot.use(
  async (ctx, next) => {
    const chat = ctx.chat;

    if (!chat) {
      return next();
    }

    const chatId =
      Number(chat.id);

    if (
      chatId === Number(MAIN_GROUP_ID) ||
      chatId === Number(ALLOWED_GROUP_ID_2) ||
      chatId === Number(ALLOWED_GROUP_ID_3)
    ) {
      return next();
    }

    if (
      chat.type !== 'group' &&
      chat.type !== 'supergroup'
    ) {
      return next();
    }

    try {
      await ctx.reply(
        `<b>🎬 Anime Faarsi Bot</b>

<b>این ربات فقط در گروه‌های مجاز Anime Faarsi قابل استفاده است.</b>

<b>برای استفاده از ربات، وارد یکی از گروه‌های رسمی شوید.</b>

<b>🔗 @Anime_FaarsiChat</b>`,
        {
          parse_mode: 'HTML',
          link_preview_options: {
            is_disabled: true
          }
        }
      );
    } catch {}

    if (
      chatId !== Number(MAIN_GROUP_ID) &&
      chatId !== Number(ALLOWED_GROUP_ID_2) &&
      chatId !== Number(ALLOWED_GROUP_ID_3)
    ) {
      try {
        await ctx.telegram.leaveChat(
          chat.id
        );
      } catch {}
    }

    return;
  }
);

const REQUIRED_CHANNELS = [
  '@Anime_Faarsi',
  '@FaarsiMovie',
  '@Dubb_Anime',
  '@AnimeFaarsi',
  '@Anime_FaarsiNews',
  '@Anime_FaarsiChat',
  '@Anime_FaarsiEdits',
  '@Anime_Loveri'
];

const MEMBERSHIP_CHECK_ACTION =
  'check_required_membership';

const MEMBERSHIP_NOTICE_COLLECTION =
  'membershipnotices';

function isMembershipAllowedStatus(status) {
  return [
    'creator',
    'administrator',
    'member'
  ].includes(status);
}

async function checkRequiredChannels(ctx) {
  const userId = Number(ctx.from?.id);

  if (!userId) {
    return false;
  }

  for (const channel of REQUIRED_CHANNELS) {
    try {
      const member =
        await ctx.telegram.getChatMember(
          channel,
          userId
        );

      console.log(
        `MEMBERSHIP CHECK | ${channel} | USER ${userId} | STATUS: ${member.status}`
      );

      if (
        ![
          'creator',
          'administrator',
          'member',
          'restricted'
        ].includes(member.status)
      ) {
        console.log(
          `MEMBERSHIP FAILED | ${channel} | STATUS: ${member.status}`
        );

        return false;
      }

    } catch (error) {
      console.error(
        `MEMBERSHIP CHECK ERROR | ${channel} | USER ${userId}:`,
        error?.response?.description ||
          error?.description ||
          error?.message ||
          error
      );

      return false;
    }
  }

  console.log(
    `MEMBERSHIP CHECK SUCCESS | USER ${userId}`
  );

  return true;
}

async function hasMembershipNotice(userId) {
  try {
    const record =
      await db.findOne(
        MEMBERSHIP_NOTICE_COLLECTION,
        {
          userId: Number(userId)
        }
      );

    return !!record;
  } catch (error) {
    console.error(
      'MEMBERSHIP NOTICE FIND ERROR:',
      error
    );

    return false;
  }
}

async function saveMembershipNotice(userId) {
  try {
    const exists =
      await db.findOne(
        MEMBERSHIP_NOTICE_COLLECTION,
        {
          userId: Number(userId)
        }
      );

    if (exists) {
      return true;
    }

    await db.insertOne(
      MEMBERSHIP_NOTICE_COLLECTION,
      {
        userId: Number(userId),
        createdAt: Date.now()
      }
    );

    return true;
  } catch (error) {
    console.error(
      'MEMBERSHIP NOTICE SAVE ERROR:',
      error
    );

    return false;
  }
}

async function removeMembershipNotice(userId) {
  try {
    await db.deleteOne(
      MEMBERSHIP_NOTICE_COLLECTION,
      {
        userId: Number(userId)
      }
    );

    return true;
  } catch (error) {
    console.error(
      'MEMBERSHIP NOTICE DELETE ERROR:',
      error
    );

    return false;
  }
}

function requiredChannelsKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: '📢 عضویت کانال 1',
          url: 'https://t.me/Anime_Faarsi'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 2',
          url: 'https://t.me/FaarsiMovie'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 3',
          url: 'https://t.me/Dubb_Anime'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 4',
          url: 'https://t.me/Anime_FaarsiNews'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 5',
          url: 'https://t.me/Anime_FaarsiChat'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 6',
          url: 'https://t.me/Anime_FaarsiEdits'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 7',
          url: 'https://t.me/Anime_Loveri'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 8',
          url: 'https://t.me/AnimeFaarsi'
        }
      ],
      [
        {
          text: '📢 عضویت کانال 9',
          url: 'https://t.me/AnimitionFaarsi'
        }
      ],
      [
        {
          text: '🔎 بررسی عضویت',
          callback_data:
            MEMBERSHIP_CHECK_ACTION
        }
      ]
    ]
  };
}

async function sendMembershipRequired(ctx) {
  await ctx.reply(
    `<b>🔔 برای استفاده از ربات و دریافت فایل:</b>

1️⃣ ابتدا در کانال‌های ما عضو شوید.
2️⃣ سپس روی دکمه بررسی عضویت کلیک کنید.

🤖 @Anime_Faarsi`,
    {
      parse_mode: 'HTML',
      reply_markup:
        requiredChannelsKeyboard(),
      link_preview_options: {
        is_disabled: true
      }
    }
  );
}

const MEMBERSHIP_PENDING_COLLECTION =
  'membershippending';

async function savePendingMembershipRequest(ctx) {
  try {
    const userId =
      Number(ctx.from?.id);

    if (!userId) {
      return;
    }

    const text =
      ctx.message?.text ||
      ctx.message?.caption ||
      '';

    if (!text) {
      return;
    }

    const old =
      await db.findOne(
        MEMBERSHIP_PENDING_COLLECTION,
        {
          userId
        }
      );

    if (old) {
      await db.updateOne(
        MEMBERSHIP_PENDING_COLLECTION,
        {
          userId
        },
        {
          $set: {
            text,
            chatId: Number(ctx.chat.id),
            messageId:
              Number(ctx.message.message_id),
            createdAt: Date.now()
          }
        }
      );

      return;
    }

    await db.insertOne(
      MEMBERSHIP_PENDING_COLLECTION,
      {
        userId,
        text,
        chatId: Number(ctx.chat.id),
        messageId:
          Number(ctx.message.message_id),
        createdAt: Date.now()
      }
    );
  } catch (error) {
    console.error(
      'SAVE PENDING REQUEST ERROR:',
      error
    );
  }
}

async function getPendingMembershipRequest(userId) {
  try {
    return await db.findOne(
      MEMBERSHIP_PENDING_COLLECTION,
      {
        userId: Number(userId)
      }
    );
  } catch (error) {
    console.error(
      'GET PENDING REQUEST ERROR:',
      error
    );

    return null;
  }
}

async function removePendingMembershipRequest(userId) {
  try {
    await db.deleteOne(
      MEMBERSHIP_PENDING_COLLECTION,
      {
        userId: Number(userId)
      }
    );
  } catch (error) {
    console.error(
      'REMOVE PENDING REQUEST ERROR:',
      error
    );
  }
}


bot.use(
  async (ctx, next) => {
    if (
      ctx.editedMessage ||
      ctx.editedChannelPost ||
      ctx.channelPost
    ) {
      return next();
    }

    if (
      ctx.callbackQuery?.data ===
      MEMBERSHIP_CHECK_ACTION
    ) {
      return next();
    }

    if (!ctx.from) {
      return next();
    }

    if (
      ctx.message?.new_chat_members ||
      ctx.message?.left_chat_member
    ) {
      return next();
    }

    if (
      ctx.chat?.type === 'channel'
    ) {
      return next();
    }

    const userId =
      Number(ctx.from.id);

    const allowed =
      await checkRequiredChannels(ctx);

    if (allowed) {
      await removeMembershipNotice(
        userId
      );

      return next();
    }

    await savePendingMembershipRequest(ctx);

    const alreadyShown =
      await hasMembershipNotice(userId);

    if (alreadyShown) {
      return;
    }

    await saveMembershipNotice(
      userId
    );

    try {
      await sendMembershipRequired(
        ctx
      );
    } catch (error) {
      console.error(
        'MEMBERSHIP MESSAGE ERROR:',
        error
      );
    }

    return;
  }
);

bot.action(
  MEMBERSHIP_CHECK_ACTION,
  async ctx => {
    const userId =
      Number(ctx.from?.id);

    const allowed =
      await checkRequiredChannels(ctx);

    if (!allowed) {
      try {
        await ctx.answerCbQuery(
          '❌ هنوز در همه کانال‌ها عضو نشده‌اید.',
          {
            show_alert: true
          }
        );
      } catch {}

      return;
    }

    const pending =
      await getPendingMembershipRequest(
        userId
      );

    await removeMembershipNotice(
      userId
    );

    await removePendingMembershipRequest(
      userId
    );

    try {
      await ctx.answerCbQuery(
        '✅ عضویت تأیید شد.'
      );
    } catch {}

    try {
      await ctx.deleteMessage();
    } catch {}

    // اجرای دوباره درخواست قبلی
    if (
      pending &&
      pending.text &&
      pending.chatId
    ) {
      try {
        await bot.telegram.sendMessage(
          pending.chatId,
          pending.text
        );
      } catch (error) {
        console.error(
          'RUN PENDING REQUEST ERROR:',
          error
        );
      }
    }
  }
);



bot.command(
  'sequence',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await startSequence(ctx);
  }
);




bot.command(
  'finish',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    if (await finishUploader(ctx)) {
      return;
    }

    await finishSequence(ctx);
  }
);

bot.command(
  'cancel',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }
    scheduleStates.delete(ctx.chat.id);
    uploaderStates.delete(ctx.chat.id);
    fixPostStates.delete(ctx.chat.id);
    managerStates.delete(ctx.chat.id);
    setStates.delete(ctx.chat.id);
    sequenceStates.delete(ctx.chat.id);
    await ctx.reply(
      '✅ عملیات جاری لغو شد.',
      { reply_markup: mainKeyboard() }
    );
  }
);

bot.command(
  'userid',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const argument =
      ctx.message.text
        .replace(
          /^\/userid(?:@\w+)?\s*/i,
          ''
        )
        .trim();

    await handleUserId(
      ctx,
      argument
    );
  }
);

bot.command(
  'setmovie',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const title =
      ctx.message.text
        .replace(
          /^\/setmovie\s*/i,
          ''
        )
        .trim();

    await startSet(
      ctx,
      'movie',
      title
    );
  }
);

bot.command('status', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    // ==========================================
    // BOT VERSION / UPTIME
    // ==========================================

    const nowPath =
      `${GITHUB_BACKUP_DIR}/now.json`;

    const nowUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${nowPath}?ref=${GITHUB_BRANCH}`;

    const response = await axios.get(
      nowUrl,
      { headers }
    );

    const encoded =
      response.data?.content;

    if (!encoded) {
      return ctx.reply(
        '❌ Version information not found.'
      );
    }

    const nowData =
      JSON.parse(
        Buffer.from(
          encoded.replace(/\s/g, ''),
          'base64'
        ).toString('utf8')
      );

    const version =
      nowData.version
        ? nowData.version.substring(0, 7)
        : 'Unknown';

    const botStatus =
      nowData.status === 'running'
        ? '🟢 Running'
        : '🟡 ' +
          (nowData.status || 'Unknown');

    let uptime = 'Unknown';

    if (nowData.startedAt) {
      const started =
        new Date(
          nowData.startedAt
        ).getTime();

      const seconds =
        Math.max(
          0,
          Math.floor(
            (Date.now() - started) / 1000
          )
        );

      const days =
        Math.floor(
          seconds / 86400
        );

      const hours =
        Math.floor(
          (seconds % 86400) / 3600
        );

      const minutes =
        Math.floor(
          (seconds % 3600) / 60
        );

      const secs =
        seconds % 60;

      uptime =
        (days ? days + 'd ' : '') +
        (hours ? hours + 'h ' : '') +
        (minutes ? minutes + 'm ' : '') +
        (secs + 's');
    }


    // ==========================================
    // HEALTH CHECK
    // ==========================================

    let telegramHealth = '🔴 Offline';
    let githubHealth = '🔴 Offline';
    let databaseHealth = '🟢 OK';
    let backupHealth = '🔴 Not Found';
    let omdbHealth = '⚪ Not Checked';


    // ==========================================
    // TELEGRAM
    // ==========================================

    try {
      await ctx.telegram.getMe();
      telegramHealth = '🟢 OK';
    } catch (error) {
      telegramHealth = '🔴 Failed';
    }


    // ==========================================
    // GITHUB
    // ==========================================

    try {
      await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
        { headers }
      );

      githubHealth = '🟢 OK';
    } catch (error) {
      githubHealth = '🔴 Failed';
    }


    // ==========================================
    // DATABASES
    // ==========================================

    try {
      for (
        const fileName of FULL_BACKUP_LOCAL_FILES
      ) {
        await githubGetFile(fileName);
      }

      databaseHealth = '🟢 OK';

    } catch (error) {
      databaseHealth = '🔴 Failed';
    }


    // ==========================================
    // BACKUP
    // ==========================================

    try {
      await githubGetFile(
        FULL_BACKUP_FILE
      );

      backupHealth = '🟢 Ready';

    } catch (error) {
      backupHealth = '🔴 Not Found';
    }


    // ==========================================
    // OMDB
    // ==========================================

    if (
      typeof OMDB_API_KEY === 'string' &&
      OMDB_API_KEY
    ) {
      try {
        const omdbResponse =
          await axios.get(
            'https://www.omdbapi.com/',
            {
              params: {
                apikey: OMDB_API_KEY,
                t: 'Inception'
              }
            }
          );

        if (
          omdbResponse.data &&
          omdbResponse.data.Response === 'True'
        ) {
          omdbHealth = '🟢 OK';
        } else {
          omdbHealth = '🟡 Failed';
        }

      } catch (error) {
        omdbHealth = '🔴 Failed';
      }
    }


    // ==========================================
    // FINAL STATUS
    // ==========================================

    await ctx.reply(
      '📊 Bot Status\n\n' +

      '🤖 Status: ' +
      botStatus + '\n' +

      '🔖 Version: ' +
      version + '\n' +

      '📦 Source: ' +
      (nowData.source || 'github') + '\n' +

      '🌿 Branch: ' +
      (nowData.branch || GITHUB_BRANCH) + '\n' +

      '⏱️ Uptime: ' +
      uptime + '\n' +

      '🕐 Started: ' +
      (nowData.startedAt || 'Unknown') + '\n' +

      '🔄 Updated: ' +
      (nowData.updatedAt || 'Unknown') +

      '\n\n' +

      '🏥 Health Check\n\n' +

      '📡 Telegram: ' +
      telegramHealth + '\n' +

      '🐙 GitHub: ' +
      githubHealth + '\n' +

      '🗄️ Database: ' +
      databaseHealth + '\n' +

      '💾 Backup: ' +
      backupHealth + '\n' +

      '🎬 OMDb: ' +
      omdbHealth
    );

  } catch (error) {
    console.error(
      'status:',
      error
    );

    await ctx.reply(
      '❌ Failed to get bot status.\n\n' +
      (error.message ||
        'Please try again.')
    );
  }
});

// ==========================================
// /statushd
// DETAILED HEALTH DIAGNOSTICS
// ==========================================

bot.command('statuserror', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    const diagnostics = [];

    // ==========================================
    // TELEGRAM
    // ==========================================

    try {
      const telegram =
        await ctx.telegram.getMe();

      diagnostics.push(
        '📡 Telegram: 🟢 OK\n' +
        '   Username: @' +
        (telegram.username || 'Unknown') +
        '\n' +
        '   ID: ' +
        (telegram.id || 'Unknown')
      );

    } catch (error) {
      diagnostics.push(
        '📡 Telegram: 🔴 FAILED\n' +
        '   Error: ' +
        (error.message || 'Unknown error') +
        '\n' +
        '   Code: ' +
        (error.response?.status || 'N/A')
      );
    }


    // ==========================================
    // GITHUB
    // ==========================================

    try {
      const github =
        await axios.get(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
          { headers }
        );

      diagnostics.push(
        '🐙 GitHub: 🟢 OK\n' +
        '   Repository: ' +
        GITHUB_OWNER +
        '/' +
        GITHUB_REPO +
        '\n' +
        '   Branch: ' +
        GITHUB_BRANCH +
        '\n' +
        '   Status: ' +
        (github.status || 200)
      );

    } catch (error) {
      diagnostics.push(
        '🐙 GitHub: 🔴 FAILED\n' +
        '   Error: ' +
        (error.message || 'Unknown error') +
        '\n' +
        '   HTTP: ' +
        (error.response?.status || 'N/A') +
        '\n' +
        '   Details: ' +
        JSON.stringify(
          error.response?.data || {}
        )
      );
    }


    // ==========================================
    // DATABASE FILES
    // ==========================================

    for (
      const fileName of FULL_BACKUP_LOCAL_FILES
    ) {
      try {
        const file =
          await githubGetFile(fileName);

        diagnostics.push(
          '🗄️ ' +
          fileName +
          ': 🟢 OK\n' +
          '   SHA: ' +
          (file.sha || 'Unknown')
        );

      } catch (error) {
        diagnostics.push(
          '🗄️ ' +
          fileName +
          ': 🔴 FAILED\n' +
          '   Error: ' +
          (error.message || 'Unknown error') +
          '\n' +
          '   HTTP: ' +
          (error.response?.status || 'N/A') +
          '\n' +
          '   Details: ' +
          JSON.stringify(
            error.response?.data || {}
          )
        );
      }
    }


    // ==========================================
    // FULL BACKUP
    // ==========================================

    try {
      const backup =
        await githubGetFile(
          FULL_BACKUP_FILE
        );

      diagnostics.push(
        '💾 Full Backup: 🟢 OK\n' +
        '   File: ' +
        FULL_BACKUP_FILE +
        '\n' +
        '   SHA: ' +
        (backup.sha || 'Unknown')
      );

    } catch (error) {
      diagnostics.push(
        '💾 Full Backup: 🔴 FAILED\n' +
        '   Error: ' +
        (error.message || 'Unknown error') +
        '\n' +
        '   HTTP: ' +
        (error.response?.status || 'N/A') +
        '\n' +
        '   Details: ' +
        JSON.stringify(
          error.response?.data || {}
        )
      );
    }


    // ==========================================
    // NOW.JSON
    // ==========================================

    try {
      const nowFile =
        await githubGetFile(
          `${GITHUB_BACKUP_DIR}/now.json`
        );

      const nowData =
        JSON.parse(
          Buffer.from(
            nowFile.content.replace(/\s/g, ''),
            'base64'
          ).toString('utf8')
        );

      diagnostics.push(
        '📋 now.json: 🟢 OK\n' +
        '   Version: ' +
        (nowData.version || 'Unknown') +
        '\n' +
        '   Status: ' +
        (nowData.status || 'Unknown') +
        '\n' +
        '   Updated: ' +
        (nowData.updatedAt || 'Unknown')
      );

    } catch (error) {
      diagnostics.push(
        '📋 now.json: 🔴 FAILED\n' +
        '   Error: ' +
        (error.message || 'Unknown error') +
        '\n' +
        '   HTTP: ' +
        (error.response?.status || 'N/A') +
        '\n' +
        '   Details: ' +
        JSON.stringify(
          error.response?.data || {}
        )
      );
    }


    // ==========================================
    // OMDB
    // ==========================================

    try {
      if (
        typeof OMDB_API_KEY !== 'string' ||
        !OMDB_API_KEY
      ) {
        throw new Error(
          'OMDB_API_KEY is empty or not configured.'
        );
      }

      const omdb =
        await axios.get(
          'https://www.omdbapi.com/',
          {
            params: {
              apikey: OMDB_API_KEY,
              t: 'Inception'
            }
          }
        );

      diagnostics.push(
        '🎬 OMDb: 🟢 OK\n' +
        '   HTTP: ' +
        (omdb.status || 200) +
        '\n' +
        '   Response: ' +
        (omdb.data?.Response || 'Unknown')
      );

    } catch (error) {
      diagnostics.push(
        '🎬 OMDb: 🔴 FAILED\n' +
        '   Error: ' +
        (error.message || 'Unknown error') +
        '\n' +
        '   HTTP: ' +
        (error.response?.status || 'N/A') +
        '\n' +
        '   Details: ' +
        JSON.stringify(
          error.response?.data || {}
        )
      );
    }


    // ==========================================
    // ENVIRONMENT / CONFIG
    // ==========================================

    diagnostics.push(
      '⚙️ Configuration\n' +
      '   GitHub Owner: ' +
      (GITHUB_OWNER || 'MISSING') +
      '\n' +
      '   GitHub Repo: ' +
      (GITHUB_REPO || 'MISSING') +
      '\n' +
      '   GitHub Branch: ' +
      (GITHUB_BRANCH || 'MISSING') +
      '\n' +
      '   Bot File: ' +
      (GITHUB_FILE_PATH || 'MISSING') +
      '\n' +
      '   Backup Directory: ' +
      (GITHUB_BACKUP_DIR || 'MISSING') +
      '\n' +
      '   GitHub Token: ' +
      (GITHUB_TOKEN ? '🟢 Configured' : '🔴 Missing') +
      '\n' +
      '   OMDb Key: ' +
      (OMDB_API_KEY ? '🟢 Configured' : '🔴 Missing')
    );


    // ==========================================
    // FINAL MESSAGE
    // ==========================================

    const text =
      '🔎 Detailed Bot Diagnostics\n\n' +
      diagnostics.join('\n\n') +
      '\n\n' +
      '🕐 Checked: ' +
      new Date().toISOString();

    // Telegram has a message size limit.
    // Split automatically if needed.

    const chunks = [];

    for (
      let i = 0;
      i < text.length;
      i += 3800
    ) {
      chunks.push(
        text.substring(
          i,
          i + 3800
        )
      );
    }

    for (const chunk of chunks) {
      await ctx.reply(chunk);
    }

  } catch (error) {
    console.error(
      'statushd:',
      error
    );

    await ctx.reply(
      '❌ Status diagnostics failed.\n\n' +
      'Error: ' +
      (error.message || 'Unknown error') +
      '\nHTTP: ' +
      (error.response?.status || 'N/A') +
      '\nDetails: ' +
      JSON.stringify(
        error.response?.data || {}
      )
    );
  }
});

bot.command('ping', async (ctx) => {
  try {
    if (Number(ctx.from.id) !== UPDATE_ADMIN_ID) {
      return;
    }
    const start = Date.now();

    const message = await ctx.reply('🏓 Pinging...');

    const ping = Date.now() - start;

    await ctx.telegram.editMessageText(
      ctx.chat.id,
      message.message_id,
      undefined,
      '🏓 Pong!\n\n' +
      '⚡ Response: ' + ping + ' ms'
    );

  } catch (error) {
    console.error('ping:', error);
  }
});

bot.command(
  'setseries',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const title =
      ctx.message.text
        .replace(
          /^\/setseries\s*/i,
          ''
        )
        .trim();

    await startSet(
      ctx,
      'series',
      title
    );
  }
);

bot.command(
  'setanime',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const title =
      ctx.message.text
        .replace(
          /^\/setanime\s*/i,
          ''
        )
        .trim();

    await startSet(
      ctx,
      'anime',
      title
    );
  }
);

bot.command(
  'setanimation',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const title =
      ctx.message.text
        .replace(
          /^\/setanimation\s*/i,
          ''
        )
        .trim();

    await startSet(
      ctx,
      'animation',
      title
    );
  }
);

bot.command(
  'setanimition',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const title =
      ctx.message.text
        .replace(
          /^\/setanimition\s*/i,
          ''
        )
        .trim();

    await startSet(
      ctx,
      'animation',
      title
    );
  }
);

bot.command(
  'set',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const title =
      ctx.message.text
        .replace(
          /^\/set\s*/i,
          ''
        )
        .trim();

    await startSet(
      ctx,
      '',
      title,
      true
    );
  }
);

bot.hears(
  /^userid(?:\s+(.+))?$/i,
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await handleUserId(
      ctx,
      ctx.match?.[1] || ''
    );
  }
);

bot.hears(
  'Tools',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    try {
      await ctx.deleteMessage();
    } catch (err) {
      console.error('Tools delete error:', err);
    }

    await ctx.reply(
      '<b>Tools</b>',
      {
        parse_mode: 'HTML',
        reply_markup: toolsKeyboard()
      }
    );
  }
);

bot.hears(
  '👤 User',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>👤 User</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          userKeyboard()
      }
    );
  }
);

bot.hears(
  '👤 UserInfo',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      `<b>👤 UserInfo</b>

برای دیدن ID خودتان:
<code>/userid</code>

برای دیدن اطلاعات یک کاربر:
پیام کاربر را Reply کنید و <code>/userid</code> بزنید.

برای گروه یا کانال:
<code>/userid @username</code>`,
      {
        parse_mode: 'HTML',
        reply_markup:
          userKeyboard()
      }
    );
  }
);

bot.hears(
  '👥 Group',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>👥 Group</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          groupKeyboard()
      }
    );
  }
);

bot.hears(
  '👋 Welcome',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    const data =
      await getWelcomeData();

    await ctx.reply(
      `<b>👋 Welcome</b>

وضعیت: ${data.settings.enabled ? '🟢 فعال' : '🔴 غیرفعال'}

متن Welcome و قوانین قابل ویرایش هستند.`,
      {
        parse_mode: 'HTML',
        reply_markup:
          welcomeKeyboard(
            data.settings.enabled
          )
      }
    );
  }
);

bot.hears(
  '🟢 فعال کردن',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await toggleWelcome(
      ctx,
      true
    );
  }
);

bot.hears(
  '🔴 غیرفعال کردن',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await toggleWelcome(
      ctx,
      false
    );
  }
);

bot.hears(
  '✏️ ویرایش Welcome',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    welcomeEditStates.set(
      ctx.chat.id,
      {
        type: 'welcome'
      }
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      `<b>متن جدید Welcome را ارسال کنید.</b>

متغیرهای قابل استفاده:
<code>{user}</code>
<code>{chat}</code>`,
      {
        parse_mode: 'HTML',
        reply_markup:
          welcomeKeyboard(
            true
          )
      }
    );
  }
);

bot.hears(
  '📜 ویرایش قوانین',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    welcomeEditStates.set(
      ctx.chat.id,
      {
        type: 'rules'
      }
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>متن کامل قوانین جدید را ارسال کنید.</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          welcomeKeyboard(
            true
          )
      }
    );
  }
);

bot.hears(
  '👁 پیش‌نمایش',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await previewWelcome(ctx);
  }
);

bot.hears(
  '🗑 حذف تنظیمات',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await resetWelcome(ctx);
  }
);

bot.hears(
  '✖️ بازگشت به Group',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    welcomeEditStates.delete(
      ctx.chat.id
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>👥 Group</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          groupKeyboard()
      }
    );
  }
);

bot.hears(
  'Search Tools',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>Search Tools</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          searchToolsKeyboard()
      }
    );
  }
);

bot.hears(
  'Find',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startChannelSearch(ctx);
  }
);

bot.hears(
  'Add X to Archive',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startChannelAdd(ctx);
  }
);





bot.hears(
  '✖️ بازگشت به Tools',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    channelSearchStates.delete(
      ctx.chat.id
    );

    channelAddStates.delete(
      ctx.chat.id
    );

    channelEditStates.delete(
      ctx.chat.id
    );

    welcomeEditStates.delete(
      ctx.chat.id
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>Tools</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          toolsKeyboard()
      }
    );
  }
);

bot.action(
  'channel_edit',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await handleChannelEditStart(
      ctx
    );
  }
);

bot.action(
  'captcha_accept',
  async ctx => {
    const userId =
      Number(ctx.from?.id);

    const result =
      await findPendingCaptcha(
        userId
      );

    if (!result.item) {
      try {
        await ctx.answerCbQuery(
          'درخواست پیدا نشد.'
        );
      } catch {}

      return;
    }

    const success =
      await unmuteUser(
        ctx,
        result.item.chatId,
        userId
      );

    if (!success) {
      try {
        await ctx.answerCbQuery(
          'باز کردن دسترسی انجام نشد.'
        );
      } catch {}

      try {
        await ctx.reply(
          '<b>❌ باز کردن دسترسی انجام نشد. لطفاً دوباره تلاش کنید.</b>',
          {
            parse_mode: 'HTML'
          }
        );
      } catch {}

      return;
    }

    /*
     * حذف پیام خوش‌آمدگویی گروه
     * همان پیامی که بعد از ورود کاربر ارسال شده
     */
    if (
      result.item.chatId &&
      result.item.welcomeMessageId
    ) {
      try {
        await ctx.telegram.deleteMessage(
          Number(result.item.chatId),
          Number(result.item.welcomeMessageId)
        );
      } catch (error) {
        console.error(
          'WELCOME MESSAGE DELETE ERROR:',
          error
        );
      }
    }

    const newPending =
      result.data.pending.filter(
        item =>
          Number(item.userId) !==
          userId
      );

    await saveWelcomeData(
      result.data.settings,
      newPending
    );

    try {
      await ctx.answerCbQuery(
        'قوانین تأیید شد.'
      );
    } catch {}

    try {
      await ctx.editMessageReplyMarkup({
        inline_keyboard: []
      });
    } catch {}

    try {
      await ctx.reply(
        '<b>قوانین گروپ تأیید شد و دسترسی شما باز شد.</b>',
        {
          parse_mode: 'HTML'
        }
      );
    } catch {}
  }
);

bot.hears(
  'Post Tools',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>Post Tools</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          postToolsKeyboard()
      }
    );
  }
);

bot.hears(
  'File Tools',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await ctx.reply(
      '<b>File Tools</b>',
      {
        parse_mode: 'HTML',
        reply_markup:
          fileToolsKeyboard()
      }
    );
  }
);

bot.hears(
  '📁 Sequence',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startSequence(ctx);
  }
);

bot.hears(
  'Movie',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startSet(
      ctx,
      'movie'
    );
  }
);

bot.hears(
  'Series',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startSet(
      ctx,
      'series'
    );
  }
);

bot.hears(
  'Anime',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startSet(
      ctx,
      'anime'
    );
  }
);

bot.hears(
  'Animation',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await startSet(
      ctx,
      'animation'
    );
  }
);

bot.hears(
  '🔙 Back To Menu',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    setStates.delete(
      ctx.chat.id
    );

    sequenceStates.delete(
      ctx.chat.id
    );

    channelSearchStates.delete(
      ctx.chat.id
    );

    channelAddStates.delete(
      ctx.chat.id
    );

    channelEditStates.delete(
      ctx.chat.id
    );

    welcomeEditStates.delete(
      ctx.chat.id
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await mainMenu(ctx);
  }
);


bot.hears(
  '✅ Done',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    if (
      sequenceStates.has(
        ctx.chat.id
      )
    ) {
      await finishSequence(ctx);
      return;
    }

    if (
      await finishChannelAdd(ctx)
    ) {
      return;
    }

    if (
      await finishUploader(ctx)
    ) {
      return;
    }
  }
);



bot.hears(
  'Cancel',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const state =
      setStates.get(
        ctx.chat.id
      );

    if (state) {
      for (
        const messageId of
        state.messages
      ) {
        await safeDelete(
          ctx,
          messageId
        );
      }
    }

    setStates.delete(
      ctx.chat.id
    );

    channelSearchStates.delete(
      ctx.chat.id
    );

    channelAddStates.delete(
      ctx.chat.id
    );

    channelEditStates.delete(
      ctx.chat.id
    );

    welcomeEditStates.delete(
      ctx.chat.id
    );
    scheduleStates.delete(
      ctx.chat.id
    );
    uploaderStates.delete(
      ctx.chat.id
    );
    fixPostStates.delete(
      ctx.chat.id
    );
    managerStates.delete(
      ctx.chat.id
    );
    sequenceStates.delete(
      ctx.chat.id
    );

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    await mainMenu(ctx);
  }
);

bot.hears(
  'Skip',
  async ctx => {
    if (!isAdmin(ctx)) {
      return;
    }

    const state =
      setStates.get(
        ctx.chat.id
      );

    if (!state) {
      return;
    }

    for (
      const messageId of
      state.messages
    ) {
      await safeDelete(
        ctx,
        messageId
      );
    }

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    state.messages = [];

    await handleSetLink(
      ctx,
      DEFAULT_DOWNLOAD_URL
    );
  }
);

bot.on(
  'text',
  async (ctx, next) => {
    const text =
      ctx.message.text?.trim();

    if (!text) {
      return next();
    }

    if (isAdmin(ctx, 'postTools')) {
      const fixState =
        fixPostStates.get(ctx.chat.id);
      if (
        fixState &&
        Number(fixState.ownerId) === Number(ctx.from.id)
      ) {
        fixPostStates.delete(ctx.chat.id);
        await handleFixPost(ctx, text);
        return;
      }

      if (
        await handleScheduleText(ctx, text)
      ) {
        return;
      }
    }

    if (isAdmin(ctx, 'fileTools')) {
      const uploaderState =
        uploaderStates.get(ctx.chat.id);
      if (
        uploaderState?.step === 'destination' &&
        Number(uploaderState.ownerId) === Number(ctx.from.id)
      ) {
        await sendUploaderToChannel(
          ctx,
          text
        );
        return;
      }
    }

    const managerState =
      managerStates.get(ctx.chat.id);
    if (
      managerState &&
      ['group', 'supergroup'].includes(ctx.chat?.type)
    ) {
      if (
        managerState.action === 'warning-limit'
      ) {
        managerStates.delete(ctx.chat.id);
        const value = Number(text);
        if (
          !Number.isInteger(value) ||
          value < 1 ||
          value > 20
        ) {
          await ctx.reply(
            'عدد باید بین ۱ تا ۲۰ باشد.'
          );
          return;
        }
        const saved =
          await saveGroupSettingsV1(
            ctx.chat.id,
            { warningLimit: value }
          );
        await ctx.reply(
          saved
            ? `✅ حد Warning روی ${value} تنظیم شد.`
            : 'ذخیره تنظیمات انجام نشد.'
        );
        return;
      }

      if (
        managerState.action === 'nofilter-remove'
      ) {
        managerStates.delete(ctx.chat.id);
        const current =
          await getAllowedLinksV1(ctx.chat.id);
        const removeValues =
          text.split(/[\s,]+/)
            .map(normalizeAllowedLink);
        const saved =
          await updateAllowedLinksV1(
            ctx.chat.id,
            current.filter(
              item =>
                !removeValues.includes(
                  normalizeAllowedLink(item)
                )
            )
          );
        await ctx.reply(
          saved
            ? '✅ موارد انتخاب‌شده حذف شدند.'
            : 'ذخیره تغییر انجام نشد.'
        );
        return;
      }

      managerStates.delete(ctx.chat.id);
      await handleModerationActionV1(
        ctx,
        managerState.action,
        text
      );
      return;
    }

    if (isAdmin(ctx)) {
      const welcomeState =
        welcomeEditStates.get(
          ctx.chat.id
        );

      if (
        welcomeState &&
        text !==
          '🔙 Back To Menu' &&
        text !==
          'Cancel'
      ) {
        const data =
          await getWelcomeData();

        if (
          welcomeState.type ===
          'welcome'
        ) {
          data.settings.welcomeText =
            text;
        }

        if (
          welcomeState.type ===
          'rules'
        ) {
          data.settings.rulesText =
            text;
        }

        const saved =
          await saveWelcomeData(
            data.settings,
            data.pending
          );

        welcomeEditStates.delete(
          ctx.chat.id
        );

        await safeDelete(
          ctx,
          ctx.message.message_id
        );

        await ctx.reply(
          saved
            ? '<b>✅ متن با موفقیت ذخیره شد.</b>'
            : '<b>❌ ذخیره انجام نشد.</b>',
          {
            parse_mode: 'HTML',
            reply_markup:
              welcomeKeyboard(
                data.settings.enabled
              )
          }
        );

        return;
      }

      if (
        text === 'Tools' ||
        text === 'Post Tools' ||
        text === 'File Tools' ||
        text === 'Search Tools' ||
        text === 'Find' ||
        text === 'Add X to Archive' ||
        text === '✖️ بازگشت به Tools' ||
        text === '📁 Sequence' ||
        text === 'Movie' ||
        text === 'Series' ||
        text === 'Anime' ||
        text === 'Animation' ||
        text === '🔧 Fix Post' ||
        text === '⏰ Scheduled Post' ||
        text === '📋 Scheduled List' ||
        text === '⬆️ Uploader' ||
        text === '🛡 Group Manager' ||
        text === '⚠️ Warning' ||
        text === '🔗 Link Filter' ||
        text === '🟢 NoFilter' ||
        text === '📋 Group Lists' ||
        text === '🔢 تعداد مجاز' ||
        text === '📋 لیست Warningها' ||
        text === '🧹 پاک کردن همه Warningها' ||
        text === '🟢 فعال‌سازی Filter' ||
        text === '🔴 غیرفعال‌سازی Filter' ||
        text === '📊 وضعیت Filter' ||
        text === '📋 لیست NoFilter' ||
        text === '🗑 حذف همه NoFilter' ||
        text === '➖ حذف لینک مجاز' ||
        text === '🔇 Mute' ||
        text === '🔊 Unmute' ||
        text === '🚫 Ban' ||
        text === '♻️ Unban' ||
        text === '👢 Kick' ||
        text === '🧹 Purge' ||
        text === '📌 Pin' ||
        text === '📍 Unpin' ||
        text === '🔒 Lock' ||
        text === '🔓 Unlock' ||
        text === '⏱ تنظیمات پاک‌سازی' ||
        text === '🔙 Back To Menu' ||
        text === '✅ Done' ||
        text === 'Cancel' ||
        text === 'Skip' ||
        text === '👤 User' ||
        text === '👤 UserInfo' ||
        text === '👥 Group' ||
        text === '👋 Welcome' ||
        text === '✏️ ویرایش Welcome' ||
        text === '📜 ویرایش قوانین' ||
        text === '👁 پیش‌نمایش' ||
        text === '🟢 فعال کردن' ||
        text === '🔴 غیرفعال کردن' ||
        text === '🗑 حذف تنظیمات' ||
        text === '✖️ بازگشت به Group'
      ) {
        return next();
      }

      const searchState =
        channelSearchStates.get(
          ctx.chat.id
        );

      if (searchState) {
        await handleChannelSearchAdmin(
          ctx,
          text
        );

        return;
      }

      const addState =
        channelAddStates.get(
          ctx.chat.id
        );

      if (addState) {
        if (
          addState.step ===
          'name'
        ) {
          await handleChannelAddName(
            ctx,
            text
          );

          return;
        }

        if (
          addState.step ===
          'link'
        ) {
          await handleChannelAddLink(
            ctx,
            text
          );

          return;
        }
      }

      const editState =
        channelEditStates.get(
          ctx.chat.id
        );

      if (editState) {
        if (
          editState.step ===
          'name'
        ) {
          await handleChannelEditName(
            ctx,
            text
          );

          return;
        }

        if (
          editState.step ===
          'link'
        ) {
          await handleChannelEditLink(
            ctx,
            text
          );

          return;
        }
      }

      const state =
        setStates.get(
          ctx.chat.id
        );

      if (state) {
        if (!state.title) {
          await setTitleReceived(
            ctx,
            text
          );

          return;
        }

        if (
          /^https?:\/\//i.test(text)
        ) {
          await handleSetLink(
            ctx,
            text
          );

          return;
        }

        await safeDelete(
          ctx,
          ctx.message.message_id
        );

        await ctx.reply(
          '<b>⚠️ لطفاً لینک دانلود معتبر ارسال کنید یا «Skip» را بزنید.</b>',
          {
            parse_mode: 'HTML',
            reply_markup:
              setKeyboard()
          }
        );

        return;
      }
    }

    const normalized =
      normalizeChannelName(
        text
      );

    if (
      /^انیمه\s+/i.test(
        text
      ) ||
      /^anime\s+/i.test(
        text
      )
    ) {
      const found =
        await searchChannelPostForUser(
          ctx,
          normalized
        );

      if (found) {
        return;
      }
    }

    return next();
  }
);

bot.on(
  'message',
  async (ctx, next) => {
    if (
      ctx.message
        ?.new_chat_members
    ) {
      await handleNewMembers(
        ctx
      );
    }

    if (await handleLinkFilterMessageV1(ctx)) {
      return;
    }

    if (
      isAdmin(ctx, 'postTools') &&
      await handleScheduleMedia(ctx)
    ) {
      return;
    }

    if (
      isAdmin(ctx, 'fileTools') &&
      await collectUploaderMessage(ctx)
    ) {
      return;
    }

    if (!isAdmin(ctx)) {
      return next();
    }

    const channelAddState =
  channelAddStates.get(
    ctx.chat.id
  );

if (
  channelAddState &&
  ctx.message?.text
) {
  const items =
    extractAnimeLinksFromMessage(
      ctx.message
    );

  if (!items.length) {
    await ctx.reply(
      '❌ هیچ انیمه لینک‌داری پیدا نشد.\n\n' +
      'لطفاً پیام را به صورت لینک‌دار ارسال کنید.'
    );

    return;
  }

  channelAddState.items.push(
    ...items
  );

  channelAddStates.set(
    ctx.chat.id,
    channelAddState
  );

  await ctx.reply(
    `✅ ${items.length} مورد دریافت شد.\n` +
    `📦 مجموع موارد فعلی: ${channelAddState.items.length}\n\n` +
    'می‌توانید پیام دیگری بفرستید یا روی Done بزنید.'
  );

  return;
}
    
    const state =
      sequenceStates.get(
        ctx.chat.id
      );

    if (!state) {
      return next();
    }

    const file =
      getSequenceFile(
        ctx.message
      );

    if (!file) {
      return next();
    }

    state.files.push(file);

    state.totalSize +=
      file.size;

    await safeDelete(
      ctx,
      ctx.message.message_id
    );

    try {
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        state.statusMessageId,
        undefined,
        sequenceStatus(
          state,
          file
        ),
        {
          parse_mode: 'HTML',
          reply_markup:
            sequenceKeyboard()
        }
      );
    } catch {}
  }
);

const MANAGE_ADMIN_PERMISSION_V2 = 'manageAdmins';
const MANAGE_ADMIN_SETTINGS_FILE_V2 = 'admin-settings.json';
const MANAGE_ADMIN_ACTIVITY_FILE_V2 = 'admin-activity.json';
const MANAGE_ADMIN_MAX_ACTIVITY_V2 = 100;


const manageAdminStatesV2 = new Map();

const MANAGE_ADMIN_PERMISSION_LABELS_V2 = {
  group: 'Group',
  welcome: 'Welcome',
  warnings: 'Warnings',
  filter: 'Link Filter',
  nofilter: 'NoFilter',
  userInfo: 'User Info',
  searchTools: 'Search Tools',
  postNews: 'Post News',
  postTools: 'Post Tools',
  fileTools: 'File Tools',
  set: 'Set',
  sequence: 'Sequence',
  manageAdmins: 'Manage Admins'
};

function manageAdminBackKeyboardV2() {
  return {
    keyboard: [['🔙 Back To Menu']],
    resize_keyboard: true
  };
}

function manageAdminPermissionKeysV2() {
  const existing =
    typeof adminPermissionList === 'function'
      ? adminPermissionList()
      : Object.keys(MANAGE_ADMIN_PERMISSION_LABELS_V2);

  return Array.from(
    new Set(
      existing.filter(
        permission =>
          typeof permission === 'string' &&
          permission.trim()
      )
    )
  );
}

function manageAdminPermissionLabelV2(permission) {
  return (
    MANAGE_ADMIN_PERMISSION_LABELS_V2[permission] ||
    permission
  );
}

function manageAdminIsOwnerV2(userId) {
  return Number(userId) === Number(ADMIN_ID);
}

function manageAdminIsActiveV2(record) {
  return (
    Boolean(record) &&
    record.enabled !== false &&
    record.active !== false
  );
}

function manageAdminPermissionValuesV2(record) {
  return Array.isArray(record?.permissions)
    ? record.permissions.filter(Boolean)
    : [];
}

function manageAdminHasPermissionV2(record, permission) {
  const permissions =
    manageAdminPermissionValuesV2(record);

  return (
    permissions.includes('*') ||
    permissions.includes('full') ||
    permissions.includes(permission)
  );
}

function manageAdminNormalizeUserIdV2(value) {
  const userId = Number(String(value || '').trim());

  return Number.isSafeInteger(userId) && userId > 0
    ? userId
    : null;
}

function manageAdminEscape(value) {
  if (typeof escapeHtml === 'function') {
    return escapeHtml(value);
  }

  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function manageAdminDisplayNameV2(record) {
  if (manageAdminIsOwnerV2(record?.userId)) {
    return 'Owner';
  }

  const name =
    String(record?.name || '').trim();
  const username =
    String(record?.username || '').trim();

  if (name) {
    return name;
  }

  if (username) {
    return username.startsWith('@')
      ? username
      : `@${username}`;
  }

  return `User ${record?.userId || 'unknown'}`;
}

function manageAdminOwnerRecordV2() {
  return {
    kind: `admin:${ADMIN_ID}`,
    userId: Number(ADMIN_ID),
    username: '',
    name: 'Owner',
    role: 'owner',
    enabled: true,
    active: true,
    permissions: ['*'],
    createdAt: null,
    updatedAt: null,
    owner: true
  };
}

function manageAdminSafeRecordV2(record) {
  const userId =
    manageAdminNormalizeUserIdV2(record?.userId);

  if (!userId) {
    return null;
  }

  if (manageAdminIsOwnerV2(userId)) {
    return manageAdminOwnerRecordV2();
  }

  return {
    ...record,
    kind: record.kind || `admin:${userId}`,
    userId,
    username: String(record.username || ''),
    name: String(record.name || ''),
    role: record.role || 'admin',
    enabled: record.enabled !== false,
    active: record.active !== false &&
      record.enabled !== false,
    permissions: manageAdminPermissionValuesV2(record),
    createdAt:
      record.createdAt ||
      record.addedAt ||
      record.updatedAt ||
      null,
    updatedAt: record.updatedAt || null
  };
}

async function manageAdminRecordsV2() {
  try {
    const records =
      await readJsonStoreV1(
        GITHUB_ADMIN_FILE
      );

    return records
      .map(manageAdminSafeRecordV2)
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function manageAdminFindV2(userId) {
  const normalized =
    manageAdminNormalizeUserIdV2(userId);

  if (!normalized) {
    return null;
  }

  if (manageAdminIsOwnerV2(normalized)) {
    return manageAdminOwnerRecordV2();
  }

  const records =
    await manageAdminRecordsV2();

  return (
    records.find(
      record =>
        Number(record.userId) === normalized
    ) || null
  );
}

function manageAdminAllDisplayRecordsV2(records) {
  return [
    manageAdminOwnerRecordV2(),
    ...records.filter(
      record =>
        !manageAdminIsOwnerV2(record.userId)
    )
  ];
}

async function manageAdminAccessV2(
  ctx,
  permission = MANAGE_ADMIN_PERMISSION_V2
) {
  const actorId =
    manageAdminNormalizeUserIdV2(
      ctx.from?.id
    );

  if (!actorId) {
    return false;
  }

  
  if (manageAdminIsOwnerV2(actorId)) {
    return true;
  }

  const record =
    await manageAdminFindV2(actorId);

  return (
    manageAdminIsActiveV2(record) &&
    manageAdminHasPermissionV2(
      record,
      permission
    )
  );
}

async function requireManageAdminV2(ctx) {
  const allowed =
    await manageAdminAccessV2(ctx);

  if (allowed) {
    return true;
  }

  const message =
    'دسترسی مدیریت ادمین برای این حساب فعال نیست.';

  try {
    if (ctx.callbackQuery) {
      await ctx.answerCbQuery(
        message,
        { show_alert: true }
      );
    } else {
      await ctx.reply(message);
    }
  } catch {}

  return false;
}

function manageAdminStateKeyV2(ctx) {
  return ctx.chat?.id || ctx.from?.id;
}

function manageAdminClearStateV2(ctx) {
  manageAdminStatesV2.delete(
    manageAdminStateKeyV2(ctx)
  );
}



async function manageAdminSettingsV2() {
  try {
    const records =
      await readJsonStoreV1(
        MANAGE_ADMIN_SETTINGS_FILE_V2
      );
    const settings =
      records.find(
        item =>
          item &&
          item.kind === 'settings'
      );

    return {
      kind: 'settings',
      notificationsEnabled:
        settings?.notificationsEnabled !== false,
      updatedAt:
        settings?.updatedAt || null
    };
  } catch {
    return {
      kind: 'settings',
      notificationsEnabled: true,
      updatedAt: null
    };
  }
}

async function manageAdminSaveSettingsV2(
  patch
) {
  const current =
    await manageAdminSettingsV2();
  const next = {
    ...current,
    ...patch,
    kind: 'settings',
    updatedAt: new Date().toISOString()
  };

  return writeJsonStoreV1(
    MANAGE_ADMIN_SETTINGS_FILE_V2,
    [next]
  );
}

async function manageAdminRecordActivityV2(
  action,
  actorId,
  targetId,
  details = ''
) {
  try {
    const current =
      await readJsonStoreV1(
        MANAGE_ADMIN_ACTIVITY_FILE_V2
      );
    const entry = {
      kind: `activity:${Date.now()}`,
      userId: Date.now(),
      action: String(action || 'management action'),
      actorId: Number(actorId) || null,
      targetId: Number(targetId) || null,
      details: String(details || ''),
      createdAt: new Date().toISOString()
    };
    const next = [
      entry,
      ...current
    ].slice(
      0,
      MANAGE_ADMIN_MAX_ACTIVITY_V2
    );

    await writeJsonStoreV1(
      MANAGE_ADMIN_ACTIVITY_FILE_V2,
      next
    );
  } catch {
  }
}

async function manageAdminActiveRecipientsV2() {
  const records =
    await manageAdminRecordsV2();
  const recipients = [
    manageAdminOwnerRecordV2(),
    ...records
  ];
  const seen = new Set();

  return recipients.filter(record => {
    const userId =
      manageAdminNormalizeUserIdV2(
        record.userId
      );

    if (
      !userId ||
      !manageAdminIsActiveV2(record) ||
      seen.has(userId)
    ) {
      return false;
    }

    seen.add(userId);
    return true;
  });
}

async function notifyAdminsV2(
  text,
  options = {}
) {
  const settings =
    await manageAdminSettingsV2();

  if (
    options.force !== true &&
    settings.notificationsEnabled === false
  ) {
    return {
      sent: 0,
      failed: 0,
      disabled: true
    };
  }

  const recipients =
    await manageAdminActiveRecipientsV2();
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    try {
      await options.telegram.sendMessage(
        Number(recipient.userId),
        text,
        {
          parse_mode: 'HTML',
          disable_web_page_preview: true
        }
      );
      sent += 1;
    } catch {
      failed += 1;
    }
  }

  return {
    sent,
    failed,
    disabled: false
  };
}

async function manageAdminNotifyEventV2(
  ctx,
  action,
  targetId,
  details = ''
) {
  await manageAdminRecordActivityV2(
    action,
    ctx.from?.id,
    targetId,
    details
  );

  const actor =
    manageAdminEscape(
      manageAdminDisplayNameV2({
        userId: ctx.from?.id,
        username: ctx.from?.username,
        name:
          `${ctx.from?.first_name || ''} ${ctx.from?.last_name || ''}`.trim()
      })
    );
  const target =
    targetId
      ? `\nTarget ID: <code>${targetId}</code>`
      : '';

  return notifyAdminsV2(
    `<b>Admin event</b>\n` +
      `Action: ${manageAdminEscape(action)}\n` +
      `By: ${actor}${target}` +
      (details
        ? `\n${manageAdminEscape(details)}`
        : ''),
    {
      telegram: ctx.telegram
    }
  );
}



function manageAdminMenuKeyboardV2() {
  return {
    inline_keyboard: [
      [
        {
          text: '➕ Add Admin',
          callback_data: 'admin:add'
        },
        {
          text: '📋 Admin List',
          callback_data: 'admin:list'
        }
      ],
      [
        {
          text: '🔐 Edit Permissions',
          callback_data: 'admin:permissions'
        },
        {
          text: '📣 Notify Admins',
          callback_data: 'admin:notify'
        }
      ],
      [
        {
          text: '🔔 Admin Notifications',
          callback_data: 'admin:notifications'
        },
        {
          text: '🔎 Search Admin',
          callback_data: 'admin:search'
        }
      ],
      [
        {
          text: '🧾 Admin Activity',
          callback_data: 'admin:activity'
        },
        {
          text: '🔙 Back',
          callback_data: 'admin:back'
        }
      ]
    ]
  };
}

function manageAdminBackInlineKeyboardV2() {
  return {
    inline_keyboard: [
      [
        {
          text: '🔙 Back to Manage Admin',
          callback_data: 'admin:menu'
        }
      ]
    ]
  };
}

function manageAdminDetailsKeyboardV2(record) {
  const userId =
    manageAdminNormalizeUserIdV2(
      record.userId
    );

  if (!userId) {
    return manageAdminBackInlineKeyboardV2();
  }

  if (manageAdminIsOwnerV2(userId)) {
    return {
      inline_keyboard: [
        [
          {
            text: '🔐 Owner Protected',
            callback_data: 'admin:noop'
          }
        ],
        [
          {
            text: '🔙 Back to Admin List',
            callback_data: 'admin:list'
          }
        ]
      ]
    };
  }

  return {
    inline_keyboard: [
      [
        {
          text: '✏️ Edit',
          callback_data: `admin:edit:${userId}`
        },
        {
          text: '🔐 Permissions',
          callback_data: `admin:permissions:${userId}`
        }
      ],
      [
        {
          text: manageAdminIsActiveV2(record)
            ? '⏸ Deactivate'
            : '▶️ Activate',
          callback_data: manageAdminIsActiveV2(record)
            ? `admin:deactivate:${userId}`
            : `admin:activate:${userId}`
        },
        {
          text: '🗑 Remove',
          callback_data: `admin:remove:${userId}`
        }
      ],
      [
        {
          text: '🔙 Back to Admin List',
          callback_data: 'admin:list'
        }
      ]
    ]
  };
}

function manageAdminPermissionsKeyboardV2(
  userId,
  selected,
  draft = false
) {
  const permissions =
    new Set(selected || []);
  const rows = manageAdminPermissionKeysV2()
    .map(permission => [
      {
        text:
          `${permissions.has(permission) ? '✅' : '⬜'} ` +
          manageAdminPermissionLabelV2(permission),
        callback_data:
          `${draft ? 'admin:add_permission' : 'admin:permission'}:` +
          `${userId}:${permission}`
      }
    ]);

  rows.push([
    {
      text: draft
        ? '💾 Save Admin'
        : '🔙 Back to Admin',
      callback_data: draft
        ? `admin:add_save:${userId}`
        : `admin:view:${userId}`
    }
  ]);

  return {
    inline_keyboard: rows
  };
}

function manageAdminInlineTextV2(
  ctx,
  text,
  keyboard
) {
  if (!ctx.callbackQuery) {
    return ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
  }

  return ctx.editMessageText(
    text,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
    }
  ).catch(async error => {
    if (
      !String(error?.description || error?.message || '')
        .toLowerCase()
        .includes('not modified')
    ) {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    }
  });
}

async function manageAdminMenuV2(ctx) {
  manageAdminClearStateV2(ctx);
  await manageAdminInlineTextV2(
    ctx,
    '<b>Manage Admin</b>\n' +
      'عملیات مدیریت ادمین را از دکمه‌های زیر انتخاب کنید.',
    manageAdminMenuKeyboardV2()
  );

  if (!ctx.callbackQuery) {
    await ctx.reply(
      '‌‌',
      {
        reply_markup:
          manageAdminBackKeyboardV2()
      }
    );
  }
}

function manageAdminSummaryV2(record) {
  const active =
    manageAdminIsActiveV2(record);
  const permissions =
    manageAdminIsOwnerV2(record.userId)
      ? 'FULL / OWNER'
      : manageAdminPermissionValuesV2(record)
          .map(manageAdminPermissionLabelV2)
          .join(', ') || 'بدون دسترسی';

  return (
    `<b>${manageAdminEscape(manageAdminDisplayNameV2(record))}</b>\n` +
    `ID: <code>${record.userId}</code>\n` +
    `Status: ${active ? 'Active' : 'Inactive'}\n` +
    `Permissions: ${manageAdminEscape(permissions)}`
  );
}

async function manageAdminListV2(ctx, query = '') {
  const records =
    manageAdminAllDisplayRecordsV2(
      await manageAdminRecordsV2()
    );
  const normalizedQuery =
    String(query || '').trim().toLowerCase();
  const filtered =
    normalizedQuery
      ? records.filter(record =>
          [
            record.userId,
            record.username,
            record.name
          ]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)
        )
      : records;

  const keyboard = [];
  const body = filtered.length
    ? filtered.map(record => {
        const userId = record.userId;
        const title =
          manageAdminIsOwnerV2(userId)
            ? '👑 Owner'
            : `👤 ${manageAdminDisplayNameV2(record)}`;
        const active =
          manageAdminIsActiveV2(record)
            ? '🟢'
            : '🔴';

        keyboard.push([
          {
            text: `${active} ${title}`.slice(
              0,
              60
            ),
            callback_data:
              `admin:view:${userId}`
          }
        ]);

        return manageAdminSummaryV2(record);
      }).join('\n\n')
    : 'ادمینی مطابق جستجو پیدا نشد.';

  keyboard.push([
    {
      text: '🔙 Back to Manage Admin',
      callback_data: 'admin:menu'
    }
  ]);

  await manageAdminInlineTextV2(
    ctx,
    `<b>📋 Admin List</b>${query ? `\nSearch: ${manageAdminEscape(query)}` : ''}\n\n${body}`,
    { inline_keyboard: keyboard }
  );
}

async function manageAdminDetailsV2(ctx, userId) {
  const record =
    await manageAdminFindV2(userId);

  if (!record) {
    await manageAdminInlineTextV2(
      ctx,
      'ادمین پیدا نشد.',
      manageAdminBackInlineKeyboardV2()
    );
    return;
  }

  const username =
    record.username
      ? `@${String(record.username).replace(/^@/, '')}`
      : 'ثبت نشده';
  const created =
    record.createdAt
      ? manageAdminEscape(record.createdAt)
      : 'ثبت نشده';
  const permissions =
    manageAdminIsOwnerV2(record.userId)
      ? 'FULL / OWNER'
      : manageAdminPermissionValuesV2(record)
          .map(manageAdminPermissionLabelV2)
          .join(', ') || 'بدون دسترسی';

  await manageAdminInlineTextV2(
    ctx,
    `<b>👤 Admin Details</b>\n\n` +
      `Name: ${manageAdminEscape(manageAdminDisplayNameV2(record))}\n` +
      `Username: ${manageAdminEscape(username)}\n` +
      `User ID: <code>${record.userId}</code>\n` +
      `Status: ${manageAdminIsActiveV2(record) ? 'Active' : 'Inactive'}\n` +
      `Role: ${manageAdminIsOwnerV2(record.userId) ? 'Owner' : 'Admin'}\n` +
      `Permissions: ${manageAdminEscape(permissions)}\n` +
      `Created: ${created}`,
    manageAdminDetailsKeyboardV2(record)
  );
}

async function manageAdminPermissionsV2(
  ctx,
  userId
) {
  const record =
    await manageAdminFindV2(userId);

  if (!record) {
    await manageAdminInlineTextV2(
      ctx,
      'ادمین پیدا نشد.',
      manageAdminBackInlineKeyboardV2()
    );
    return;
  }

  await manageAdminInlineTextV2(
    ctx,
    `<b>🔐 Edit Permissions</b>\n` +
      `${manageAdminEscape(manageAdminDisplayNameV2(record))}\n` +
      `ID: <code>${record.userId}</code>\n\n` +
      'برای تغییر هر Permission روی آن بزنید.',
    manageAdminIsOwnerV2(record.userId)
      ? manageAdminDetailsKeyboardV2(record)
      : manageAdminPermissionsKeyboardV2(
          record.userId,
          manageAdminPermissionValuesV2(record)
        )
  );
}

async function manageAdminAddPermissionsV2(ctx) {
  const state =
    manageAdminStatesV2.get(
      manageAdminStateKeyV2(ctx)
    );

  if (
    !state ||
    state.action !== 'add' ||
    !state.userId
  ) {
    await manageAdminMenuV2(ctx);
    return;
  }

  await manageAdminInlineTextV2(
    ctx,
    `<b>➕ Add Admin</b>\n` +
      `ID: <code>${state.userId}</code>\n` +
      `Name: ${manageAdminEscape(state.name || 'ثبت نشده')}\n` +
      `Username: ${manageAdminEscape(state.username || 'ثبت نشده')}\n\n` +
      'Permissionهای موردنیاز را انتخاب کنید، سپس Save را بزنید.',
    manageAdminPermissionsKeyboardV2(
      state.userId,
      state.permissions,
      true
    )
  );
}



async function manageAdminTogglePermissionV2(
  ctx,
  userId,
  permission
) {
  if (
    !manageAdminPermissionKeysV2()
      .includes(permission)
  ) {
    await ctx.answerCbQuery(
      'Permission نامعتبر است.',
      { show_alert: true }
    );
    return;
  }

  const record =
    await manageAdminFindV2(userId);

  if (!record) {
    await ctx.answerCbQuery(
      'ادمین پیدا نشد.',
      { show_alert: true }
    );
    return;
  }

  if (manageAdminIsOwnerV2(userId)) {
    await ctx.answerCbQuery(
      'Owner قابل تغییر نیست.',
      { show_alert: true }
    );
    return;
  }

  const records =
    await manageAdminRecordsV2();
  const index =
    records.findIndex(
      item =>
        Number(item.userId) === Number(userId)
    );

  if (index < 0) {
    await ctx.answerCbQuery(
      'ادمین پیدا نشد.',
      { show_alert: true }
    );
    return;
  }

  const current =
      new Set(
        manageAdminPermissionValuesV2(
        records[index]
      )
    );

  if (current.has(permission)) {
    current.delete(permission);
  } else {
    current.add(permission);
  }

  records[index] = {
    ...records[index],
    permissions: Array.from(current),
    updatedAt: new Date().toISOString()
  };

  const saved =
    await writeJsonStoreV1(
      GITHUB_ADMIN_FILE,
      records
    );

  if (!saved) {
    await ctx.answerCbQuery(
      'ذخیره Permission انجام نشد.',
      { show_alert: true }
    );
    return;
  }

  await ctx.answerCbQuery('Permission تغییر کرد.');
  await manageAdminRecordActivityV2(
    'permission changed',
    ctx.from?.id,
    userId,
    permission
  );
  await notifyAdminsV2(
    `<b>Permission changed</b>\n` +
      `Admin: <code>${userId}</code>\n` +
      `Permission: ${manageAdminEscape(permission)}`,
    { telegram: ctx.telegram }
  );
  await manageAdminPermissionsV2(
    ctx,
    userId
  );
}

async function manageAdminToggleDraftPermissionV2(
  ctx,
  userId,
  permission
) {
  const state =
    manageAdminStatesV2.get(
      manageAdminStateKeyV2(ctx)
    );

  if (
    !state ||
    state.action !== 'add' ||
    Number(state.userId) !== Number(userId) ||
    !manageAdminPermissionKeysV2()
      .includes(permission)
  ) {
    await ctx.answerCbQuery(
      'فرآیند افزودن منقضی شده است.',
      { show_alert: true }
    );
    return;
  }

  const selected =
    new Set(state.permissions || []);

  if (selected.has(permission)) {
    selected.delete(permission);
  } else {
    selected.add(permission);
  }

  state.permissions =
    Array.from(selected);
  manageAdminStatesV2.set(
    manageAdminStateKeyV2(ctx),
    state
  );

  await ctx.answerCbQuery();
  await manageAdminAddPermissionsV2(ctx);
}

async function manageAdminSaveNewV2(ctx, userId) {
  const state =
    manageAdminStatesV2.get(
      manageAdminStateKeyV2(ctx)
    );

  if (
    !state ||
    state.action !== 'add' ||
    Number(state.userId) !== Number(userId)
  ) {
    await ctx.answerCbQuery(
      'فرآیند افزودن منقضی شده است.',
      { show_alert: true }
    );
    return;
  }

  if (!state.permissions?.length) {
    await ctx.answerCbQuery(
      'حداقل یک Permission انتخاب کنید.',
      { show_alert: true }
    );
    return;
  }

  const records =
    await manageAdminRecordsV2();
  if (
    records.some(
      record =>
        Number(record.userId) === Number(userId)
    )
  ) {
    manageAdminClearStateV2(ctx);
    await ctx.answerCbQuery(
      'این User قبلاً Admin است.',
      { show_alert: true }
    );
    await manageAdminListV2(ctx);
    return;
  }

  const now =
    new Date().toISOString();
  records.push({
    kind: `admin:${userId}`,
    userId: Number(userId),
    username: String(state.username || ''),
    name: String(state.name || ''),
    role: 'admin',
    enabled: true,
    active: true,
    permissions: Array.from(
      new Set(state.permissions)
    ),
    createdAt: now,
    updatedAt: now
  });

  const saved =
    await writeJsonStoreV1(
      GITHUB_ADMIN_FILE,
      records
    );

  if (!saved) {
    await ctx.answerCbQuery(
      'ذخیره Admin انجام نشد.',
      { show_alert: true }
    );
    return;
  }

  manageAdminClearStateV2(ctx);
  await ctx.answerCbQuery('Admin اضافه شد.');
  await manageAdminRecordActivityV2(
    'admin added',
    ctx.from?.id,
    userId,
    state.name || state.username || ''
  );
  await notifyAdminsV2(
    `<b>Admin added</b>\n` +
      `User ID: <code>${userId}</code>\n` +
      `By: <code>${ctx.from?.id}</code>`,
    { telegram: ctx.telegram }
  );
  await manageAdminDetailsV2(
    ctx,
    userId
  );
}

async function manageAdminChangeStatusV2(
  ctx,
  userId,
  active
) {
  const normalized =
    manageAdminNormalizeUserIdV2(userId);

  if (
    !normalized ||
    manageAdminIsOwnerV2(normalized)
  ) {
    await ctx.answerCbQuery(
      'Owner همیشه فعال و محافظت‌شده است.',
      { show_alert: true }
    );
    return;
  }

  if (
    Number(ctx.from?.id) === normalized
  ) {
    await ctx.answerCbQuery(
      'تغییر وضعیت خودتان مجاز نیست.',
      { show_alert: true }
    );
    return;
  }

  const records =
    await manageAdminRecordsV2();
  const index =
    records.findIndex(
      record =>
        Number(record.userId) === normalized
    );

  if (index < 0) {
    await ctx.answerCbQuery(
      'ادمین پیدا نشد.',
      { show_alert: true }
    );
    return;
  }

  records[index] = {
    ...records[index],
    enabled: Boolean(active),
    active: Boolean(active),
    updatedAt: new Date().toISOString()
  };

  const saved =
    await writeJsonStoreV1(
      GITHUB_ADMIN_FILE,
      records
    );

  if (!saved) {
    await ctx.answerCbQuery(
      'ذخیره وضعیت انجام نشد.',
      { show_alert: true }
    );
    return;
  }

  const action =
    active
      ? 'admin activated'
      : 'admin deactivated';
  await ctx.answerCbQuery(
    active ? 'Admin فعال شد.' : 'Admin غیرفعال شد.'
  );
  await manageAdminNotifyEventV2(
    ctx,
    action,
    normalized
  );
  await manageAdminDetailsV2(
    ctx,
    normalized
  );
}

async function manageAdminConfirmRemoveV2(
  ctx,
  userId
) {
  const normalized =
    manageAdminNormalizeUserIdV2(userId);

  if (
    !normalized ||
    manageAdminIsOwnerV2(normalized) ||
    Number(ctx.from?.id) === normalized
  ) {
    await ctx.answerCbQuery(
      'این حساب قابل حذف نیست.',
      { show_alert: true }
    );
    return;
  }

  const record =
    await manageAdminFindV2(normalized);

  if (!record) {
    await ctx.answerCbQuery(
      'ادمین پیدا نشد.',
      { show_alert: true }
    );
    return;
  }

  await ctx.answerCbQuery();
  await manageAdminInlineTextV2(
    ctx,
    `<b>⚠️ Confirm Remove</b>\n\n` +
      `آیا می‌خواهید ${manageAdminEscape(manageAdminDisplayNameV2(record))} ` +
      `با ID <code>${normalized}</code> حذف شود؟`,
    {
      inline_keyboard: [
        [
          {
            text: '✅ Confirm Remove',
            callback_data:
              `admin:remove_confirm:${normalized}`
          },
          {
            text: '❌ Cancel',
            callback_data:
              `admin:view:${normalized}`
          }
        ]
      ]
    }
  );
}

async function manageAdminRemoveV2(ctx, userId) {
  const normalized =
    manageAdminNormalizeUserIdV2(userId);

  if (
    !normalized ||
    manageAdminIsOwnerV2(normalized) ||
    Number(ctx.from?.id) === normalized
  ) {
    await ctx.answerCbQuery(
      'Owner یا حساب خودتان قابل حذف نیست.',
      { show_alert: true }
    );
    return;
  }

  const records =
    await manageAdminRecordsV2();
  const filtered =
    records.filter(
      record =>
        Number(record.userId) !== normalized
    );

  if (filtered.length === records.length) {
    await ctx.answerCbQuery(
      'ادمین پیدا نشد.',
      { show_alert: true }
    );
    return;
  }

  const saved =
    await writeJsonStoreV1(
      GITHUB_ADMIN_FILE,
      filtered
    );

  if (!saved) {
    await ctx.answerCbQuery(
      'حذف Admin انجام نشد.',
      { show_alert: true }
    );
    return;
  }

  await ctx.answerCbQuery('Admin حذف شد.');
  await manageAdminNotifyEventV2(
    ctx,
    'admin removed',
    normalized
  );
  await manageAdminListV2(ctx);
}



async function manageAdminStartAddV2(ctx) {
  manageAdminStatesV2.set(
    manageAdminStateKeyV2(ctx),
    {
      action: 'add',
      actorId: Number(ctx.from?.id),
      step: 'identity'
    }
  );

  await manageAdminInlineTextV2(
    ctx,
    '<b>➕ Add Admin</b>\n\n' +
      'User ID را ارسال کنید.\n' +
      'در صورت نیاز می‌توانید بعد از آن Username و Name را هم بنویسید:\n' +
      '<code>123456789 @username نام کاربر</code>',
    manageAdminBackInlineKeyboardV2()
  );
}

async function manageAdminStartSearchV2(ctx) {
  manageAdminStatesV2.set(
    manageAdminStateKeyV2(ctx),
    {
      action: 'search',
      actorId: Number(ctx.from?.id)
    }
  );

  await manageAdminInlineTextV2(
    ctx,
    '<b>🔎 Search Admin</b>\n\n' +
      'User ID یا Username را ارسال کنید.',
    manageAdminBackInlineKeyboardV2()
  );
}

async function manageAdminStartNotifyV2(ctx) {
  manageAdminStatesV2.set(
    manageAdminStateKeyV2(ctx),
    {
      action: 'notify',
      actorId: Number(ctx.from?.id)
    }
  );

  await manageAdminInlineTextV2(
    ctx,
    '<b>📣 Notify Admins</b>\n\n' +
      'پیام، عکس، ویدیو، فایل یا صوت را ارسال کنید تا برای همه Adminهای فعال کپی شود.',
    manageAdminBackInlineKeyboardV2()
  );
}

async function manageAdminActivityV2(ctx) {
  let records = [];

  try {
    records =
      await readJsonStoreV1(
        MANAGE_ADMIN_ACTIVITY_FILE_V2
      );
  } catch {}

  const body =
    records.length
      ? records
          .slice(0, 25)
          .map(item =>
            `• <b>${manageAdminEscape(item.action || 'action')}</b>` +
            ` — actor <code>${item.actorId || '-'}</code>` +
            (item.targetId
              ? ` — target <code>${item.targetId}</code>`
              : '') +
            `\n  ${manageAdminEscape(item.createdAt || '')}`
          )
          .join('\n')
      : 'هنوز Activity ثبت نشده است.';

  await manageAdminInlineTextV2(
    ctx,
    `<b>🧾 Admin Activity</b>\n\n${body}`,
    manageAdminBackInlineKeyboardV2()
  );
}

async function manageAdminNotificationSettingsV2(ctx) {
  const settings =
    await manageAdminSettingsV2();
  const enabled =
    settings.notificationsEnabled !== false;

  await manageAdminInlineTextV2(
    ctx,
    `<b>🔔 Admin Notifications</b>\n\n` +
      `وضعیت: ${enabled ? '🟢 Enabled' : '🔴 Disabled'}\n` +
      'این تنظیم برای Eventهای مدیریتی مانند افزودن، حذف، فعال‌سازی و تغییر Permission استفاده می‌شود.',
    {
      inline_keyboard: [
        [
          {
            text: enabled
              ? '🔴 Disable'
              : '🟢 Enable',
            callback_data:
              'admin:notifications:toggle'
          }
        ],
        [
          {
            text: '🔙 Back to Manage Admin',
            callback_data: 'admin:menu'
          }
        ]
      ]
    }
  );
}

async function manageAdminToggleNotificationsV2(ctx) {
  const current =
    await manageAdminSettingsV2();
  const nextEnabled =
    current.notificationsEnabled === false;
  const saved =
    await manageAdminSaveSettingsV2({
      notificationsEnabled: nextEnabled
    });

  if (!saved) {
    await ctx.answerCbQuery(
      'ذخیره تنظیم Notifications انجام نشد.',
      { show_alert: true }
    );
    return;
  }

  await ctx.answerCbQuery(
    nextEnabled
      ? 'Notifications فعال شد.'
      : 'Notifications غیرفعال شد.'
  );
  await manageAdminNotificationSettingsV2(
    ctx
  );
}

async function manageAdminHandleTextV2(ctx) {
  const state =
    manageAdminStatesV2.get(
      manageAdminStateKeyV2(ctx)
    );

  if (
    !state ||
    Number(state.actorId) !== Number(ctx.from?.id)
  ) {
    return false;
  }

  const text =
    String(ctx.message?.text || '').trim();

  if (
    text === '🔙 Back To Menu' ||
    /^\/cancel$/i.test(text)
  ) {
    manageAdminClearStateV2(ctx);
    await mainMenu(ctx);
    return true;
  }

  if (state.action === 'search') {
    manageAdminClearStateV2(ctx);
    await manageAdminListV2(ctx, text);
    return true;
  }

  if (state.action === 'edit') {
    const targetId =
      manageAdminNormalizeUserIdV2(
        state.userId
      );
    const parts =
      text.split('|');
    const username =
      String(parts.shift() || '')
        .trim()
        .replace(/^@/, '');
    const name =
      String(parts.join('|') || '')
        .trim();

    if (
      !targetId ||
      manageAdminIsOwnerV2(targetId) ||
      !username ||
      !name
    ) {
      await ctx.reply(
        'فرمت نامعتبر است. به شکل زیر ارسال کنید:\n' +
          '<code>@username | نام جدید</code>',
        { parse_mode: 'HTML' }
      );
      return true;
    }

    const records =
      await manageAdminRecordsV2();
    const index =
      records.findIndex(
        record =>
          Number(record.userId) === targetId
      );

    if (index < 0) {
      manageAdminClearStateV2(ctx);
      await ctx.reply('ادمین پیدا نشد.');
      return true;
    }

    records[index] = {
      ...records[index],
      username,
      name,
      updatedAt: new Date().toISOString()
    };
    const saved =
      await writeJsonStoreV1(
        GITHUB_ADMIN_FILE,
        records
      );

    if (!saved) {
      await ctx.reply(
        'ذخیره اطلاعات Admin انجام نشد.'
      );
      return true;
    }

    manageAdminClearStateV2(ctx);
    await manageAdminNotifyEventV2(
      ctx,
      'admin details changed',
      targetId,
      `${username} | ${name}`
    );
    await ctx.reply(
      '✅ اطلاعات Admin با موفقیت ویرایش شد.',
      {
        reply_markup:
          manageAdminBackKeyboardV2()
      }
    );
    await manageAdminDetailsV2(
      ctx,
      targetId
    );
    return true;
  }

  if (
    state.action !== 'add' ||
    state.step !== 'identity'
  ) {
    return false;
  }

  const tokens =
    text.split(/\s+/).filter(Boolean);
  const userId =
    manageAdminNormalizeUserIdV2(
      tokens.shift()
    );

  if (!userId) {
    await ctx.reply(
      'User ID نامعتبر است. فقط یک ID عددی معتبر ارسال کنید.'
    );
    return true;
  }

  if (manageAdminIsOwnerV2(userId)) {
    await ctx.reply(
      'Owner از قبل در سیستم وجود دارد و قابل ثبت مجدد نیست.'
    );
    return true;
  }

  const existing =
    await manageAdminFindV2(userId);

  if (existing) {
    await ctx.reply(
      'این User قبلاً Admin است.'
    );
    return true;
  }

  const usernameToken =
    tokens.find(token =>
      token.startsWith('@')
    );
  const name =
    tokens
      .filter(token => token !== usernameToken)
      .join(' ');

  state.userId = userId;
  state.username =
    usernameToken || '';
  state.name = name;
  state.step = 'permissions';
  state.permissions = [];
  manageAdminStatesV2.set(
    manageAdminStateKeyV2(ctx),
    state
  );

  await manageAdminAddPermissionsV2(ctx);
  return true;
}

async function manageAdminHandleMessageV2(ctx) {
  const state =
    manageAdminStatesV2.get(
      manageAdminStateKeyV2(ctx)
    );

  if (
    !state ||
    state.action !== 'notify' ||
    Number(state.actorId) !== Number(ctx.from?.id)
  ) {
    return false;
  }

  if (
    ctx.message?.text === '🔙 Back To Menu' ||
    /^\/cancel$/i.test(ctx.message?.text || '')
  ) {
    manageAdminClearStateV2(ctx);
    await mainMenu(ctx);
    return true;
  }

  const recipients =
    await manageAdminActiveRecipientsV2();
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    try {
      await ctx.telegram.copyMessage(
        Number(recipient.userId),
        ctx.chat.id,
        ctx.message.message_id
      );
      sent += 1;
    } catch {
      failed += 1;
    }
  }

  manageAdminClearStateV2(ctx);
  await manageAdminRecordActivityV2(
    'admin notification sent',
    ctx.from?.id,
    null,
    `sent=${sent}, failed=${failed}`
  );
  await ctx.reply(
    `<b>Notify Admins finished</b>\nSent: ${sent}\nFailed: ${failed}`,
    {
      parse_mode: 'HTML',
      reply_markup:
        manageAdminBackKeyboardV2()
    }
  );
  return true;
}



bot.hears(
  'Manage Admin',
  async ctx => {
    if (
      !(await requireManageAdminV2(ctx))
    ) {
      return;
    }
    await manageAdminMenuV2(ctx);
  }
);


bot.hears(
  'Manage Admin',
  async ctx => {
    if (
      !(await requireManageAdminV2(ctx))
    ) {
      return;
    }
    await manageAdminMenuV2(ctx);
  }
);

bot.command(
  'adminpanel',
  async ctx => {
    if (
      !(await requireManageAdminV2(ctx))
    ) {
      return;
    }
    await manageAdminMenuV2(ctx);
  }
);

bot.action(
  /^admin:(.+)$/,
  async ctx => {
    if (
      !(await requireManageAdminV2(ctx))
    ) {
      return;
    }

    const raw =
      String(ctx.match?.[1] || '');
    const parts =
      raw.split(':');
    const action = parts.shift() || '';
    const first = parts.shift() || '';
    const second = parts.join(':');

    try {
      if (action === 'noop') {
        await ctx.answerCbQuery(
          'این مورد محافظت شده است.',
          { show_alert: true }
        );
        return;
      }

      if (action === 'menu') {
        await ctx.answerCbQuery();
        await manageAdminMenuV2(ctx);
        return;
      }

      if (action === 'back') {
        manageAdminClearStateV2(ctx);
        await ctx.answerCbQuery();
        await mainMenu(ctx);
        return;
      }

      if (action === 'add') {
        await ctx.answerCbQuery();
        await manageAdminStartAddV2(ctx);
        return;
      }

      if (action === 'list') {
        manageAdminClearStateV2(ctx);
        await ctx.answerCbQuery();
        await manageAdminListV2(ctx);
        return;
      }

      if (action === 'search') {
        await ctx.answerCbQuery();
        await manageAdminStartSearchV2(ctx);
        return;
      }

      if (action === 'notify') {
        await ctx.answerCbQuery();
        await manageAdminStartNotifyV2(ctx);
        return;
      }

      if (action === 'activity') {
        await ctx.answerCbQuery();
        await manageAdminActivityV2(ctx);
        return;
      }

      if (action === 'notifications') {
        if (first === 'toggle') {
          await manageAdminToggleNotificationsV2(ctx);
        } else {
          await ctx.answerCbQuery();
          await manageAdminNotificationSettingsV2(ctx);
        }
        return;
      }

      if (action === 'view') {
        await ctx.answerCbQuery();
        await manageAdminDetailsV2(ctx, first);
        return;
      }

      if (action === 'edit') {
        const record =
          await manageAdminFindV2(first);
        if (!record) {
          await ctx.answerCbQuery(
            'ادمین پیدا نشد.',
            { show_alert: true }
          );
          return;
        }

        const stateKey =
          manageAdminStateKeyV2(ctx);
        manageAdminStatesV2.set(
          stateKey,
          {
            action: 'edit',
            actorId: Number(ctx.from?.id),
            userId: Number(first),
            username: record.username || '',
            name: record.name || ''
          }
        );
        await ctx.answerCbQuery();
        await manageAdminInlineTextV2(
          ctx,
          '<b>✏️ Edit Admin</b>\n\n' +
            'برای ویرایش Username و Name، مقدار را به شکل زیر ارسال کنید:\n' +
            '<code>@username | نام جدید</code>',
          manageAdminBackInlineKeyboardV2()
        );
        return;
      }

      if (action === 'permissions') {
        await ctx.answerCbQuery();
        if (!first) {
          await manageAdminListV2(ctx);
        } else {
          await manageAdminPermissionsV2(
            ctx,
            first
          );
        }
        return;
      }

      if (action === 'permission') {
        await manageAdminTogglePermissionV2(
          ctx,
          first,
          second
        );
        return;
      }

      if (action === 'add_permission') {
        await manageAdminToggleDraftPermissionV2(
          ctx,
          first,
          second
        );
        return;
      }

      if (action === 'add_save') {
        await manageAdminSaveNewV2(
          ctx,
          first
        );
        return;
      }

      if (action === 'activate') {
        await manageAdminChangeStatusV2(
          ctx,
          first,
          true
        );
        return;
      }

      if (action === 'deactivate') {
        await manageAdminChangeStatusV2(
          ctx,
          first,
          false
        );
        return;
      }

      if (action === 'remove') {
        await manageAdminConfirmRemoveV2(
          ctx,
          first
        );
        return;
      }

      if (action === 'remove_confirm') {
        await manageAdminRemoveV2(
          ctx,
          first
        );
        return;
      }

      await ctx.answerCbQuery(
        'Action ناشناخته است.',
        { show_alert: true }
      );
    } catch (error) {
      try {
        await ctx.answerCbQuery(
          'اجرای عملیات ناموفق بود.',
          { show_alert: true }
        );
        await ctx.reply(
          'خطایی در اجرای عملیات مدیریت ادمین رخ داد. اطلاعات قبلی حفظ شده است.'
        );
      } catch {}
    }
  }
);


const POST_NEWS_CHANNEL = '-1003777491756';
const POST_NEWS_REPLACE = ' @Anime_FaarsiNews';

const postNewsStates = new Map();

async function sendPhotoAlbum(ctx, photos, caption = '', entities = []) {
  if (!photos || !photos.length) return;

  const processed = replaceMentionsWithEntities(caption, entities);

  const media = photos.map((photo, index) => {
    const item = {
      type: 'photo',
      media: photo
    };

    // کپشن فقط روی عکس اول
    if (index === 0 && processed.text) {
      item.caption = processed.text;

      if (processed.entities?.length) {
        item.caption_entities = processed.entities;
      }
    }

    return item;
  });

  await ctx.telegram.sendMediaGroup(
    ctx.chat.id,
    media
  );
}

function replaceMentionsWithEntities(text, entities = []) {
  if (!text) {
    return {
      text: text || '',
      entities: entities || []
    };
  }

  const regex = /@[A-Za-z0-9_]{1,64}/g;
  const matches = [...text.matchAll(regex)];

  if (!matches.length) {
    return {
      text,
      entities: entities || []
    };
  }

  let newText = '';
  let lastIndex = 0;
  const changes = [];
  const boldEntities = [];

  for (const match of matches) {
    const start = match.index;
    const end = start + match[0].length;

    newText += text.slice(lastIndex, start);

    const newStart = newText.length;
    newText += POST_NEWS_REPLACE;

    boldEntities.push({
      type: 'bold',
      offset: newStart,
      length: POST_NEWS_REPLACE.length
    });

    changes.push({
      start,
      end,
      newLength: POST_NEWS_REPLACE.length
    });

    lastIndex = end;
  }

  newText += text.slice(lastIndex);

  function mapOffset(offset) {
    let result = offset;

    for (const change of changes) {
      if (offset >= change.end) {
        result += change.newLength - (change.end - change.start);
      } else if (offset > change.start) {
        result += change.newLength - (offset - change.start);
        break;
      } else {
        break;
      }
    }

    return result;
  }

  const newEntities = (entities || []).map(entity => {
    const oldStart = entity.offset;
    const oldEnd = entity.offset + entity.length;

    const newStart = mapOffset(oldStart);
    const newEnd = mapOffset(oldEnd);

    return {
      ...entity,
      offset: newStart,
      length: Math.max(0, newEnd - newStart)
    };
  });

  return {
    text: newText,
    entities: [...newEntities, ...boldEntities]
  };
}

function postNewsKeyboard() {
  return {
    keyboard: [
      [
        {
          text: '🔙 Back Too Menu'
        }
      ]
    ],
    resize_keyboard: true
  };
}

bot.command('postnews', async ctx => {
  try {
    if (!(await isAdmin(ctx, 'postNews'))) return;

    postNewsStates.set(ctx.from.id, true);

    await ctx.reply(
      '<b>Post News</b>\n\nپست خود را ارسال کنید.\n\nبرای پایان ارسال، روی «Back to menu» بزنید.',
      {
        parse_mode: 'HTML',
        reply_markup: postNewsKeyboard()
      }
    );
  } catch (err) {
    console.error('Post News start error:', err);
  }
});

bot.hears('Post News', async ctx => {
  try {
    if (!(await isAdmin(ctx, 'postNews'))) return;

    postNewsStates.set(ctx.from.id, true);

    await ctx.reply(
      '<b>Post News</b>\n\nپست خود را ارسال کنید.\n\nبرای پایان ارسال، روی « Back to menu» بزنید.',
      {
        parse_mode: 'HTML',
        reply_markup: postNewsKeyboard()
      }
    );
  } catch (err) {
    console.error('Post News start error:', err);
  }
});

bot.command('postnewsfinish', async ctx => {
  try {
    if (!(await isAdmin(ctx, 'postNews'))) return;

    postNewsStates.delete(ctx.from.id);

    await ctx.reply(
      'ارسال Post News پایان یافت.',
      {
        reply_markup: {
          remove_keyboard: true
        }
      }
    );
  } catch (err) {
    console.error('Post News finish error:', err);
  }
});

bot.hears('🔙 Back Too Menu', async ctx => {
  try {
    if (!(await isAdmin(ctx, 'postNews'))) return;

    if (!postNewsStates.has(ctx.from.id)) return;

    postNewsStates.delete(ctx.from.id);

    try {
      await ctx.deleteMessage();
    } catch (err) {
      console.error('Post News back delete error:', err);
    }

    await ctx.reply(
      '<b>Tools</b>',
      {
        parse_mode: 'HTML',
        reply_markup: toolsKeyboard()
      }
    );
  } catch (err) {
    console.error('Post News back error:', err);
  }
});



const postNewsAlbums = new Map();

bot.on('message', async ctx => {
  try {
    if (!ctx.from) return;

    if (!postNewsStates.has(ctx.from.id)) return;

    if (!(await isAdmin(ctx, 'postNews'))) return;

    const msg = ctx.message;

    if (!msg) return;


    if (
      msg.text &&
      !msg.text.startsWith('/')
    ) {
      const result = replaceMentionsWithEntities(
        msg.text,
        msg.entities || []
      );

      await ctx.telegram.sendMessage(
        POST_NEWS_CHANNEL,
        result.text,
        {
          entities: result.entities
        }
      );

      return;
    }



    if (
      msg.media_group_id &&
      (
        msg.photo ||
        msg.video ||
        msg.document ||
        msg.audio
      )
    ) {
      const groupId = msg.media_group_id;

      if (!postNewsAlbums.has(groupId)) {
        postNewsAlbums.set(groupId, {
          photos: [],
          firstCaption: '',
          firstEntities: [],
          timer: null
        });
      }

      const album = postNewsAlbums.get(groupId);

      let media;

      if (msg.photo) {
        media = msg.photo[msg.photo.length - 1].file_id;
        album.photos.push({
          type: 'photo',
          media
        });
      } else if (msg.video) {
        album.photos.push({
          type: 'video',
          media: msg.video.file_id
        });
      } else if (msg.document) {
        album.photos.push({
          type: 'document',
          media: msg.document.file_id
        });
      } else if (msg.audio) {
        album.photos.push({
          type: 'audio',
          media: msg.audio.file_id
        });
      }


      if (
        msg.caption &&
        !album.firstCaption
      ) {
        album.firstCaption = msg.caption;
        album.firstEntities =
          msg.caption_entities || [];
      }


      if (album.timer) {
        clearTimeout(album.timer);
      }

      album.timer = setTimeout(async () => {
        try {
          const currentAlbum =
            postNewsAlbums.get(groupId);

          if (!currentAlbum) return;

          postNewsAlbums.delete(groupId);

          if (!currentAlbum.photos.length) {
            return;
          }

          let processedCaption = '';
          let processedEntities = [];

          if (currentAlbum.firstCaption) {
            const result =
              replaceMentionsWithEntities(
                currentAlbum.firstCaption,
                currentAlbum.firstEntities
              );

            processedCaption = result.text;
            processedEntities = result.entities;
          }

          const media =
            currentAlbum.photos.map(
              (item, index) => {
                const mediaItem = {
                  ...item
                };


                if (
                  index === 0 &&
                  processedCaption
                ) {
                  mediaItem.caption =
                    processedCaption;

                  if (
                    processedEntities.length
                  ) {
                    mediaItem.caption_entities =
                      processedEntities;
                  }
                }

                return mediaItem;
              }
            );

          await ctx.telegram.sendMediaGroup(
            POST_NEWS_CHANNEL,
            media
          );

        } catch (err) {
          console.error(
            'Post News album send error:',
            err
          );
        }
      }, 700);

      return;
    }


    if (msg.caption) {
      const result =
        replaceMentionsWithEntities(
          msg.caption,
          msg.caption_entities || []
        );

      await ctx.telegram.copyMessage(
        POST_NEWS_CHANNEL,
        ctx.chat.id,
        msg.message_id,
        {
          caption: result.text,
          caption_entities: result.entities
        }
      );

      return;
    }



    if (
      msg.photo ||
      msg.video ||
      msg.document ||
      msg.audio ||
      msg.animation
    ) {
      await ctx.telegram.copyMessage(
        POST_NEWS_CHANNEL,
        ctx.chat.id,
        msg.message_id
      );

      return;
    }

  } catch (err) {
    console.error(
      'Post News message error:',
      err
    );

    await ctx.reply(
      'خطا در ارسال Post News.'
    );
  }
});




bot.on(
  'text',
  async (ctx, next) => {
    if (
      await manageAdminHandleTextV2(ctx)
    ) {
      return;
    }

    return next();
  }
);


bot.on(
  'message',
  async (ctx, next) => {
    if (
      await manageAdminHandleMessageV2(ctx)
    ) {
      return;
    }

    return next();
  }
);

// ==========================================
// BOT STARTUP VERSION CHECK
// ==========================================

(async () => {
  try {
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    const nowPath =
      `${GITHUB_BACKUP_DIR}/now.json`;

    const nowUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${nowPath}?ref=${GITHUB_BRANCH}`;

    const response = await axios.get(
      nowUrl,
      { headers }
    );

    const encoded = response.data?.content;

    if (!encoded) return;

    const nowData = JSON.parse(
      Buffer.from(
        encoded.replace(/\s/g, ''),
        'base64'
      ).toString('utf8')
    );

    if (!nowData.version) return;

    // Tell GitHub that this version actually started
    if (nowData.status === 'pending') {
      const runningData = {
        ...nowData,
        status: 'running',
        startedAt: new Date().toISOString()
      };

      const runningContent =
        Buffer.from(
          JSON.stringify(runningData, null, 2),
          'utf8'
        ).toString('base64');

      await axios.put(
        nowUrl.split('?')[0],
        {
          message: 'Mark bot version as running',
          content: runningContent,
          sha: response.data.sha,
          branch: GITHUB_BRANCH
        },
        { headers }
      );

      if (nowData.action === 'automatic-rollback') {

        await bot.telegram.sendMessage(
          UPDATE_ADMIN_ID,
          '⚠️ The new version failed to start.\n\n' +
          '🔄 The previous version was automatically restored.\n\n' +
          '🔖 Restored version: ' +
          nowData.version.substring(0, 7) +
          '\n' +
          '✅ Bot is running again.'
        );

      } else {

        await bot.telegram.sendMessage(
          UPDATE_ADMIN_ID,
          '🚀 Bot started successfully.\n\n' +
          '🔖 Version: ' +
          nowData.version.substring(0, 7) +
          '\n' +
          '📦 Source: ' +
          (nowData.source || 'github') +
          '\n' +
          '🕐 Updated: ' +
          (nowData.updatedAt || 'unknown')
        );
      }
    }

  } catch (error) {
    console.error('startup version check:', error);
  }
})();




bot.catch(
  (err, ctx) => {
    console.error(
      'BOT ERROR:',
      err
    );
  }
);

تبتبدد