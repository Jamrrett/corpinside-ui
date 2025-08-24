<template>
  <div>
    <div v-if="!$common.isEmpty(corporation)">
      <!-- 封面 -->
      <div class="corporation-head my-animation-hideToShow">
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
          <div class="corporation-image" v-show="imageError"></div>
        </div>

        <!-- 文章信息 -->
        <div class="corporation-info-container">
          <div class="corporation-title">{{ corporation.corporationTitle }}</div>
          <div class="corporation-info">
            <div class="corporation-info-items">
              <div class="corporation-info-item">
                <SvgIcon name="technology" :size="15"/>
                <span>{{ corporation.industry }}</span>
              </div>
              <span>·</span>
              <div class="corporation-info-item">
                <SvgIcon name="building" :size="15"/>
                <span class="sort-corporation-item__info-item__common">成立于 {{ corporation.foundedYear }} 年</span>
              </div>
            </div>
            <div class="vertical-line"></div>
            <div class="corporation-label-items">
              <router-link class="corporation-label-item" :to="{path: `/sortCorporation/${corporation.sortId}`}">
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
          <div class="corporation-content left-container my-animation-hideToShow">
            <div>
              <div class="corporation-content-header">
                <div class="corporation-content-header__menu-button" @click="showIntroduction">
                  <svg viewBox="0 0 1024 1024" width="15" height="22">
                    <path
                      :d="trianglePathIntroduction"
                      :style="{ transform: rotationStyleIntroduction, transformOrigin: '50% 50%' }"
                      fill="#FF623E"></path>
                  </svg>
                  <span>介绍</span>
                </div>
              </div>
              <div v-show="ifShowIntroduction">
                <div v-html="corporationContentHtml" class="entry-content"></div>
                <div class="corporation-update-time">
                  <span>更新于 {{ corporation.updateTime }}</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div class="corporation-content-header">
                  <div class="corporation-content-header__menu-button" @click="showDepartments">
                    <svg viewBox="0 0 1024 1024" width="15" height="22">
                      <path
                        :d="trianglePathDepartments"
                        :style="{ transform: rotationStyleDepartments, transformOrigin: '50% 50%' }"
                        fill="#FF623E"></path>
                    </svg>
                    <span>部门</span>
                  </div>
                </div>
                <div v-show="ifShowDepartments">
                  <div v-if="!$common.isEmpty(departments)">
                    <sortDepartmentSmall :departmentList="departments"></sortDepartmentSmall>
                  </div>
                  <div v-else>
                    <div style="display: flex;flex-direction: column;align-items: center;padding: 20px 0 40px">
                      <div style="font-size: 16px">暂无部门</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 公司文章 -->
          <div class="corporation-article-aside right-container">
            <div v-for="(sort, index) in sortInfo.slice(0, 2)" :key="index">
              <div class="corporation-article-header">
                <router-link :to="{ path: `/sort/${sort.id}`, query: {corporationId: id} }" class="article-more">
                  <SvgIcon name="app" :size="18"/>
                  <span>{{ sort.sortName }}</span>
                </router-link>
                <router-link :to="{ path: `/sort/${sort.id}`, query: {corporationId: id} }" class="article-more">
                  <SvgIcon name="forward" :size="18"/>
                  <span>MORE</span>
                </router-link>
              </div>
              <div v-if="!$common.isEmpty(articlesByCorporation[sort.id])">
                <sortArticleSmall :articleList="articlesByCorporation[sort.id]"></sortArticleSmall>
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
import {getCorporationById} from "@/utils/data/corporation";
import {getDepartmentsByCorporationId} from "@/utils/data/department";
import {getArticlesByCorporationIdGroupBySortId} from "@/utils/data/article";

export default {
  components: {
    SvgIcon,
    sortArticleSmall,
    sortDepartmentSmall,
  },

  data() {
    return {
      id: this.$route.params.id,
      corporation: {},
      departments: [],
      corporationContentHtml: '',
      imageError: false,
      imageLoad: false,
      articlesByCorporation: {},
      clientWidth: document.documentElement.clientWidth,
      ifShowIntroduction: true,
      ifShowDepartments: true,
      trianglePathIntroduction: 'M220 1004 Q200 1024 180 1004 L180 20 Q200 0 220 20 L1004 492 Q1024 512 1004 532 Z',
      trianglePathDepartments: 'M220 1004 Q200 1024 180 1004 L180 20 Q200 0 220 20 L1004 492 Q1024 512 1004 532 Z'
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    sortInfo() {
      return this.$store.state.sortInfo;
    },
    rotationStyleIntroduction() {
      return this.ifShowIntroduction ? 'rotate(90deg)' : 'rotate(0deg)';
    },
    rotationStyleDepartments() {
      return this.ifShowDepartments ? 'rotate(90deg)' : 'rotate(0deg)';
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    loadData() {
      this.corporation = getCorporationById(this.id);
      this.departments = getDepartmentsByCorporationId(this.id);
      this.articlesByCorporation = getArticlesByCorporationIdGroupBySortId(this.id);

      // 处理Markdown内容
      if (this.corporation.corporationContent) {
        const md = new MarkdownIt({breaks: true}).use(require('markdown-it-multimd-table'));
        this.corporationContentHtml = md.render(this.corporation.corporationContent);
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
    showIntroduction() {
      this.ifShowIntroduction = !this.ifShowIntroduction;
    },
    showDepartments() {
      this.ifShowDepartments = !this.ifShowDepartments;
    }
  }
};
</script>

<style scoped lang="less">
.corporation-head {
  height: 40vh;
  position: relative;
}

.corporation-image {
  user-select: none;
}

.corporation-image::before {
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

.corporation-info-container {
  position: absolute;
  bottom: 15px;
  left: 15%;
  color: var(--white-content);
  z-index: 10;

  .corporation-title {
    font-size: 36px;
    margin-bottom: 15px;
  }

  .corporation-info {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;

    .corporation-info-items {
      display: flex;
      align-items: center;
      gap: 4px;

      .corporation-info-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 0 4px;
      }
    }

    .vertical-line {
      border-left: 1px solid var(--white-content);
      border-right: 1px solid var(--white-content);
      height: 16px;
      margin: 0 4px;
    }

    .corporation-label-items {
      display: flex;
      align-items: center;
      gap: 8px;

      .corporation-label-item {
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

      .corporation-label-item:hover {
        background-color: var(--theme-green);
        cursor: pointer;
      }
    }
  }
}

.corporation-content {
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .corporation-content-header {
    margin: 0 auto 5px;
    display: flex;
    justify-content: space-between;
    color: var(--grey-content);
    border-bottom: 1px dashed var(--content-border);
    padding-bottom: 5px;

    &__menu-button {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 20px;
      line-height: 30px;
    }

    &__menu-button:hover {
      color: var(--theme-green);
    }
  }

  .corporation-update-time {
    color: var(--grey-content);
    font-size: 12px;
    margin: 20px 0;
    user-select: none;
  }
}

.corporation-article-aside {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-left: 10px;

  .corporation-article-header {
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
  .corporation-head {
    height: 35vh;
  }
  .corporation-info-container {
    left: calc(5% + 8px);

    .corporation-title {
      margin-bottom: 6px;
    }
  }
  .corporation-content {
    margin-left: 0;
    padding: 0 10px;
  }

  .corporation-article-aside {
    padding: 0 10px;
  }
}

@media screen and (max-width: 520px) {
  .corporation-head {
    height: 25vh;
  }
}
</style>
