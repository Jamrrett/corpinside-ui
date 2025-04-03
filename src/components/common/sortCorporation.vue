<template>
  <div v-if="!$common.isEmpty(corporationList)" class="recent-post-container">
    <router-link :to="{ path: `/corporation/${corporation.id}` }"
         class="recent-post-item" :style="{ width: corporationListWidth }"
         v-for="(corporation, index) in showCorporationList"
         :key="index">
      <!-- 封面 -->
      <div class="post-row">
        <div class="recent-post-item-image">
          <el-image class="my-el-image"
                    style="border-radius: 10px;"
                    v-once
                    lazy
                    :src="corporation.corporationLogo"
                    fit="cover">
            <div slot="error" class="image-slot myCenter" style="background-color: var(--lightGreen)">
              <div class="error-text">
                <div style="text-align: center;">{{ corporation.corporationTitle }}</div>
              </div>
            </div>
          </el-image>
        </div>
        <!-- 标题 -->
        <div style="margin-top: 10px">
          <span style="font-size: 17px">{{ corporation.corporationTitle }}</span>
        </div>
      </div>
      <!-- 内容 -->
      <div class="recent-post-item-post">
        <!-- 信息 -->
        <div class="post-meta" style="width: 95%;display: flex">
          <span>
            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
              <path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z"
                    fill="#FF0000"></path>
              <path
                d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z"
                fill="#FFFFFF"></path>
            </svg> {{ corporation.viewCount }} <span class="message-word">热度</span>
          </span>
          <span>
            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
              <path
                d="M113.834667 291.84v449.194667a29.013333 29.013333 0 0 0 28.842666 29.013333h252.928v90.453333l160.597334-90.453333h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333h-665.6a29.013333 29.013333 0 0 0-29.696 29.013333z"
                fill="#FFDEAD"></path>
              <path
                d="M809.130667 262.826667h-665.6a29.013333 29.013333 0 0 0-28.842667 29.013333v40.106667a29.013333 29.013333 0 0 1 28.842667-29.013334h665.6a29.013333 29.013333 0 0 1 29.013333 29.013334V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333z"
                fill="#FFF3DB"></path>
              <path
                d="M556.202667 770.048h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V362.837333s-59.733333 392.533333-724.309333 314.709334v63.488a29.013333 29.013333 0 0 0 28.842666 29.013333h253.098667v90.453333z"
                fill="#F2C182"></path>
              <path
                d="M619.008 632.32l101.888-35.157333-131.754667-76.117334 29.866667 111.274667zM891.904 148.992a61.44 61.44 0 0 0-84.138667 22.528l-19.968 34.133333 106.666667 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-22.528-84.138667z"
                fill="#69BAF9"></path>
              <path d="M775.338667 198.775467l131.669333 76.032-186.026667 322.218666-131.6864-76.032z"
                    fill="#F7FBFF"></path>
              <path
                d="M775.168 198.826667l-5.290667 9.216 59.221334 34.133333a34.133333 34.133333 0 0 1 12.458666 46.592l-139.946666 242.346667a34.133333 34.133333 0 0 1-46.762667 12.629333l-59.050667-34.133333-6.656 11.434666 88.746667 51.2L720.896 597.333333l186.026667-322.56z"
                fill="#D8E3F0"></path>
              <path
                d="M616.448 622.592l2.56 9.728 101.888-35.157333-44.885333-25.941334-59.562667 51.370667zM891.904 148.992c-1.024 0-2.218667-0.853333-3.242667-1.536A61.610667 61.610667 0 0 1 887.466667 204.8l-19.968 34.133333-73.728-42.496-5.12 8.704 106.666666 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-23.381333-83.626667z"
                fill="#599ED4"></path>
              <path
                d="M265.898667 417.621333H494.933333a17.066667 17.066667 0 1 0 0-34.133333H265.898667a17.066667 17.066667 0 1 0 0 34.133333zM265.898667 533.504H494.933333a17.066667 17.066667 0 0 0 0-34.133333H265.898667a17.066667 17.066667 0 0 0 0 34.133333z"
                fill="#3D3D63"></path>
              <path
                d="M959.488 354.645333a99.84 99.84 0 0 0-23.722667-127.488 78.677333 78.677333 0 0 0-142.848-64.170666l-11.605333 20.138666a17.066667 17.066667 0 0 0-20.821333 7.168l-32.085334 55.466667H142.677333a46.250667 46.250667 0 0 0-45.909333 46.08v449.194667a46.08 46.08 0 0 0 45.909333 46.08h236.032v73.386666a17.066667 17.066667 0 0 0 8.362667 14.848 17.066667 17.066667 0 0 0 8.704 2.218667 17.066667 17.066667 0 0 0 8.362667-2.218667l156.672-88.234666h248.32a46.08 46.08 0 0 0 46.08-46.08V398.677333L921.6 283.306667a17.066667 17.066667 0 0 0-4.266667-21.504l1.877334-3.413334a65.365333 65.365333 0 0 1 10.410666 79.189334l-53.077333 91.989333a56.832 56.832 0 0 0 20.821333 77.653333 17.066667 17.066667 0 0 0 24.234667-6.314666 17.066667 17.066667 0 0 0-6.997333-23.04 23.04 23.04 0 0 1-8.362667-31.061334z m-138.410667 386.389334a11.946667 11.946667 0 0 1-11.946666 11.946666H556.202667a17.066667 17.066667 0 0 0-8.362667 2.218667l-134.997333 76.117333v-61.269333a17.066667 17.066667 0 0 0-17.066667-17.066667H142.677333a11.946667 11.946667 0 0 1-11.776-11.946666V291.84a11.946667 11.946667 0 0 1 11.776-11.946667h565.930667L574.464 512a17.066667 17.066667 0 0 0-1.706667 12.970667L597.333333 615.253333H265.898667a17.066667 17.066667 0 1 0 0 34.133334h352.938666a17.066667 17.066667 0 0 0 5.802667 0l102.4-35.328a17.066667 17.066667 0 0 0 9.216-7.509334l85.333333-147.968z m-204.8-184.661334l63.829334 36.864-49.322667 17.066667z m206.848-170.666666v1.365333l-108.373333 186.709333-102.4-59.050666L781.482667 221.866667l102.4 59.050666z m76.458667-161.28L887.466667 244.224l-76.970667-44.373333 11.264-19.797334a44.544 44.544 0 1 1 77.141333 44.544z"
                fill="#3D3D63"></path>
            </svg> {{ corporation.commentCount }} <span class="message-word">条评论</span>
          </span>
          <span>
            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
              <path
                d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
                fill="#FF713C"></path>
              <path
                d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
                fill="#885F44"></path>
            </svg> {{ corporation.likeCount }} <span class="message-word">点赞</span>
          </span>
        </div>
        <!-- 分类 标签 -->
        <div class="sort-label">
          <router-link :to="{path: '/sort/1'}"
               style="text-decoration: none;color: inherit">
            <span style="margin-right: 13px">
              📒 {{ "面试经验" }}
            </span>
          </router-link>
          <router-link :to="{path: '/sort/2'}"
                       style="text-decoration: none;color: inherit">
            <span>
              💻 {{ "工作体验" }}
            </span>
          </router-link>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      corporationList: {
        type: Array
      }
    },
    data() {
      return {
        corporationListNum: 4,
        showCorporationList: this.corporationList,
        containerWidth: null
      };
    },
    computed: {
      corporationListWidth() {
        if (this.corporationListNum > 0) {
          return `calc(100% / ${this.corporationListNum} - 20px)`;
        }
        return '100%'; // 若 corporationListNum 为 0 或者无效值，默认宽度为 100%
      },
      // postMetaMarginRight() {
      //   // return this.corporationListNum === 4 ? '5px' : '10px';
      //   return '5px';
      // }
    },
    mounted() {
      const container = this.$el;
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          this.containerWidth = entry.contentRect.width;
           if (this.containerWidth < 713) {
            this.corporationListNum = 2;
            this.showCorporationList = this.corporationList.slice(0, 4);
          } else if (this.containerWidth < 930) {
            this.corporationListNum = 3;
             this.showCorporationList = this.corporationList.slice(0, 6);
          } else if (this.containerWidth < 1200) {
            this.corporationListNum = 4;
             this.showCorporationList = this.corporationList.slice(0, 8);
          } else {
            this.corporationListNum = 5;
          }
        }
      });
      observer.observe(container);
    },
    beforeDestroy() {
      const container = this.$el;
      const observer = new ResizeObserver(() => {});
      observer.unobserve(container);
    }
  }
</script>

<style scoped>

  .recent-post-container {
    display: flex;
    flex-wrap: wrap;
  }

  .recent-post-item {
    position: relative;
    user-select: none;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    height: 135px;
    flex-shrink: 0;
    cursor: pointer;
    animation: zoomIn 0.8s ease-in-out;
    text-decoration: none; /* 移除下划线 */
    color: inherit;
    box-shadow: 0 1px 10px -6px var(--borderColor);
  }

  .recent-post-item:hover {
    box-shadow: 0 2px 13px -2px var(--borderHoverColor);
  }

  .post-row {
    display: flex; /* 使用 flexbox 布局 */
    align-items: center; /* 垂直居中对齐 */
  }

  .recent-post-item-image {
    width: 70px;
    height: 70px;
    position: relative;
    margin: 10px 10px 0 10px;
    padding: 5px;
  }

  .recent-post-item-image >>> .el-image__inner {
    transition: all 1s;
  }

  .recent-post-item-image >>> .el-image__inner:hover {
    transform: scale(1.2);
  }

  .recent-post-item-post {
    width: 100%;
    padding: 5px 0 10px 15px;
  }

  .recent-post-item-post h3 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .post-meta {
    font-size: 12px;
    color: var(--greyFont);
  }

  .post-meta span:not(:last-child) {
    margin-right: 5px;
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
    font-size: 13px;
    color: var(--greyFont);
    transition: all 0.3s;
    cursor: pointer;
    user-select: none;
  }

  .sort-label span:hover {
    background-color: var(--themeBackground);
    color: var(--white);
  }

  .error-text {
    font-size: 12px;
    line-height: 1.8;
    color: var(--white);
  }

  .hasVideo {
    padding: 0 20px;
    background: var(--maxMaxWhiteMask);
    border-radius: 15px;
  }

  /*@media screen and (max-width: 1400px) {
    .recent-post-item {
      width: calc(100% / 2 - 20px);
    }
  }*/

  @media screen and (max-width: 520px) {
    .message-word {
      display: none;
    }
    .sort-label {
      display: none;
    }
    .recent-post-item {
      height: 90px;
    }
    .recent-post-item-image {
      width: 50px;
      height: 50px;
      margin: 10px 10px 0 10px;
      padding: 0;
    }
    .post-meta span:not(:last-child) {
      margin-right: 10px;
    }
  }

  /*@media screen and (max-width: 600px) {
    .recent-post-item {
      width: calc(100% - 20px);
    }
  }*/

</style>
