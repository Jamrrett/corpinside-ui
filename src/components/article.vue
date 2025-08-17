<template>
  <div>
    <div v-if="!$common.isEmpty(article)" id="article-wrapper">
      <div class="article-head">
<!--        <div class="article-head-background" :style="{left: '50%', transform: 'translateX(-50%)'}"></div>-->
        <!-- 文章信息 -->
        <div class="article-info-container">
          <div class="article-title">{{ article.articleTitle }}</div>
          <div class="article-info">
            <div class="article-info-items">
              <div class="article-info-item">
                <SvgIcon name="user" :size="14" />
                <router-link :to="{ path: '/about' }">{{ article.username }}</router-link>
              </div>
              <span>·</span>
              <div class="article-info-item">
                <SvgIcon name="date" :size="14" />
                <span>{{ article.date }}</span>
              </div>
            </div>
            <div class="vertical-line"></div>
            <div class="article-label-items">
              <router-link :to="{ path: `/sort/${article.sortId}` }" class="article-label-item">
                <SvgIcon name="edit" :size="14" />
                <span>{{ article.sort.sortName }}</span>
              </router-link>
              <span v-if="!isShareBlog">·</span>
              <router-link :to="{ path: `/corporation/${article.corporationId}` }" class="article-label-item" v-if="!isShareBlog">
                <SvgIcon name="corporation" :size="14" />
                <span>{{ article.corporationTitle }}</span>
              </router-link>
              <span v-if="!isShareBlog">·</span>
              <router-link :to="{ path: `/sortCorporation/${article.sortCorporationId}` }" class="article-label-item" v-if="!isShareBlog">
                <SvgIcon name="label" :size="14" />
                <span>{{ article.sortCorporationName }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="article-body" id="article-body">
        <div
          id="toc"
          class="toc"
          ref="toc"
          :class="{ 'toc-float': isTocFloat, 'toc-fixed': isFixed && !isTocFloat }"
          :style="{ display: isShowToc ? 'unset' : 'none' }"
        />
        <div
          class="article-container my-animation-hideToShow"
          ref="article-container"
          :style="{ width: isShowToc && !isTocFloat ? 'calc(100% - 300px - 16px)' : '100%' }"
        >
          <!-- 文章内容 -->
          <div v-html="articleContentHtml" class="entry-content"></div>
          <!-- 最后更新时间 -->
          <div class="article-update-time">
            <span>文章最后更新于 {{ article.updateTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tool-button article-toc-button" id="toc-button" @click="clickTocButton()">
      <SvgIcon name="toc" :size="19" />
    </div>

  </div>
</template>

<script>
const SvgIcon = () => import( './icon');
import MarkdownIt from 'markdown-it';
import { getArticleById } from "@/utils/data/article";
import { getSortInfoById } from "@/utils/data/sort";
import { checkIsShareBlog } from "@/utils/helper";

export default {
  components: {
    SvgIcon,
  },

  data() {
    return {
      id: this.$route.params.id,
      subscribe: false,
      article: {},
      articleContentHtml: '',
      treeHoleList: [],
      weiYanDialogVisible: false,
      copyrightDialogVisible: false,
      newsTime: '',
      showPasswordDialog: false,
      password: '',
      tips: '',
      scrollTop: 0,
      upOffsetTop: 0,
      downOffsetTop: 0,
      isFixed: false,
      isShareBlog: false,
      isShowToc: window.innerWidth > 840,
      isTocFloat: window.innerWidth < 840,
    };
  },

  created() {
    if (!this.$common.isEmpty(this.id)) {
      this.getArticle();
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScrollPage);
    window.addEventListener('resize', this.handleResize);
  },

  destroyed() {
    window.removeEventListener('scroll', this.onScrollPage);
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    handleResize() {
      this.isTocFloat = window.innerWidth < 840;
    },
    clickTocButton() {
      this.isShowToc = !this.isShowToc;
    },
    onScrollPage() {
      const docRef = this.$refs['article-container'];
      if (docRef) {
        const rect = docRef.getBoundingClientRect();
        this.isFixed = rect.top <= 80;
      }
    },
    getTocbot() {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.$constant.tocbot;
      document.getElementsByTagName('head')[0].appendChild(script);

      // 引入成功
      script.onload = function () {
        tocbot.init({
          tocSelector: '#toc',
          contentSelector: '.entry-content',
          headingSelector: 'h1, h2, h3, h4, h5',
          scrollSmooth: true,
          fixedSidebarOffset: 'auto',
          scrollSmoothOffset: -75,
          headingsOffset: -150,
          hasInnerContainers: false
        });
      };
      if (this.$common.mobile()) {
        $('.toc').css('display', 'none');
      }
    },
    addId() {
      let headings = $('.entry-content').find('h1, h2, h3, h4, h5, h6');
      let idMap = {}; // 用于记录每个ID出现的次数
      headings.each((i, el) => {  // 使用 each() 而不是 attr()
        let text = $(el).text().trim();
        let baseId = text.replace(/[^\w\u4e00-\u9fa5]/g, '')
          .replace(/\s+/g, '_')
          .toLowerCase() || 'heading';

        if (idMap[baseId] === undefined) {
          idMap[baseId] = 0;
        } else {
          idMap[baseId]++;
          baseId += '_' + idMap[baseId]; // 添加后缀
        }

        $(el).attr('id', baseId);  // 单独设置 id
      });
      // headings.attr('id', (i, id) => id || 'toc-' + i);
    },
    getArticle() {
      this.article = getArticleById(this.id);
      this.isShareBlog = checkIsShareBlog(this.article.sortId);
      this.article.sort = getSortInfoById(this.article.sortId);
      // this.getNews();
      const md = new MarkdownIt({breaks: true}).use(require('markdown-it-multimd-table'));
      this.articleContentHtml = md.render(this.article.articleContent);
      // this.articleContentHtml = this.article.articleContent;
      this.$nextTick(() => {
        this.$common.imgShow('.entry-content img');
        this.highlight();
        this.addId();
        this.getTocbot();
      });
    },
    highlight() {
      let attributes = {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
        contenteditable: 'false'
      };

      $('pre').each(function (i, item) {
        let preCode = $(item).children('code');
        let classNameStr = preCode[0].className;
        let classNameArr = classNameStr.split(' ');

        let lang = '';
        classNameArr.some(function (className) {
          if (className.indexOf('language-') > -1) {
            lang = className.substring(className.indexOf('-') + 1, className.length);
            return true;
          }
        });

        // 检测语言是否存在，不存在则自动检测
        let language = hljs.getLanguage(lang.toLowerCase());
        if (language === undefined) {
          // 启用自动检测
          let autoLanguage = hljs.highlightAuto(preCode.text());
          preCode.removeClass('language-' + lang);
          lang = autoLanguage.language;
          if (lang === undefined) {
            lang = 'java';
          }
          preCode.addClass('language-' + lang);
        } else {
          lang = language.name;
        }

        $(item).addClass('highlight-wrap');
        $(item).attr(attributes);
        preCode.attr('data-rel', lang.toUpperCase()).addClass(lang.toLowerCase());
        // 启用代码高亮
        hljs.highlightBlock(preCode[0]);
        // 启用代码行号
        hljs.lineNumbersBlock(preCode[0]);
      });

      $('pre code').each(function (i, block) {
        $(block).attr({
          id: 'hljs-' + i,
        });

        $(block).after(
          '<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' +
            i +
            '"><i class="fa fa-clipboard" aria-hidden="true"></i></a>'
        );
        new ClipboardJS('.copy-code');
      });

      if ($('.entry-content').children('table').length > 0) {
        $('.entry-content')
          .children('table')
          .wrap('<div class=\'table-wrapper\'></div>');
      }
    }
  }
};
</script>

<style scoped lang="less">
.article-head {
  position: relative;
  width: 90%;
  padding: 25px 0 0;
  margin: auto;
}

.article-info-container {
  height: 100%;
  width: 100%;
  position: relative;
  will-change: transform;
  contain: content;
  background: linear-gradient(-45deg, var(--theme-blue), var(--theme-pink), var(--theme-purple));
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white-content);

  .article-title {
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    padding: 24px 36px 12px;
  }

  .article-info {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 20px;

    .article-info-items, .article-label-items {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .article-info-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px;
      font-size: 14px;
    }

    .article-label-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      margin: 0 2px;
      font-size: 14px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 1px 1px 4px rgba(200, 200, 200, 0.2);
      transition: all 0.3s;
    }

    .article-label-item:hover {
      background-color: var(--theme-green);
      cursor: pointer;
    }

    .vertical-line {
      border-left: 1px solid var(--white-content);
      border-right: 1px solid var(--white-content);
      height: 16px;
      margin: 0 4px;
    }
  }
}

.article-body {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 0;
}

.article-container {
  width: calc(100% - 300px - 16px);
  margin-left: auto;
  margin-bottom: 30px;
  padding: 0 30px;
  right: 0;
  background-color: var(--content-background-color);
  border-radius: 10px;
}

.article-update-time {
  color: var(--grey-content);
  font-size: 12px;
  margin: 20px 0;
  user-select: none;
}

@media screen and (max-width: 840px) {
  .toc {
    display: none;
  }

  .article-container {
    width: 100%;
  }

  .article-head {
    .article-title {
      font-size: 30px;
      padding: 20px 30px 10px;
    }

    .article-info {
      margin-bottom: 16px;
    }
  }
}

@media screen and (max-width: 640px) {
  .article-head {
    .article-title {
      padding: 16px 20px 6px;
    }

    .article-info {
      margin-bottom: 12px;
      flex-direction: column;

      .vertical-line {
        display: none;
      }
    }
  }
}

</style>
