<template>
  <div>
    <div v-if="!$common.isEmpty(recommendArticles)"
         class="recommend-article-list-container">
      <div class="recommend-article-list__title">
        <SvgIcon name="recommend" :size="20" style="margin-top: 1.5px;" />
        <span>推荐文章</span>
      </div>
      <div class="recommend-article-list__content">
        <div class="recommend-article-list-item" v-for="article in recommendArticles" :key="article.id">
          <div class="recommend-article-title">
            <router-link :to="{ path: `/article/${article.id}` }">
              <span>{{ article.articleTitle }}</span>
            </router-link>
          </div>

          <div class="recommend-article-info">
            <div class="recommend-article-info-item">
              <SvgIcon name="user" :size="13" style="margin-top: 1px" />
              <span>{{ article.username }}</span>
            </div>
            <div class="recommend-article-info-item">
              <SvgIcon name="date" :size="13" />
              <span>{{ article.date }}</span>
            </div>
          </div>

          <div class="recommend-article-label">
            <router-link :to="{ path: `/sort/${article.sortId}` }" style="text-decoration: none;color: inherit">
              <div class="recommend-article-label-item">
                <SvgIcon name="edit" :size="14" />
                <span>{{ article.sort.sortName }}</span>
              </div>
            </router-link>
            <router-link v-show="!checkIsShareBlog(article.sortId)" :to="{ path: `/corporation/${article.corporationId}` }" style="text-decoration: none;color: inherit">
              <div class="recommend-article-label-item">
                <SvgIcon name="corporation" :size="13" />
                <span>{{ article.corporationTitle }}</span>
              </div>
            </router-link>
            <router-link v-show="!checkIsShareBlog(article.sortId)" :to="{ path: `/sortCorporation/${article.sortCorporationId}` }" style="text-decoration: none;color: inherit">
              <div class="recommend-article-label-item">
                <SvgIcon name="label" :size="13" style="margin-top: 1px" />
                <span>{{ article.sortCorporationName }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SvgIcon = () => import( '../icon/index.vue');
import { getRecommendArticles } from '@/utils/data/article';
import { checkIsShareBlog } from "@/utils/helper";

export default {
  components: {
    SvgIcon,
  },

  data() {
    return {
      pagination: {
        current: 1,
        size: 5,
        recommendStatus: true
      },
      recommendArticles: [],
    };
  },
  created() {
    this.getRecommendArticles();
  },
  methods: {
    getRecommendArticles() {
      this.recommendArticles = getRecommendArticles(5);
    },
    checkIsShareBlog,
  }
};
</script>

<style scoped lang="less">
.recommend-article-list-container {
  background: var(--content-background-color);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  animation: hideToShow 1s ease-in-out;

  .recommend-article-list__title {
    height: 60px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    line-height: 30px;
    padding: 15px;
    color: var(--theme-green);
    font-weight: bold;
  }
}

.recommend-article-list-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 15px 20px;
  border-top: 1px dashed var(--list-item-border);

  .recommend-article-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .recommend-article-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: var(--grey-content);

    &-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .recommend-article-label {
    display: flex;
    align-items: center;
    gap: 12px;

    &-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 5px;
      background-color: var(--label-background);
      border-radius: 3px;
      font-size: 12px;
      color: var(--grey-content);
      transition: all 0.3s;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: var(--theme-green);
        color: var(--white);
      }
    }
  }
}



.post-sort {
  border-radius: 1rem;
  margin-bottom: 15px;
  line-height: 30px;
  transition: all 0.3s;
}

.post-sort:hover {
  background: var(--themeBackground);
  padding: 2px 15px;
  cursor: pointer;
  color: var(--white);
}

.sort-name {
  font-weight: bold;
  font-size: 25px;
  margin-top: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sort-name:after {
  top: 74px;
  width: 22px;
  left: 26px;
  height: 2px;
  background: var(--white);
  content: "";
  border-radius: 1px;
  position: absolute;
}

.admire-box {
  background: var(--springBg) center center / cover no-repeat;
  padding: 25px;
  border-radius: 10px;
  animation: hideToShow 1s ease-in-out;
}

.admire-btn {
  padding: 13px 15px;
  background: var(--maxLightRed);
  border-radius: 3rem;
  color: var(--white);
  width: 100px;
  user-select: none;
  cursor: pointer;
  text-align: center;
  margin: 20px auto 0;
  transition: all 1s;
}

.admire-btn:hover {
  transform: scale(1.2);
}

.admire-image {
  margin: 0 auto 10px;
  border-radius: 10px;
  height: 150px;
  width: 150px;
  background: var(--admireImage) center center / cover no-repeat;
}

.admire-content {
  font-size: 12px;
  color: var(--maxGreyFont);
  line-height: 1.5;
  margin: 5px;
}

.ais-SearchBox-input {
  padding: 0 14px;
  height: 30px;
  width: calc(100% - 50px);
  outline: 0;
  border: 2px solid var(--lightGreen);
  border-right: 0;
  border-radius: 40px 0 0 40px;
  color: var(--maxGreyFont);
  background: var(--white);
}

.ais-SearchBox-submit {
  height: 30px;
  width: 50px;
  border: 2px solid var(--lightGreen);
  border-left: 0;
  border-radius: 0 40px 40px 0;
  background: var(--white);
  cursor: pointer;
}

.hasVideo {
  padding: 2px 10px 0;
  background: var(--maxMaxWhiteMask);
  border-radius: 6px;
}
</style>
