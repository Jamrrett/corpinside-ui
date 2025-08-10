export default {
  // 测试环境
  baseURL: 'https://10.250.123.162:443/api',
  // imBaseURL: 'https://10.250.123.162:81/im',
  // webURL: 'http://10.250.123.162:8080',
  // modelURL: 'https://10.249.40.83:443',

  // 生产环境
  webURL: location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '') + '/',
  // baseURL: location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '') + "/api",
  // imBaseURL: location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '') + "/im",

  host: location.hostname + (location.port ? ':' + location.port : ''),

  tocbot: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.min.js',

  //前后端定义的密钥，AES使用16位
  cryptojs_key: 'sarasarasarasara',

  before_color_1: 'black',
  after_color_1: 'linear-gradient(45deg, #f43f3b, #ec008c)',

  before_color_2: 'rgb(131, 123, 199)',
  after_color_2: 'linear-gradient(45deg, #f43f3b, #ec008c)',

  sortColor: ['linear-gradient(to right, #358bff, #15c6ff)',
    'linear-gradient(to right, #18e7ae, #1eebeb)',
    'linear-gradient(to right, #ff6655, #ffbf37)',
    'linear-gradient(120deg, rgba(255, 39, 232, 1) 0%, rgba(255, 128, 0, 1) 100%)',
    'linear-gradient(120deg, rgba(91, 39, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)'
  ],

  pageColor: '#ee7752',
  commentPageColor: '#23d5ab',
  userId: 1,
  source: 0,

  // emojiList: ['衰', '鄙视', '再见', '捂嘴', '摸鱼', '奋斗', '白眼', '可怜', '皱眉', '鼓掌', '烦恼', '吐舌', '挖鼻', '委屈', '滑稽', '啊这', '生气', '害羞', '晕', '好色', '流泪', '吐血', '微笑', '酷', '坏笑', '吓', '大兵', '哭笑', '困', '呲牙']
  emojiList: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '😮‍', '🤥', '🙂‍', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️‍', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💋', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💤'],

  corporationItemHeight: 135,
  corporationItemMoreFetchRowCount: 4,
  corporationItemDefaultFetchRowCount: 8,


  DarkMode: {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
  },

  menuItems: [
    {
      title: '首页',
      path: '/',
    },
    {
      title: '面试经验',
      path: '/sort/1',
    },
    {
      title: '工作体验',
      path: '/sort/2',
    },
    {
      title: '技术分享',
      path: '/sort/3',
    },
    {
      title: '关于',
      path: '/about',
    },
  ],

  ArticleType: {
    INTERVIEW: '1',
    WORK: '2',
    SHARE: '3',
  },
};
