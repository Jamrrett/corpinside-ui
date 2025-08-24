<template>
  <div>
    <div v-if="!$common.isEmpty(department)">
      <!-- 封面 -->
      <div class="department-head my-animation-hideToShow">
        <div class="my-progressive" :style="{width: clientWidth + 'px', height: '100%', userSelect: 'none'}">
          <img
            class="preview"
            alt="封面低清图"
            style="width: 100%; height: 100%; object-fit: cover"
            :src="getPlaceholderSrc(corporation.corporationCover)"
          />
          <img
            class="origin"
            alt="封面原图"
            style="width: 100%;height: 100%;object-fit: cover"
            :src="getImageSrc(corporation.corporationCover)"
            @error="handleImageError"
            @load="handleImageLoad"
          />
          <div class="department-image" v-show="imageError"></div>
        </div>

        <!-- 文章信息 -->
        <div class="department-info-container">
          <div class="department-title">{{ department.departmentTitle }}</div>
          <div class="department-info">
            <div class="department-label-items">
              <router-link class="department-label-item" :to="{path: `/corporation/${corporation.id}`}">
                <SvgIcon name="corporation" :size="15"/>
                <span>{{ corporation.corporationTitle }}</span>
              </router-link>
              <router-link class="department-label-item" :to="{path: `/sortCorporation/${corporation.sortId}`}">
                <SvgIcon name="label" :size="15"/>
                <span>{{ $store.state.sortCorporationInfo.find(item => item.id === corporation.sortId).sortName }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="page-container-wrapper">
        <div class="page-container">
          <div class="department-content left-container my-animation-hideToShow">
            <div>
              <div v-html="departmentContentHtml" class="entry-content"></div>
              <div class="department-update-time">
                <span>更新于 {{ department.updateTime }}</span>
              </div>
            </div>
          </div>

          <!-- 部门文章 -->
          <div class="department-article-aside right-container">
            <div v-for="(sort, index) in sortInfo.slice(0, 2)" :key="index">
              <div class="department-article-header">
                <router-link :to="{ path: `/sort/${sort.id}`, query: {departmentId: id} }" class="article-more">
                  <SvgIcon name="app" :size="18"/>
                  <span>{{ sort.sortName }}</span>
                </router-link>
                <router-link :to="{ path: `/sort/${sort.id}`, query: {departmentId: id} }" class="article-more">
                  <SvgIcon name="forward" :size="18"/>
                  <span>MORE</span>
                </router-link>
              </div>
              <div v-if="!$common.isEmpty(articlesByDepartment[sort.id])">
                <sortArticleSmall :articleList="articlesByDepartment[sort.id]"></sortArticleSmall>
              </div>
              <div v-else>
                <div style="display: flex;flex-direction: column;align-items: center;padding: 20px 0 40px">
                  <div style="font-size: 16px">暂无文章</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SvgIcon = () => import( '@/components/icon');
const sortArticleSmall = () => import( './common/sortArticleSmall');
const sortDepartmentSmall = () => import( './common/sortDepartmentSmall');
import MarkdownIt from 'markdown-it';
import {getDepartmentById} from "@/utils/data/department";
import {getCorporationById} from "@/utils/data/corporation";
import {getArticlesByDepartmentIdGroupBySortId} from "@/utils/data/article";

export default {
  components: {
    SvgIcon,
    sortArticleSmall,
    sortDepartmentSmall,
  },

  data() {
    return {
      id: this.$route.params.id,
      department: {},
      corporation: {},
      departmentContentHtml: '',
      imageError: false,
      imageLoad: false,
      articlesByDepartment: {},
      clientWidth: document.documentElement.clientWidth,};
  },
  created() {
    this.loadData();
  },
  computed: {
    sortInfo() {
      return this.$store.state.sortInfo;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    loadData() {
      this.department = getDepartmentById(this.id);
      this.corporation = getCorporationById(this.department.corporationId);
      this.articlesByDepartment = getArticlesByDepartmentIdGroupBySortId(this.id);

      // 处理Markdown内容
      if (this.department.departmentContent) {
        const md = new MarkdownIt({breaks: true}).use(require('markdown-it-multimd-table'));
        this.departmentContentHtml = md.render(this.department.departmentContent);
      }
    },
    handleResize() {
      // 更新窗口宽度
      this.clientWidth = document.documentElement.clientWidth;
    },
    getImageSrc(originalSrc) {
      return originalSrc ? process.env.BASE_URL + originalSrc : '';
    },
    getPlaceholderSrc(originalSrc) {
      return originalSrc ? process.env.BASE_URL + originalSrc.replace(/\.\w+$/, '_placeholder$&') : '';
    },
    handleImageLoad() {
      this.imageLoad = true;
      const previewImg = document.querySelector('.my-progressive img.preview');
      previewImg.classList.add('animate-disappear');
      const originImg = document.querySelector('.my-progressive img.origin');
      originImg.classList.add('animate-appear');
    },
    handleImageError(e) {
      this.imageError = true;
      const images = document.querySelectorAll('.my-progressive img');
      images.forEach(image => {
        image.style.display = 'none';
        // 或者设置默认图片
        // image.src = '/path/to/default-image.jpg';
      });
      console.error('图片加载失败:', e.target.src);
    },
  }
};
</script>

<style scoped lang="less">
.department-head {
  height: 40vh;
  position: relative;
}

.department-image {
  user-select: none;
}

.department-image::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--miniMask);
  content: "";
}

.my-progressive {
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
  }

  img.preview {
    z-index: 2;
    /*animation: disappear 0.5s ease-in-out forwards;*/
  }

  img.origin {
    z-index: 1;
  }
}

@keyframes disappear {
  0% {
    opacity: 1;
    display: inline;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

.animate-disappear {
  animation: disappear 0.5s ease-in-out forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-appear {
  animation: appear 0.5s ease-in-out forwards;
}

.department-info-container {
  position: absolute;
  bottom: 15px;
  left: 15%;
  color: var(--white-content);
  z-index: 10;

  .department-title {
    font-size: 36px;
    margin-bottom: 15px;
  }

  .department-info {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;

    .department-label-items {
      display: flex;
      align-items: center;
      gap: 8px;

      .department-label-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 3px 8px;
        font-size: 13px;
        border-radius: 4px;
        transition: all 0.3s;
        background-color: rgba(128, 128, 128, 0.2);
        box-shadow: 1px 1px 4px rgba(50, 50, 50, 0.5);
      }

      .department-label-item:hover {
        background-color: var(--theme-green);
        cursor: pointer;
      }
    }
  }
}

.department-content {
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .department-update-time {
    color: var(--grey-content);
    font-size: 12px;
    margin: 20px 0;
    user-select: none;
  }
}

.department-article-aside {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-left: 10px;

  .department-article-header {
    margin: 5px auto 5px;
    display: flex;
    justify-content: space-between;
    color: var(--grey-content);
    border-bottom: 1px dashed var(--content-border);
    padding-bottom: 5px;
  }

  .article-more {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 16px;
    line-height: 24px;
  }

  .article-more:hover {
    color: var(--theme-green);
  }
}

@media screen and (max-width: 840px) {
  .department-head {
    height: 35vh;
  }

  .department-info-container {
    left: calc(5% + 8px);

    .department-title {
      margin-bottom: 6px;
    }
  }

  .department-content {
    margin-left: 0;
    padding: 0 10px;
  }

  .department-article-aside {
    padding: 0 10px;
  }
}

@media screen and (max-width: 520px) {
  .department-head {
    height: 25vh;
  }
}
</style>
