   saved
            ? '<b>✅ متن با موفقیت ذخیره شد.</b>'
            : '<b>❌ ذخیره انجام نشد.</b>',
          {
            parse_mode:
              'HTML',
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
          /^https?:\/\//i.test(
            text
          )
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
            parse_mode:
              'HTML',
            reply_markup:
              setKeyboard()
          }
        );

        return;
      }
    }

    const inAiChat =
      ['group', 'supergroup'].includes(
        ctx.chat?.type
      ) &&
      String(
        ctx.chat?.username || ''
      )
        .replace(/^@/, '')
        .toLowerCase() ===
        NF_AI_CHAT_USERNAME.toLowerCase();

    if (inAiChat) {
      return next();
    }

    const normalized =
      normalizeChannelName(
        text
      );

    let searchQuery =
      normalized;

    if (
      /^انیمه\s+/i.test(
        text
      )
    ) {
      searchQuery =
        normalizeChannelName(
          text.replace(
            /^انیمه\s+/i,
            ''
          )
        );
    }

    if (
      /^anime\s+/i.test(
        text
      )
    ) {
      searchQuery =
        normalizeChannelName(
          text.replace(
            /^anime\s+/i,
            ''
          )
        );
    }

    if (!searchQuery) {
      return next();
    }

    const found =
      await searchChannelPostForUser(
        ctx,
        searchQuery
      );

    if (found) {
      return;
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

function replaceMentionsWithEntities(
  text,
  entities = []
) {
  if (!text) {
    return {
      text: text || '',
      entities: entities || []
    };
  }

  const regex =
    /@[A-Za-z0-9_]{1,64}|#[A-Za-z0-9_]{1,64}/g;

  const matches =
    [...text.matchAll(regex)];

  const changes = [];
  const boldEntities = [];

  let newText = '';
  let lastIndex = 0;

  for (const match of matches) {
    const start = match.index;
    const end =
      start + match[0].length;

    const value = match[0];

    newText +=
      text.slice(
        lastIndex,
        start
      );

    const newStart =
      newText.length;

    if (value.startsWith('@')) {
      newText += POST_NEWS_REPLACE;

      boldEntities.push({
        type: 'bold',
        offset: newStart,
        length:
          POST_NEWS_REPLACE.length
      });

      changes.push({
        start,
        end,
        newLength:
          POST_NEWS_REPLACE.length,
        removed: false
      });
    } else {
      changes.push({
        start,
        end,
        newLength: 0,
        removed: true
      });
    }

    lastIndex = end;
  }

  newText +=
    text.slice(lastIndex);

  const footer =
    `\n\n@Anime_FaarsiNews | #Mr`;

  const footerStart =
    newText.length;

  newText += footer;

  const mrStart =
    newText.length -
    '#Mr'.length;

  boldEntities.push({
    type: 'bold',
    offset: mrStart,
    length: '#Mr'.length
  });

  function mapOffset(offset) {
    let result = offset;

    for (const change of changes) {
      if (offset >= change.end) {
        result +=
          change.newLength -
          (change.end - change.start);
      } else if (
        offset > change.start &&
        offset < change.end
      ) {
        result =
          change.start +
          change.newLength;

        break;
      } else {
        break;
      }
    }

    return result;
  }

  const newEntities =
    (entities || [])
      .filter(entity => {
        const start =
          entity.offset;

        const end =
          entity.offset +
          entity.length;

        for (const change of changes) {
          if (!change.removed) {
            continue;
          }

          if (
            start < change.end &&
            end > change.start
          ) {
            return false;
          }
        }

        return true;
      })
      .map(entity => {
        const oldStart =
          entity.offset;

        const oldEnd =
          entity.offset +
          entity.length;

        const newStart =
          mapOffset(oldStart);

        const newEnd =
          mapOffset(oldEnd);

        return {
          ...entity,
          offset: newStart,
          length:
            Math.max(
              0,
              newEnd - newStart
            )
        };
      });

  return {
    text: newText,
    entities: [
      ...newEntities,
      ...boldEntities
    ]
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



ensureUploadGithubFiles()
    .then(() => {
        startUploadResultWatcher();
    })
    .catch(error => {
        console.error(
            'UPLOAD GITHUB INIT ERROR:',
            error
        );
    });






bot.catch(
  (err, ctx) => {
    console.error(
      'BOT ERROR:',
      err
    );
  }
);