<template>
  <div v-if="!$common.isEmpty(articleList)" class="article-list-container">
    <router-link
      :to="{ path: `/article/${article.id}` }"
      class="article-list-item wow my-animation-hideToShow"
      v-for="(article, index) in articleList"
      :key="index"
    >
      <div class="article-list-item__title">
        <router-link :to="{ path: `/article/${article.id}` }">
          <span>{{ article.articleTitle }}</span>
        </router-link>
      </div>

      <div class="article-list-item__footer">
        <!-- 信息 -->
        <div class="article-list-item__footer-info">
          <div class="article-list-item__footer-info-item">
            <SvgIcon name="user" :size="14" />
            <span>{{ article.username }}</span>
          </div>
          <div class="article-list-item__footer-info-item">
            <SvgIcon name="date" :size="14" />
            <span>{{ article.date }}</span>
          </div>
        </div>
      </div>

      <div class="article-list-item__content">
        <router-link :to="{ path: `/article/${article.id}` }">
            <span class="article-list-item__content-inner">
                <span
                  class="article-list-item__content-paragraph"
                  v-for="(paragraph, index) in extractText(article.articleContent)"
                  :key="index"
                >
                  {{ paragraph }}
                </span>
            </span>
        </router-link>
      </div>
    </router-link>
  </div>
</template>

<script>
const SvgIcon = () => import( '@/components/icon');
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default {
  components: {
    SvgIcon,
  },
  props: {
    articleList: {
      type: Array
    }
  },
  methods: {
    extractText(markdownContent) {
      const articleContentHtml = md.render(markdownContent);

      const div = document.createElement('div');
      div.innerHTML = articleContentHtml;
      const paragraphs = div.textContent.split('\n').filter(paragraph => paragraph.trim() !== '');

      const paragraphsWithInfo = paragraphs.map((paragraph, index) => ({
        index,
        text: paragraph,
        length: paragraph.length
      }));
      paragraphsWithInfo.sort((a, b) => b.length - a.length);
      const topTwo = paragraphsWithInfo.slice(0, 1);
      topTwo.sort((a, b) => a.index - b.index);
      return topTwo.map(item => item.text);
    },
  }
};
</script>

<style scoped lang="less">
.article-list-container {
  display: flex;
  flex-wrap: wrap;
}

.article-list-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 15px 15px 12px;
  user-select: none;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
  flex-shrink: 0;
  width: calc(100% - 20px);
  cursor: pointer;
  background-color: var(--content-background-color-light);
  box-shadow: 0 1px 10px -6px var(--borderColor);

  &__title {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .article-list-item__content {
    &-inner {
      font-size: 14px;
      line-height: 1.7;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    &-paragraph {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .article-list-item__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;

    &-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: var(--grey-content);

      &-item {
        display: flex;
        align-items: center;
        gap: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.article-list-item:hover {
  box-shadow: var(--hover-box-shadow);
}

.article-list-item-content {
  width: 100%;
  height: 100%;
  padding: 10px 15px;
}

.article-list-item-content h3 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 15px;
  margin-bottom: 15px;
}

.post-meta {
  font-size: 12px;
  color: var(--grey-content);
}

.recent-post-desc {
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.sort-label {
  position: absolute;
  bottom: 10px;
}

.sort-label span {
  padding: 2px 4px;
  background-color: var(--maxLightGray);
  border-radius: 3px;
  font-size: 14px;
  color: var(--grey-content);
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
}

.sort-label span:hover {
  background-color: var(--themeBackground);
  color: var(--white);
}

.error-text {
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 4px;
  color: var(--white);
}

.hasVideo {
  padding: 0 20px;
  background: var(--maxMaxWhiteMask);
  border-radius: 15px;
}
</style>
