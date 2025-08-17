<template>
  <div>
    <div class="page-container-wrapper">
      <IntroduceSearchHeader />
      <div class="page-container">
        <div class="left-container">
          <ArticleList :articleList="articles" :sortName="sort.sortName"></ArticleList>
          <div class="pagination-wrapper">
            <div @click="pageArticles()" class="pagination" v-if="pagination.total !== articles.length">
              下一页
            </div>
          </div>
        </div>

        <div class="right-container">
          <RecommendArticle />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const IntroduceSearchHeader = () => import( './common/introduce-search-header');
const ArticleList = () => import( './articleList');
const RecommendArticle = () => import( './common/recommend-article');
import { getArticlesBySortId } from '@/utils/data/article';

export default {
  components: {
    IntroduceSearchHeader,
    ArticleList,
    RecommendArticle,
  },

  data() {
    return {
      sortId: this.$route.params.sortId,
      corporationId: this.$route.query.corporationId,
      departmentId: this.$route.query.departmentId,
      sort: {},
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        sortId: this.$route.params.sortId,
      },
      articles: [],
    };
  },

  watch: {
    $route() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        searchKey: '',
        sortId: this.$route.params.sortId,
      };
      this.articles.splice(0, this.articles.length);
      this.sortId = this.$route.params.sortId;
      this.corporationId = this.$route.query.corporationId;
      this.departmentId = this.$route.query.departmentId;
      this.getSort();
      this.getArticles();
    }
  },

  created() {
    this.getSort();
    this.getArticles();
  },

  methods: {
    pageArticles() {
      this.pagination.current = this.pagination.current + 1;
      this.getArticles();
    },

    getSort() {
      let sortInfo = this.$store.state.sortInfo;
      if (!this.$common.isEmpty(sortInfo)) {
        let sortArray = sortInfo.filter(f => {
          return f.id === this.sortId;
        });
        if (!this.$common.isEmpty(sortArray)) {
          this.sort = sortArray[0];
        }
      }
    },
    getArticles() {
      const res = getArticlesBySortId(this.$route.params.sortId, this.pagination, this.corporationId, this.departmentId);
      this.articles = this.articles.concat(res.data);
      this.pagination.total = res.total;
    }
  }
};
</script>
