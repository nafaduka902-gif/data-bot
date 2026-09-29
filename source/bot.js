const ADMIN_ID = 2048310529;
const OMDB_API_KEY = 'c984bcec';
const DEFAULT_DOWNLOAD_URL = 'https://t.me/dubb_anime';

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
    '<b>Owner Panel</b>',
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
        error?.mes
