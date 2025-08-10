<template>
  <div class="article-list-container">
    <div class="article-list-header">
      <div class="article-list-header__title">
        <SvgIcon name="edit" :size="20" />
        <span>&thinsp;{{ sortName }}</span>
      </div>
      <div class="article-edit" style="display: flex;flex-direction: column;justify-content: center">
        <el-button icon="el-icon-plus" class="add-article-button" @click="handleAdd">发布</el-button>
      </div>
    </div>
    <div v-if="!$common.isEmpty(articleList)">
      <div class="article-list-content" v-for="article in articleList" :key="article.id">
        <div class="article-list-item">
          <div class="article-list-item__title">
            <router-link :to="{ path: `/article/${article.id}` }">
              <span>{{ article.articleTitle }}</span>
            </router-link>
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
            <div class="article-list-item__footer-label" v-if="!checkIsShareBlog(article.sortId)">
              <router-link :to="{ path: `/corporation/${article.corporationId}` }">
                <div class="article-list-item__footer-label-item">
                  <SvgIcon name="corporation" :size="14" />
                  <span>{{ article.corporationTitle }}</span>
                </div>
              </router-link>
              <router-link :to="{ path: `/sortCorporation/${article.sortCorporationId}` }">
                <div class="article-list-item__footer-label-item">
                  <SvgIcon name="label" :size="14" />
                  <span>{{ article.sortCorporationName }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <el-empty description="暂无文章"></el-empty>
    </div>
  </div>
</template>

<script>
const SvgIcon = () => import( '@/components/icon');
import MarkdownIt from 'markdown-it';
import { checkIsShareBlog } from "@/utils/helper";

const md = new MarkdownIt();
// md.renderer.rules.heading_open = () => '';
// md.renderer.rules.heading_close = () => '';
// md.renderer.rules.fence = () => '';
// md.renderer.rules.code_block = () => '';

export default {
  components: {
    SvgIcon,
  },
  props: {
    articleList: {
      type: Array
    },
    sortName: {
      type: String
    }
  },
  methods: {
    handleAdd() {
      const route = this.$router.resolve({
        path: '/articleEdit'
      });
      window.location.assign(route.href);
    },
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
      const topTwo = paragraphsWithInfo.slice(0, 2);
      topTwo.sort((a, b) => a.index - b.index);
      return topTwo.map(item => item.text);
    },
    checkIsShareBlog,
  }
};
</script>

<style scoped lang="less">
.article-list-container {
  max-width: 1280px;
  background: var(--content-background-color);
  border-radius: 10px;

  .article-list-header {
    height: 60px;
    color: var(--grey-content);
    padding: 15px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__title {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 20px;
      line-height: 30px;
    }
  }
}

.add-article-button {
  padding: 10px 12px;
  border-radius: 20px;
  background-color: var(--theme-green);
  color: white;
  border: none;

  &:hover {
    background: var(--theme-green-hover);
  }

  &:active {
    background: var(--theme-green-active);
  }
}



.article-list-content {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  text-decoration: none; /* 移除下划线 */
  color: inherit;
  animation: hideToShow 1s ease-in-out;
  border-top: 1px dashed var(--list-item-border);
}

.article-list-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 35px 15px;

  &__title {
    width: 90%;
    font-size: 20px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .article-list-item__content {
    &-inner {
      font-size: 15px;
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

    &-info {
      display: flex;
      align-items: center;
      gap: 18px;
      font-size: 13px;
      color: var(--grey-content);

      &-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }

    &-label {
      display: flex;
      align-items: center;
      gap: 12px;

      &-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 3px 8px;
        background-color: var(--label-background);
        border-radius: 3px;
        font-size: 12px;
        color: var(--grey-content);
        transition: all 0.3s;
        cursor: pointer;
        user-select: none;
      }

      &-item:hover {
        background-color: var(--theme-green);
        color: var(--white);
      }
    }

  }
}

@media screen and (max-width: 520px) {
  .article-list-item {
    padding: 15px 20px 15px;
    gap: 6px;
  }

  .article-list-item__footer {
    align-items: start !important;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
