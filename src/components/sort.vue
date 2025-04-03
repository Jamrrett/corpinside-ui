<template>
  <div>
    <div style="background: var(--background)" class="my-animation-hideToShow">
      <div class="introduce-search-container">
        <div class="introduce-search-box" style="color: var(--white)">
          <div class="logo-content" style="width: 15%;padding-left: 3%">
            <h2>
              <span v-for="(a, index) in $store.state.webInfo.webTitle" :key="index">{{a}}</span>
            </h2>
          </div>
          <div class="word-content" style="width: 55%">
            <h3>
              <span>公司级分类，寻找真实的面试经验、工作体验</span>
            </h3>
          </div>
          <div class="search-content" style="width: 30%;padding-right: 3%">
            <div style="display: flex">
              <input class="ais-SearchBox-input" type="text"
                     v-model="articleSearch"
                     placeholder="搜索文章" maxlength="32">
              <div class="ais-SearchBox-submit" @click="selectArticle()">
                <svg style="margin-top: 5.5px;margin-left: 18px" viewBox="0 0 1024 1024" width="20" height="20">
                  <path
                    d="M51.2 508.8c0 256.8 208 464.8 464.8 464.8s464.8-208 464.8-464.8-208-464.8-464.8-464.8-464.8 208-464.8 464.8z"
                    fill="#51C492"></path>
                  <path
                    d="M772.8 718.4c48-58.4 76.8-132.8 76.8-213.6 0-186.4-151.2-337.6-337.6-337.6-186.4 0-337.6 151.2-337.6 337.6 0 186.4 151.2 337.6 337.6 337.6 81.6 0 156-28.8 213.6-76.8L856 896l47.2-47.2-130.4-130.4zM512 776c-149.6 0-270.4-121.6-270.4-271.2S363.2 233.6 512 233.6c149.6 0 271.2 121.6 271.2 271.2C782.4 654.4 660.8 776 512 776z"
                    fill="#FFFFFF"></path>
                </svg>
              </div>
              <div class="ais-SearchBox-button" @click="selectCorporation()">
                搜索
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-container">
      <!-- 文章 -->
        <div class="article-wrap">
          <articleList :articleList="articles" :sortName="sort.sortName"></articleList>
          <div class="pagination-wrap">
            <div @click="pageArticles()" class="pagination" v-if="pagination.total !== articles.length">
              下一页
            </div>
  <!--          <div v-else style="user-select: none">-->
  <!--            ~~到底啦~~-->
  <!--          </div>-->
          </div>
        </div>

        <div style="width: 25%;margin-top: 25px">
          <articleAside></articleAside>
        </div>
      </div>
      <!-- 页脚 -->
<!--      <myFooter></myFooter>-->
    </div>
  </div>
</template>

<script>
  const articleList = () => import( "./articleList");
  const articleAside = () => import( "./articleAside");

  export default {
    components: {
      articleList,
      articleAside
    },

    data() {
      return {
        sortId: this.$route.params.sortId,
        corporationId: this.$route.query.corporationId,
        sort: null,
        pagination: {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: this.$route.params.sortId,
          corporationId: this.$route.query.corporationId
        },
        articles: [],
        articleSearch: ""
      }
    },

    computed: {},

    watch: {
      $route() {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: this.$route.params.sortId,
          corporationId: this.$route.query.corporationId
        };
        this.articles.splice(0, this.articles.length);
        this.sortId = this.$route.params.sortId;
        this.corporationId = this.$route.query.corporationId;
        this.getSort();
        this.getArticles();
      }
    },

    created() {
      this.getSort();
      this.getArticles();
    },

    mounted() {
    },

    methods: {
      selectArticle() {
        this.$emit("selectArticle", this.articleSearch);
      },
      pageArticles() {
        this.pagination.current = this.pagination.current + 1;
        this.getArticles();
      },

      getSort() {
        let sortInfo = this.$store.state.sortInfo;
        if (!this.$common.isEmpty(sortInfo)) {
          let sortArray = sortInfo.filter(f => {
            return f.id === parseInt(this.sortId);
          });
          if (!this.$common.isEmpty(sortArray)) {
            this.sort = sortArray[0];
          }
        }
      },
      // listArticle(label) {
      //   this.labelId = label.id;
      //   this.pagination = {
      //     current: 1,
      //     size: 10,
      //     total: 0,
      //     searchKey: "",
      //     sortId: this.$route.query.sortId,
      //     labelId: label.id
      //   };
      //   this.articles.splice(0, this.articles.length);
      //   this.$nextTick(() => {
      //     this.getArticles();
      //   });
      // },
      getArticles() {
        this.$http.post(this.$constant.baseURL + "/article/listArticle", this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              console.log(res.data);
              this.articles = this.articles.concat(res.data.records);
              this.pagination.total = res.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      }
    }
  }
</script>

<style scoped>

  .introduce-search-container {
    /* 向下排列 */
    display: flex;
    flex-direction: row;
    cursor: default;
    width: 90%;
    padding: 30px 20px 0 20px;
    margin: 0 auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .introduce-search-box {
    background: linear-gradient(-45deg, #87CEFA, #eec1ea, #bdbdf0);
    /*background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);*/
    /*animation: gradientBG 10s ease infinite;*/
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .ais-SearchBox-input {
    padding: 0 14px;
    height: 35px;
    width: calc(100% - 50px);
    outline: 0;
    border: 2px solid var(--lightGreen);
    border-right: 0;
    border-radius: 15px 0 0 15px;
    color: var(--maxGreyFont);
    background: var(--white);
  }

  .ais-SearchBox-submit {
    height: 35px;
    width: 50px;
    border: 2px solid var(--lightGreen);
    border-left: 0;
    border-radius: 0 15px 15px 0;
    background: var(--white);
    cursor: pointer;
    margin-right: 5px;
  }

  .ais-SearchBox-button {
    display: flex;
    height: 35px;
    width: 60px;
    border-radius: 15px;
    cursor: pointer;
    color: var(--white);
    font-size: 14px;
    font-weight: bold;
    background-color: var(--lightGreen);
    justify-content: center;
    align-items: center;
  }

  .sort-warp {
    width: 70%;
    max-width: 780px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .page-container {
    width: 90%;
    background: var(--background);
    margin: 0 auto;
    display: flex;
    padding: 0 20px 20px 20px;
  }

  .article-wrap {
    width: 75%;
    margin: 25px 10px 0 0;
  }

  .isActive {
    animation: scale 1.5s ease-in-out infinite;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination {
    padding: 10px 15px;
    border: 1px solid var(--lightGray);
    border-radius: 3rem;
    color: var(--greyFont);
    width: 100px;
    user-select: none;
    cursor: pointer;
    text-align: center;
  }

  .pagination:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }


  @media screen and (max-width: 900px) {
    .sort-warp {
      width: 90%;
    }

    .article-wrap {
      width: 90%;
    }
  }
</style>
