<template>
  <div>
    <loader :loading="loading">
      <!-- 加载页面 -->
      <template slot="loader">
        <div>
          <zombie></zombie>
        </div>
      </template>
      <!-- 内容页面 -->
      <template slot="body">
        <!-- 首页内容 -->
        <div class="page-container-wrap">
          <!-- 介绍与搜索内容 -->
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
                         v-model="corporationSearch"
                         placeholder="搜索公司" maxlength="32">
                  <div class="ais-SearchBox-submit" @click="selectCorporation()">
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
            <div class="recent-posts">
              <!-- 公告 -->
              <div class="announcement background-opacity">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
                <div>
                  <div v-for="(notice, index) in $common.pushNotification($store.state.webInfo.notices, true)" :key="index">
                    {{ notice }}
                  </div>
                </div>
              </div>

              <div v-show="indexType === 1">
                <div v-for="(sortCorporation, index) in sortCorporationInfo" :key="index">
                  <div v-if="!$common.isEmpty(sortCorporations[sortCorporation.id])">
                    <div class="sort-corporation-first">
                      <router-link :to="{ path: `/sortCorporation/${sortCorporation.id}` }"
                           class="corporation-more">
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             style="vertical-align: -2px;margin-bottom: -2px">
                          <path
                            d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z"
                            fill="#FF623E"></path>
                        </svg>
                        {{sortCorporation.sortName}}
                      </router-link>
                      <router-link :to="{ path: `/sortCorporation/${sortCorporation.id}` }"
                           class="corporation-more">
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             style="vertical-align: -2px;margin-bottom: -2px">
                          <path
                            d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z"
                            fill="#009F72"></path>
                          <path
                            d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z"
                            fill="#F9DB88"></path>
                        </svg>
                        MORE
                      </router-link>
                    </div>
                    <sortCorporation :corporationList="sortCorporations[sortCorporation.id]"></sortCorporation>
                  </div>
                </div>
              </div>

              <div v-show="indexType === 2">
                <corporationList :corporationList="corporations"></corporationList>
                <div class="pagination-wrap">
                  <div @click="pageCorporations()" class="pagination" v-if="pagination.total !== corporations.length">
                    下一页
                  </div>
                  <div v-else style="user-select: none">
                    ~~到底啦~~
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 页脚 -->
<!--        <div style="background: var(&#45;&#45;background)">-->
<!--          <myFooter></myFooter>-->
<!--        </div>-->
      </template>
    </loader>
  </div>
</template>

<script>
  const loader = () => import( "./common/loader");
  const zombie = () => import( "./common/zombie");
  const corporationList = () => import( "./corporationList");
  const sortCorporation = () => import( "./common/sortCorporation");
  const myFooter = () => import( "./common/myFooter");

  export default {
    components: {
      loader,
      zombie,
      corporationList,
      sortCorporation,
      myFooter
    },

    data() {
      return {
        pushDialogVisible: false,
        push: {},
        loading: false,
        showAside: true,
        indexType: 1,
        pagination: {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: null,
          corporationSearch: ""
        },
        corporationSearch: "",
        corporations: [],
        sortCorporations: {}
      };
    },

    watch: {},

    created() {
      this.getSortCorporations();
    },

    computed: {
      sortCorporationInfo() {
        return this.$store.state.sortCorporationInfo;
      }
    },

    mounted() {
      setTimeout(() => {
        this.push = this.$common.pushNotification(this.$store.state.webInfo.notices, false);
        if(!this.$common.isEmpty(this.push)) {
          if("0" !== localStorage.getItem("showPushNotification_" + this.push['链接'])) {
            this.pushDialogVisible = true;
            localStorage.setItem("showPushNotification_" + this.push['链接'], "0");
          }
        }
      }, 2000);
    },

    methods: {
      async selectSort(sort) {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: sort.id,
          corporationSearch: ""
        };
        this.corporations = [];
        await this.getCorporations();
        this.$nextTick(() => {
          this.indexType = 2;
          $(".announcement").css("max-width", "780px");
          document.querySelector('.recent-posts').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        });
      },
      selectCorporation() {
        this.$emit("selectArticle", this.corporationSearch);
      },
      // async selectCorporation(corporationSearch) {
      //   this.pagination = {
      //     current: 1,
      //     size: 10,
      //     total: 0,
      //     searchKey: "",
      //     sortId: null,
      //     corporationSearch: corporationSearch
      //   };
      //   this.corporations = [];
      //   await this.getCorporations();
      //   this.$nextTick(() => {
      //     this.indexType = 2;
      //     $(".announcement").css("max-width", "780px");
      //     document.querySelector('.recent-posts').scrollIntoView({
      //       behavior: "smooth",
      //       block: "start",
      //       inline: "nearest"
      //     });
      //   });
      // },
      pageCorporations() {
        this.pagination.current = this.pagination.current + 1;
        this.getCorporations();
      },

      async getCorporations() {
        await this.$http.post(this.$constant.baseURL + "/corporation/listCorporation", this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.corporations = this.corporations.concat(res.data.records);
              this.pagination.total = res.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getSortCorporations() {
        this.$http.get(this.$constant.baseURL + "/corporation/listSortCorporation")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.sortCorporations = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      navigation(selector) {
        let pageId = document.querySelector(selector);
        window.scrollTo({
          top: pageId.offsetTop,
          behavior: "smooth"
        });
      },
      pushUrl(url) {
        window.open(url);
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

  .playful {
    color: var(--white);
    font-size: 40px;
  }

  .sort-corporation-first {
    margin: 40px auto 20px;
    display: flex;
    justify-content: space-between;
    color: var(--greyFont);
    border-bottom: 1px dashed var(--lightGray);
    padding-bottom: 5px;
  }

  .corporation-more {
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    color: inherit;
  }

  .corporation-more:hover {
    color: var(--lightGreen);
  }

  /* 光标 */
  .cursor {
    margin-left: 1px;
    animation: hideToShow 0.7s infinite;
    font-weight: 200;
  }

  .el-icon-arrow-down {
    font-size: 40px;
    font-weight: bold;
    color: var(--white);
    position: absolute;
    bottom: 60px;
    animation: my-shake 1.5s ease-out infinite;
    z-index: 15;
    cursor: pointer;
  }

  .page-container-wrap {
    background: var(--background);
    position: relative;
  }

  .page-container {
    display: flex;
    justify-content: center;
    width: 90%;
    padding: 0 20px 40px 20px;
    margin: 0 auto;
    flex-direction: row;
  }

  .recent-posts {
    width: 100%;
  }

  .announcement {
    padding: 10px;
    border: 1px dashed var(--lightGray);
    color: var(--greyFont);
    border-radius: 10px;
    display: flex;
    margin: 20px auto 20px;
  }

  .announcement i {
    color: var(--themeBackground);
    font-size: 22px;
    margin: auto 0;
  }

  .announcement div div {
    margin-left: 20px;
    line-height: 30px;
  }

  .aside-content {
    width: calc(30% - 40px);
    user-select: none;
    margin-top: 40px;
    margin-right: 40px;
    max-width: 300px;
    float: right;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .pagination {
    padding: 13px 15px;
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

  .push-title {
    font-weight: bold;
    font-size: 20px;
  }

  .push-el-image {
    width: 80%;
    min-height: 100px;
    max-height: 400px;
    border-radius: 15px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .push-button {
    position: relative;
    background: var(--lightGreen);
    cursor: pointer;
    width: 230px;
    border-radius: 2rem;
    line-height: 35px;
    color: var(--white);
  }

  .push-button-title {
    margin-left: 20px;
    font-weight: bold;
  }

  .push-button-car {
    position: absolute;
    margin-left: 55px;
    animation: passing 4s linear infinite;
  }

  @media screen and (max-width: 1100px) {
    .recent-posts {
      width: 100%;
    }

    .page-container {
      width: 100%;
    }
  }

  @media screen and (max-width: 1000px) {

    .page-container {
      /* 文章栏与侧标栏垂直排列 */
      flex-direction: column;
    }

    .aside-content {
      width: 100%;
      max-width: unset;
      float: unset;
      margin: 40px auto 0;
    }
  }

  @media screen and (max-width: 768px) {

    h1 {
      font-size: 35px;
    }
  }
</style>
