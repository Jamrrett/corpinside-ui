<template>
  <div>
    <div class="introduce-search-container">
      <div class="introduce-search-box" style="color: var(--white)">
        <div class="user-head-container">
            <el-avatar :size="80"
                       :src="user.avatar"
            style="margin: 20px 10px 20px 30px"></el-avatar>
          <div class="user-name">{{ user.username }}</div>
        </div>
      </div>
    </div>

    <div class="page-container">
      <div class="left-container">
        <div class="user-article">
          <div class="article-first">
            <div>
              <svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -3px;">
                <path
                  d="M179.2 153.6m89.6 0l588.8 0q89.6 0 89.6 89.6l0 486.4q0 89.6-89.6 89.6l-588.8 0q-89.6 0-89.6-89.6l0-486.4q0-89.6 89.6-89.6Z"
                  fill="#FF9C55"></path>
                <path
                  d="M25.6 193.4208A91.0208 91.0208 0 0 1 116.6208 102.4H382.592a91.0208 91.0208 0 0 1 87.5008 65.9712l24.5504 85.7216h412.7488A91.0208 91.0208 0 0 1 998.4 345.1392v485.4528A91.0208 91.0208 0 0 1 907.3792 921.6H116.608A91.0208 91.0208 0 0 1 25.6 830.5792V193.408z"
                  fill="#FFD977"></path>
                <path
                  d="M128 665.6m25.6 0l76.8 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-76.8 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                  fill="#FFF1C9"></path>
                <path
                  d="M128 768m25.6 0l179.2 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-179.2 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                  fill="#FFF1C9"></path>
                <path
                  d="M128 486.4m51.2 0l0 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z"
                  fill="#FFA86A"></path>
              </svg>
              <span style="font-size: 20px;padding-left: 5px">&thinsp;{{ isCurrentUser ? "我的文章" : "Ta的文章" }}</span>
            </div>
            <div class="article-edit" v-if="isCurrentUser" style="display: flex;flex-direction: column;justify-content: center">
              <el-button icon="el-icon-plus" class="add-article-button" @click="handleAdd">发布</el-button>
            </div>
          </div>
          <div v-if="this.$common.isEmpty(articleList)">
            <div style="display: flex;flex-direction: column;align-items: center;margin: 83px 0 85px">
              <div style="font-size: 20px">暂无文章</div>
              <el-button v-if="isCurrentUser" style="margin-top: 20px" @click="handleAdd">发布文章</el-button>
            </div>
          </div>
          <div v-else class="recent-post-item"
               v-for="(article, index) in articleList"
               :key="index">
            <!--         @click="$router.push({path: `/article/${article.id}`})">-->
            <!-- 内容 -->
            <div class="recent-post-item-post">
              <!-- 时间 -->
              <div class="post-meta">
                <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                  <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#409EFF"></path>
                  <path
                    d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z"
                    fill="#FFFFFF"></path>
                  <path
                    d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z"
                    fill="#FFFFFF"></path>
                </svg>
                发布于 {{ article.createTime }}
              </div>

              <!-- 标题 -->
              <div style="margin: 10px 0 10px 0">
                <router-link :to="{ path: `/article/${article.id}` }" style="text-decoration: none;color: inherit;">
                  <span style="font-size: 18px;font-weight: bold">{{ article.articleTitle }}</span>
                </router-link>
              </div>

              <!-- 信息 -->
              <div class="post-meta" style="margin-bottom: 5px">
            <span>
              <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                <path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z"
                      fill="#FF0000"></path>
                <path
                  d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z"
                  fill="#FFFFFF"></path>
              </svg> {{ article.viewCount }} 热度
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
              </svg> {{ article.commentCount }} 条评论
            </span>
                <span>
              <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                <path
                  d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
                  fill="#FF713C"></path>
                <path
                  d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
                  fill="#885F44"></path>
              </svg> {{ article.likeCount }} 点赞
            </span>
              </div>

              <!-- 内容 -->
              <div class="recent-post-desc">
                <router-link :to="{ path: `/article/${article.id}` }" style="text-decoration: none;color: inherit;">
                  {{ article.articleContent }}
                </router-link>
              </div>

              <!-- 分类 标签 -->
              <div class="sort-label">
                <router-link :to="{ path: `/corporation/${article.corporationId}` }" style="text-decoration: none;color: inherit">
              <span style="margin-right: 12px">
                <svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -4px;">
                  <path
                    d="M224.2 472.3c-13-5.7-3.7-23.5 8.2-19 91 34 146.8 108.7 182.4 138.5 5.6 4.7 14 2.9 17.3-3.5 16.8-32 45.8-113.7-57.1-168.6-87.3-46.5-188-53.6-247.3-82.2-14.5-7-31.1 4.6-29.9 20.7 5 69.7 28.9 124.7 62.3 181.5 67.3 114.3 140.6 132.9 216.6 104 2.2-0.9 4.5-1.8 7-3 7-3.4 8.3-12.9 2.5-18.1 0.1 0-45.7-69.3-162-150.3z"
                    fill="#FFD401"></path>
                  <path
                    d="M282.7 849.9c79.5-137 172.4-263.1 385.4-401.3 9.8-6.4 2.1-21.5-8.9-17.4C497.7 492.8 429.7 585 373.3 640.8c-8.7 8.7-23.4 6.3-29.1-4.6-27.2-51.8-69.5-174.1 97.3-263.1 147.7-78.8 319.9-91.4 429.7-93.3 18.9-0.3 31.5 19.4 23.3 36.4C863.7 380 842.6 478 789.9 567.6 680.8 753.1 545.5 766.7 422.2 719.8c-8.8-3.4-18.8-0.2-24 7.7-16.6 25.2-50.3 80.1-58.7 122.4-11.4 56.8-82.2 43.9-56.8 0z"
                    fill="#8BC03C"></path>
                  <path
                    d="M375 419.6c-30.1 28.2-45.8 57.7-52.4 86.1 40.6 32.4 70.2 67.7 92.1 85.9 1.2 1 2.5 1.6 3.9 2.1 6.5-6.7 13.3-13.7 20.4-20.7 15.2-37.9 25.3-105.7-64-153.4zM318.8 548.2c1.6 36.1 14.7 67.6 25.5 88.1 5.7 10.9 20.3 13.3 29.1 4.6 4.9-4.9 10-10 15.1-15.4-0.6-1-1.3-2-2.2-2.8 0-0.1-20.1-30.5-67.5-74.5z"
                    fill="#8BA000"></path>
                </svg> {{ article.corporationTitle }}
              </span>
                </router-link>
                <router-link :to="{ path: `/sortCorporation/${article.sortCorporationId}` }" style="text-decoration: none;color: inherit">
              <span>
                <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -3px;">
                  <path
                    d="M905.0112 560.4352l-342.784 342.784c-56.7808 56.7808-148.7872 56.7808-205.568 0l-231.5776-231.5776c-56.7808-56.7808-56.7808-148.7872 0-205.568l342.9376-342.9376a114.8928 114.8928 0 0 1 84.224-33.5872l266.3936 7.2192c60.7744 1.6384 109.7216 50.3808 111.5648 111.1552l8.2944 267.8272c1.024 31.6928-11.1104 62.3104-33.4848 84.6848z"
                    fill="#8C7BFD"></path>
                  <path
                    d="M675.2256 491.4688c-82.176 0-149.0432-66.8672-149.0432-149.0432s66.8672-149.0432 149.0432-149.0432 149.0432 66.8672 149.0432 149.0432-66.8672 149.0432-149.0432 149.0432z m0-192.2048c-23.808 0-43.2128 19.3536-43.2128 43.2128 0 23.808 19.3536 43.2128 43.2128 43.2128 23.808 0 43.2128-19.3536 43.2128-43.2128s-19.4048-43.2128-43.2128-43.2128z"
                    fill="#FFE37B"></path>
                </svg> {{ article.sortCorporationName }}
              </span>
                </router-link>
              </div>
            </div>
            <div class="article-edit" v-if="isCurrentUser" style="display: flex;flex-direction: column;justify-content: center">
              <el-button icon="el-icon-edit" style="margin: 0 20px;padding: 10px 12px;border-radius: 20px" @click="handleEdit(article.id)">编辑</el-button>
            </div>
          </div>
        </div>

        <div class="pagination-wrap">
          <div @click="pageArticles()" class="pagination" v-if="pagination.total !== articleList.length">
            下一页
          </div>
          <!--          <div v-else style="user-select: none">-->
          <!--            ~~到底啦~~-->
          <!--          </div>-->
        </div>
      </div>

      <div class="right-container">
        <div class="user-info">
          <div v-if="isCurrentUser">
            <el-avatar class="user-avatar" @click.native="changeDialog('修改头像')" :size="60"
                       :src="userForEdit.avatar"></el-avatar>
          </div>
          <div v-else>
            <el-avatar class="user-avatar" :size="60"
                       :src="userForEdit.avatar"></el-avatar>
          </div>
          <div class="myCenter" style="margin-top: 12px">
            <div class="user-title">
              <div>用户名：</div>
              <div>邮箱：</div>
              <div>简介：</div>
            </div>
            <div class="user-content" v-if="isCurrentUser">
              <div>
                <el-input style="font-size: 14px;border: 1px solid #ccc;border-radius: 10px" maxlength="30" v-model="user.username"></el-input>
              </div>
              <div>
                <div v-if="!$common.isEmpty(user.email)" style="font-size: 14px">
                  {{ userForEdit.email }} <span class="changeInfo" @click="changeDialog('修改邮箱')">修改</span>
                </div>
                <div v-else><span class="changeInfo" @click="changeDialog('绑定邮箱')">绑定邮箱</span></div>
              </div>
              <div>
                <el-input v-model="userForEdit.introduction"
                          maxlength="60"
                          type="textarea"
                          style="border: 1px solid #ccc;border-radius: 10px;margin-top: 15px"
                          show-word-limit></el-input>
              </div>
            </div>
            <div v-else class="user-content">
              <div>
                {{ user.username }}
              </div>
              <div>
                {{ user.email }}
              </div>
              <div>
                {{ user.introduction }}
              </div>
            </div>
          </div>
          <div v-if="isCurrentUser" style="margin-top: 20px">
            <proButton :info="'提交'"
                       @click.native="submitUserInfo()"
                       :before="$constant.before_color_2"
                       :after="$constant.after_color_2">
            </proButton>
          </div>
        </div>
      </div>
    </div>


    <el-dialog :title="dialogTitle"
               :visible.sync="showDialog"
               width="30%"
               :before-close="clearDialog"
               :append-to-body="true"
               :close-on-click-modal="false"
               center>
      <div class="myCenter" style="flex-direction: column">
        <div>
          <div v-if="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号'">
            <div style="margin-bottom: 5px">手机号：</div>
            <el-input v-model="phoneNumber"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
            <el-input v-model="code"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
            <el-input v-model="password"></el-input>
          </div>
          <div v-else-if="dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱'">
            <div style="margin-bottom: 5px">邮箱：</div>
            <el-input v-model="email"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
            <el-input v-model="code"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
            <el-input v-model="password" type="password"></el-input>
          </div>
          <div v-else-if="dialogTitle === '修改头像'">
            <uploadPicture :prefix="'userAvatar'" @addPicture="addPicture" :maxSize="1"
                           :maxNumber="1"></uploadPicture>
          </div>
          <div v-else-if="dialogTitle === '找回密码'">
            <div class="myCenter" style="margin-bottom: 12px">
              <el-radio-group v-model="passwordFlag">
                <el-radio :label="1" style="margin-right: 10px">手机号</el-radio>
                <el-radio :label="2">邮箱</el-radio>
              </el-radio-group>
            </div>
            <div v-if="passwordFlag === 1">
              <div style="margin-bottom: 5px">手机号：</div>
              <el-input v-model="phoneNumber"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="code"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">新密码：</div>
              <el-input maxlength="30" v-model="password"></el-input>
            </div>
            <div v-else-if="passwordFlag === 2">
              <div style="margin-bottom: 5px">邮箱：</div>
              <el-input v-model="email"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="code"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">新密码：</div>
              <el-input maxlength="30" v-model="password"></el-input>
            </div>
          </div>
          <div v-else-if="dialogTitle === '邮箱验证码'">
            <div>
              <div style="margin-bottom: 5px">邮箱：</div>
              <el-input v-model="email"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="code"></el-input>
            </div>
          </div>
        </div>
        <div style="display: flex;margin-top: 30px" v-show="dialogTitle !== '修改头像'">
          <proButton :info="codeString"
                     v-show="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号' || dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱' || dialogTitle === '找回密码' || dialogTitle === '邮箱验证码'"
                     @click.native="getCode()"
                     :before="$constant.before_color_1"
                     :after="$constant.after_color_1"
                     style="margin-right: 20px">
          </proButton>
          <proButton :info="'提交'"
                     @click.native="submitDialog()"
                     :before="$constant.before_color_2"
                     :after="$constant.after_color_2">
          </proButton>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const proButton = () => import( "./common/proButton");
  const uploadPicture = () => import( "./common/uploadPicture");

  export default {
    components: {
      proButton,
      uploadPicture
    },
    data() {
      return {
        user: null,
        userForEdit: null,
        currentUser: this.$store.state.currentUser,
        isCurrentUser: false,
        username: "",
        account: "",
        password: "",
        phoneNumber: "",
        email: "",
        avatar: "",
        showDialog: false,
        code: "",
        dialogTitle: "",
        codeString: "验证码",
        passwordFlag: null,
        intervalCode: null,
        pagination: {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          userId: this.$route.params.userId
        },
        articleList: []
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
          userId: this.$route.params.userId
        };
        this.articleList.splice(0, this.articleList.length);
        this.isCurrentUser = this.$route.params.userId == this.$store.state.currentUser.id;
        this.getUserInfo();
        this.getArticles();
      }
    },
    created() {
      this.isCurrentUser = this.$route.params.userId == this.$store.state.currentUser.id;
      this.getUserInfo();
      this.getArticles();
      console.log(this.currentUser);
    },
    methods: {
      getUserInfo() {
        if (this.$common.isEmpty(this.$route.params.userId)) {
          this.$message({
            message: "用户不存在！",
            type: "error"
          });
          return;
        }
        this.$http.get(this.$constant.baseURL + "/user/getUserById", { userId: this.$route.params.userId })
          .then((res) => {
              if (!this.$common.isEmpty(res.data)) {
                this.user = res.data;
                this.userForEdit = res.data;
              }
            })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getArticles() {
        this.$http.post(this.$constant.baseURL + "/article/listArticle", this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.articleList = this.articleList.concat(res.data.records);
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
      pageArticles() {
        this.pagination.current = this.pagination.current + 1;
        this.getArticles();
      },
      addPicture(res) {
        this.avatar = res;
        this.submitDialog();
        window.location.reload();
      },
      submitUserInfo() {
        if (!this.checkParameters()) {
          return;
        }

        let user = {
          username: this.userForEdit.username
        };

        if (!this.$common.isEmpty(this.userForEdit.introduction)) {
          user.introduction = this.userForEdit.introduction.trim();
        }

        this.$confirm('确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          this.$http.post(this.$constant.baseURL + "/user/updateUserInfo", user)
            .then((res) => {
              console.log(res);
              console.log(user);
              console.log(this.currentUser);
              if (!this.$common.isEmpty(res.data)) {
                this.$store.commit("loadCurrentUser", res.data);
                this.currentUser = this.$store.state.currentUser;
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                window.location.reload();
              }
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }).catch(() => {});
      },
      checkParams(params) {
        if (this.dialogTitle === "修改手机号" || this.dialogTitle === "绑定手机号" || (this.dialogTitle === "找回密码" && this.passwordFlag === 1)) {
          params.flag = 1;
          if (this.$common.isEmpty(this.phoneNumber)) {
            this.$message({
              message: "请输入手机号！",
              type: "error"
            });
            return false;
          }
          if (!(/^1[345789]\d{9}$/.test(this.phoneNumber))) {
            this.$message({
              message: "手机号格式有误！",
              type: "error"
            });
            return false;
          }
          params.place = this.phoneNumber;
          return true;
        } else if (this.dialogTitle === "修改邮箱" || this.dialogTitle === "绑定邮箱" || this.dialogTitle === "邮箱验证码" || (this.dialogTitle === "找回密码" && this.passwordFlag === 2)) {
          params.flag = 2;
          if (this.$common.isEmpty(this.email)) {
            this.$message({
              message: "请输入邮箱！",
              type: "error"
            });
            return false;
          }
          if (!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.email))) {
            this.$message({
              message: "邮箱格式有误！",
              type: "error"
            });
            return false;
          }
          params.place = this.email;
          return true;
        }
        return false;
      },
      checkParameters() {
        if (this.$common.isEmpty(this.currentUser.username)) {
          this.$message({
            message: "请输入用户名！",
            type: "error"
          });
          return false;
        }

        if (this.currentUser.username.indexOf(" ") !== -1) {
          this.$message({
            message: "用户名不能包含空格！",
            type: "error"
          });
          return false;
        }
        return true;
      },
      changeDialog(value) {
        if (value === "邮箱验证码") {
          if (this.$common.isEmpty(this.email)) {
            this.$message({
              message: "请输入邮箱！",
              type: "error"
            });
            return false;
          }
          if (!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.email))) {
            this.$message({
              message: "邮箱格式有误！",
              type: "error"
            });
            return false;
          }
        }

        this.dialogTitle = value;
        this.showDialog = true;
      },
      submitDialog() {
        if (this.dialogTitle === "修改头像") {
          if (this.$common.isEmpty(this.avatar)) {
            this.$message({
              message: "请上传头像！",
              type: "error"
            });
          } else {
            let user = {
              avatar: this.avatar.trim()
            };

            this.$http.post(this.$constant.baseURL + "/user/updateUserInfo", user)
              .then((res) => {
                if (!this.$common.isEmpty(res.data)) {
                  this.$store.commit("loadCurrentUser", res.data);
                  this.currentUser = this.$store.state.currentUser;
                  this.clearDialog();
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                }
              })
              .catch((error) => {
                this.$message({
                  message: error.message,
                  type: "error"
                });
              });
          }
        } else if (this.dialogTitle === "修改手机号" || this.dialogTitle === "绑定手机号" || this.dialogTitle === "修改邮箱" || this.dialogTitle === "绑定邮箱") {
          this.updateSecretInfo();
        } else if (this.dialogTitle === "找回密码") {
          if (this.passwordFlag !== 1 && this.passwordFlag !== 2) {
            this.$message({
              message: "请选择找回方式！",
              type: "error"
            });
          } else {
            this.updateSecretInfo();
          }
        } else if (this.dialogTitle === "邮箱验证码") {
          this.showDialog = false;
        }
      },
      updateSecretInfo() {
        if (this.$common.isEmpty(this.code)) {
          this.$message({
            message: "请输入验证码！",
            type: "error"
          });
          return;
        }
        if (this.$common.isEmpty(this.password)) {
          this.$message({
            message: "请输入密码！",
            type: "error"
          });
          return;
        }
        let params = {
          code: this.code.trim(),
          password: this.$common.encrypt(this.password.trim())
        };
        if (!this.checkParams(params)) {
          return;
        }

        if (this.dialogTitle === "找回密码") {
          this.$http.post(this.$constant.baseURL + "/user/updateForForgetPassword", params, false, false)
            .then((res) => {
              this.clearDialog();
              this.$message({
                message: "修改成功，请重新登陆！",
                type: "success"
              });
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        } else {
          this.$http.post(this.$constant.baseURL + "/user/updateSecretInfo", params, false, false)
            .then((res) => {
              if (!this.$common.isEmpty(res.data)) {
                this.$store.commit("loadCurrentUser", res.data);
                this.currentUser = this.$store.state.currentUser;
                this.clearDialog();
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                window.location.reload();
              }
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }
      },
      getCode() {
        if (this.codeString === "验证码") {
          // 获取验证码
          let params = {};
          if (!this.checkParams(params)) {
            return;
          }

          let url;
          if (this.dialogTitle === "找回密码" || this.dialogTitle === "邮箱验证码") {
            url = "/user/getCodeForForgetPassword";
          } else {
            url = "/user/getCodeForBind";
          }

          this.$http.get(this.$constant.baseURL + url, params)
            .then((res) => {
              this.$message({
                message: "验证码已发送，请注意查收！",
                type: "success"
              });
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
          this.codeString = "60";
          this.intervalCode = setInterval(() => {
            if (this.codeString === "0") {
              clearInterval(this.intervalCode)
              this.codeString = "验证码";
            } else {
              this.codeString = (parseInt(this.codeString) - 1) + "";
            }
          }, 1000);
        } else {
          this.$message({
            message: "请稍后再试！",
            type: "warning"
          });
        }
      },
      clearDialog() {
        this.password = "";
        this.phoneNumber = "";
        this.email = "";
        this.avatar = "";
        this.showDialog = false;
        this.code = "";
        this.dialogTitle = "";
        this.passwordFlag = null;
      },
      handleAdd() {
        // const route = this.$router.resolve({
        //   path: '/articleEdit'
        // });
        // window.location.assign(route.href);
        this.$router.push({path: '/articleEdit'});
      },
      handleEdit(id) {
        // window.open("/articleEdit?id=" + id);
        // window.open({path: '/articleEdit', query: {id: id}});
        // window.location.assign(`/articleEdit/${id}`);
        const route = this.$router.resolve({
          path: '/articleEdit',
          query: { id: id }
        });
        window.location.assign(route.href);
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
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .page-container {
    width: 90%;
    background: var(--background);
    margin: 25px auto 0;
    padding: 0 20px 20px 20px;
    display: flex;
  }

  .user-head {
    height: 130px;
    position: relative;
    background: linear-gradient(-45deg, #87CEFA, #eec1ea, #bdbdf0);
  }

  .user-head-container {
    display: flex;
    align-items: center;
  }

  .user-name {
    font-size: 32px;
    margin-left: 20px;
  }

  .in-up-container {
    height: calc(100vh - 60px);
    position: relative;
  }

  .in-up {
    opacity: 0.9;
    border-radius: 10px;
    box-shadow: 0 15px 30px var(--miniMask), 0 10px 10px var(--miniMask);
    position: relative;
    overflow: hidden;
    width: 750px;
    max-width: 100%;
    min-height: 450px;
    margin: 10px;
  }

  .in-up p {
    font-size: 14px;
    letter-spacing: 1px;
    margin: 20px 0 30px 0;
  }

  .in-up a {
    color: var(--black);
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .form-container {
    position: absolute;
    height: 100%;
    transition: all 0.5s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
  }

  .form-container div {
    background: var(--white);
    flex-direction: column;
    padding: 0 20px;
    height: 100%;
  }

  .form-container input {
    background: var(--maxLightGray);
    border-radius: 2px;
    border: none;
    padding: 12px 15px;
    margin: 10px 0;
    width: 100%;
    outline: none;
  }

  .in-up button {
    border-radius: 2rem;
    border: none;
    background: var(--lightRed);
    color: var(--white);
    font-size: 16px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .in-up button:hover {
    animation: scale 0.8s ease-in-out;
  }

  .in-up button.ghost {
    background: transparent;
    border: 1px solid var(--white);
  }

  .sign-up-container button {
    margin-top: 20px;
  }

  .overlay-container {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .overlay {
    background: var(--gradualRed);
    color: var(--white);
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
  }

  .overlay-panel {
    position: absolute;
    top: 0;
    flex-direction: column;
    height: 100%;
    width: 50%;
    transition: all 0.5s ease-in-out;
  }

  .overlay-right {
    right: 0;
    transform: translateY(0);
  }

  .overlay-left {
    transform: translateY(-20%);
  }

  .in-up.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  .in-up.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .in-up.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
  }

  .in-up.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .in-up.right-panel-active .overlay-left {
    transform: translateY(0);
  }

  .in-up.right-panel-active .overlay-right {
    transform: translateY(20%);
  }

  .user-container {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .left-container {
    width: 75%;
    margin: 0 10px 0 0;
  }

  .user-article {
    background: var(--white);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-radius: 10px;
  }

  .article-first {
    color: var(--greyFont);
    padding: 15px 0 15px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .add-article-button {
    margin: 0 20px;
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

  .recent-post-item {
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 10px;
    text-decoration: none; /* 移除下划线 */
    color: inherit;
    animation: hideToShow 1s ease-in-out;
    border-top: 1px dashed var(--lightGray);
  }

  .recent-post-item-post {
    display: flex;
    flex-direction: column;
    padding: 20px 35px;
  }

  .recent-post-item-post h3 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .post-meta {
    font-size: 12px;
    color: var(--greyFont);
  }

  .post-meta span:not(:last-child) {
    margin-right: 10px;
  }

  .recent-post-desc {
    font-size: 15px;
    line-height: 1.7;
    /* 超出4行就... */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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

  .sort-label {
    position: absolute;
    bottom: 20px;
  }

  .sort-label span {
    padding: 3px 10px;
    background-color: var(--maxLightGray);
    border-radius: 3px;
    font-size: 14px;
    color: var(--greyFont);
    transition: all 0.3s;
    cursor: pointer;
    user-select: none;
  }

  .sort-label span:hover {
    background-color: var(--themeBackground);
    color: var(--white);
  }

  .right-container {
    overflow-y: auto;
    width: 25%;
    margin: 0 0 0 10px;
  }

  .user-info {
    background: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
  }

  .user-right {
    width: 50%;
    background: var(--maxWhiteMask);
    padding: 20px;
  }

  .user-title {
    text-align: right;
    user-select: none;
  }

  .user-content {
    text-align: left;
    min-width: 100px;
  }

  .user-title div {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .user-content > div {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .user-content >>> .el-input__inner, .user-content >>> .el-textarea__inner {
    border: none;
    background: var(--whiteMask);
    font-family: var(--globalFont), serif;
  }

  .user-content >>> .el-input__count {
    background: var(--transparent);
    user-select: none;
  }

  .changeInfo {
    color: var(--white);
    font-size: 0.75rem;
    cursor: pointer;
    background: var(--themeBackground);
    padding: 3px;
    border-radius: 0.2rem;
    user-select: none;
  }

  @media screen and (max-width: 920px) {
    .user-head-container {
      left: 5%;
    }

    .user-info {
      width: 90%;
    }

    .user-left {
      width: 100%;
    }

    .user-right {
      display: none;
    }
  }
</style>
