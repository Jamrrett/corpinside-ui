<template>
  <div>
    <div class="user-header-container">
      <div class="user-header-top">
        <el-avatar
          :size="90"
          :src="user.avatar"
          shape="square"
          style="margin: 0 30px 0 20px;border-radius: 20px;user-select: none"
        />
        <div class="user-header-content">
          <div class="user-name">{{ user.username }}</div>
          <div class="user-email">邮箱：{{ user.email }}</div>
          <div class="user-introduction">简介：{{ user.introduction }}</div>
        </div>
      </div>
    </div>

    <div class="page-container">
      <div class="content-container">
        <div class="user-article">
          <div class="article-list-header">
            <div class="article-list-header__title">
              <SvgIcon name="edit" :size="20" />
              <span>{{ isCurrentUser ? "我的文章" : "Ta的文章" }}</span>
            </div>
            <div class="article-edit" v-if="isCurrentUser">
              <el-button icon="el-icon-plus" class="add-article-button" @click="handleAdd">发布</el-button>
            </div>
          </div>
          <div v-if="$common.isEmpty(articleList)">
            <div style="display: flex;flex-direction: column;align-items: center;margin: 83px 0 85px">
              <div style="font-size: 20px">暂无文章</div>
              <el-button v-if="isCurrentUser" style="margin-top: 20px" @click="handleAdd">发布文章</el-button>
            </div>
          </div>
          <div v-else class="article-list-content" v-for="article in articleList" :key="article.id">
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
                    <SvgIcon name="date" :size="14" />
                    <span>{{ article.date }}</span>
                  </div>
                </div>
                <div class="article-list-item__footer-label">
                  <router-link :to="{ path: `/sort/${article.sortId}` }">
                    <div class="article-list-item__footer-label-item">
                      <SvgIcon name="edit" :size="14" />
                      <span>{{ $store.state.sortInfo.find(item => item.id === article.sortId).sortName }}</span>
                    </div>
                  </router-link>
                  <router-link v-if="!checkIsShareBlog(article.sortId)" :to="{ path: `/corporation/${article.corporationId}` }">
                    <div class="article-list-item__footer-label-item">
                      <SvgIcon name="corporation" :size="14" />
                      <span>{{ article.corporationTitle }}</span>
                    </div>
                  </router-link>
                  <router-link v-if="!checkIsShareBlog(article.sortId)" :to="{ path: `/sortCorporation/${article.sortCorporationId}` }">
                    <div class="article-list-item__footer-label-item">
                      <SvgIcon name="label" :size="14" />
                      <span>{{ article.sortCorporationName }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="article-edit" v-if="isCurrentUser" style="display: flex;flex-direction: column;justify-content: center">
              <el-button class="article-edit-button" icon="el-icon-edit" @click="handleEdit(article.id)">编辑</el-button>
            </div>
          </div>
        </div>

        <div class="pagination-wrapper">
          <div @click="pageArticles()" class="pagination" v-if="pagination.total !== articleList.length">
            下一页
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserById} from '@/utils/data/user';
import {listArticle} from '@/utils/data/article';
import { checkIsShareBlog } from "@/utils/helper";
import MarkdownIt from 'markdown-it';
const SvgIcon = () => import( '@/components/icon');
const proButton = () => import( './common/proButton');

const md = new MarkdownIt();

export default {
  components: {
    SvgIcon,
    proButton,
  },
  data() {
    return {
      user: {
        avatar: null,
        username: null
      },
      userForEdit: {
        avatar: null,
        username: null
      },
      currentUser: this.$store.state.currentUser,
      isCurrentUser: false,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        userId: this.$route.params.userId,
      },
      articleList: []
    };
  },
  watch: {
    $route() {
      this.pagination = {
        current: 1,
        size: 10,
        total: 0,
        userId: this.$route.params.userId,
      };
      this.articleList.splice(0, this.articleList.length);
      this.isCurrentUser = this.$route.params.userId === this.$store.state.currentUser.id;
      this.getUserInfo();
      this.getArticles();
    }
  },
  created() {
    this.isCurrentUser = this.$route.params.userId === this.$store.state.currentUser.id;
    this.getUserInfo();
    this.getArticles();
  },
  methods: {
    getUserInfo() {
      if (this.$common.isEmpty(this.$route.params.userId)) {
        this.$message({
          message: '用户不存在！',
          type: 'error'
        });
        return;
      }
      this.user = getUserById(this.$route.params.userId);
      this.userForEdit = getUserById(this.$route.params.userId);
    },
    getArticles() {
      const res = listArticle(this.pagination);
      this.articleList = res.data;
      this.pagination.total = res.total;
    },
    pageArticles() {
      this.pagination.current = this.pagination.current + 1;
      this.getArticles();
    },
    handleAdd() {
      this.$router.push({path: '/articleEdit'});
    },
    handleEdit(id) {
      const route = this.$router.resolve({
        path: '/articleEdit',
        query: { id: id }
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

  .user-header-container {
    /* 向下排列 */
    width: 90%;
    padding: 30px 0 0;
    margin: 0 auto;
    overflow: hidden;

    .user-header-top {
      background: var(--theme-background);
      width: 100%;
      border-radius: 10px;
      display: flex;
      align-items: center;
      color: var(--white-content);
      padding: 20px 20px;

      .user-header-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        color: var(--white-content);

        .user-name {
          font-size: 28px;
          font-weight: 700;
        }
      }
    }
  }

  .page-container {
    width: 90%;
    background: var(--background);
    margin: 25px auto 0;
    padding: 0 0 20px;
    display: flex;
  }

  .content-container {
    width: 100%;
    container-name: content-container;
    container-type: inline-size;
  }

  .user-article {
    width: 100%;
    background: var(--content-background-color);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-radius: 10px;
  }

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

  .article-edit {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .article-edit-button {
      margin: 0 20px;
      padding: 10px 12px;
      border-radius: 20px;
    }
  }

  .add-article-button {
    padding: 10px 12px;
    border-radius: 20px;
    background-color: #39c5bb;
    color: white;
    border-color: #39c5bb;
  }

  .add-article-button:hover {
    background: #36b4aa;
    border-color: #36b4aa;
  }

  .article-list-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    animation: hideToShow 1s ease-in-out;
    border-top: 1px dashed var(--list-item-border);
  }

  .article-list-item {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 15px 15px 35px;

    &__title {
      width: 90%;
      font-size: 20px;
      font-weight: 700;
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
        word-break: break-all;
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
    .user-header-container {
      .el-avatar {
        margin: 0 20px 0 10px !important;
        height: 72px !important;
        width: 72px !important;
      }

      .user-header-content {
        font-size: 13px !important;
        gap: 2px !important;
      }

      .user-name {
        font-size: 20px !important;
      }
    }

    .article-list-header {
      height: 55px;
      padding: 15px 15px 15px 20px !important;

      .article-list-header__title {
        font-size: 18px;
      }
    }

    .article-list-item {
      padding: 15px 15px 15px 20px !important;
      gap: 6px;

      .article-list-item__title {
        font-size: 18px;
      }

      .article-list-item__content-inner {
        font-size: 14px;
      }
    }

    .article-list-item__footer {
      align-items: start !important;
      flex-direction: column;
      gap: 8px;
    }

    .article-edit-button {
      margin: 0 15px 0 0 !important;
    }
  }
</style>
