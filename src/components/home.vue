<template>
  <div>
    <!-- 导航栏 -->
    <div class="toolbar-content myBetween">
      <div style="width: 100%;max-width: 1600px;margin: 0 auto">
        <div class="toolbar-container myBetween" style="width: 90%;margin: 0 auto">
          <!-- 网站名称 -->
          <div>
            <router-link class="toolbar-title" :to="{ path: '/' }">
              <h2>{{$store.state.webInfo.webName}}</h2>
            </router-link>
          </div>

          <!-- 手机导航按钮 -->
          <div v-if="$common.mobile() || mobile"
               class="toolbar-mobile-menu"
               @click="toolbarDrawer = !toolbarDrawer">
            <i class="el-icon-s-operation"></i>
          </div>

          <!-- 导航列表 -->
          <div v-else class="menu-container">
            <div class="menu-item-container" v-for="menuItem in this.$constant.menuItems" :key="menuItem.title">
              <router-link :to="{ path: menuItem.path }">
                  <div class="menu-item">
                    <span>{{ menuItem.title }}</span>
                  </div>
              </router-link>
            </div>

            <!-- 个人中心 -->
            <div v-if="!$common.isEmpty($store.state.currentUser)">
              <el-dropdown placement="bottom">
                <el-avatar class="user-avatar" :size="36"
                           style="margin-top: 12px;background-color: var(--lightGreen);width: 36px;height: 36px"
                           :src="!$common.isEmpty($store.state.currentUser)?$store.state.currentUser.avatar:$store.state.webInfo.avatar"
                           @click.native="handleAvatarClick">
                </el-avatar>

                <el-dropdown-menu>
                  <router-link :to="{ path: `/user/${$store.state.currentUser.id}`}"
                       style="width: 100%;height: 100%;text-decoration: none;color: inherit"
                       v-if="!$common.isEmpty($store.state.currentUser)">
                    <el-dropdown-item>
                        <i class="fa fa-user-circle" aria-hidden="true"></i> <span>个人中心</span>
                    </el-dropdown-item>
                  </router-link>
                  <el-dropdown-item @click.native="logout()" v-if="!$common.isEmpty($store.state.currentUser)">
                    <i class="fa fa-sign-out" aria-hidden="true"></i> <span>退出</span>
                  </el-dropdown-item>
                  <router-link :to="{ path: `/login` }"
                       @click.native="setRedirectPath"
                       style="width: 100%;height: 100%;text-decoration: none;color: inherit"
                       v-if="$common.isEmpty($store.state.currentUser)">
                    <el-dropdown-item>
                      <i class="fa fa-sign-in" aria-hidden="true"></i> <span>登录&thinsp;<span style="font-size: 13px">/</span>&nbsp;注册</span>
                    </el-dropdown-item>
                  </router-link>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="main-container" class="main-container">
      <router-view></router-view>
    </div>
    <Footer />

    <DarkModeButton />
    <GoTopButton />

    <el-drawer :visible.sync="toolbarDrawer"
               :show-close="false"
               size="65%"
               custom-class="toolbarDrawer"
               title="CorpInside"
               direction="ltr">
      <div>
        <ul class="small-menu">
          <li v-for="menuItem in this.$constant.menuItems" :key="menuItem.title" @click="smallMenu({ path: menuItem.path })">
            <div>
              <span>{{ menuItem.title }}</span>
            </div>
          </li>

          <template v-if="!$common.isEmpty($store.state.currentUser)">
            <template v-if="$common.isEmpty($store.state.currentUser)">
              <li @click="smallMenu({path: '/login'})">
                <div>
                  <i class="fa fa-sign-in" aria-hidden="true"></i>
                  <span>&nbsp;登录</span>
                </div>
              </li>
            </template>
            <template v-else>
              <li @click="smallMenu({path: `/user/${$store.state.currentUser.id}`})">
                <div>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                  <span>&nbsp;个人中心</span>
                </div>
              </li>
              <li @click="smallMenuLogout()">
                <div>
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  <span>&nbsp;退出</span>
                </div>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import DarkModeButton from "./common/dark-mode-button.vue";
import GoTopButton from "./common/go-top-button.vue";
const Footer = () => import( './common/footer.vue');
import { getWebInfo } from "@/utils/data/webInfo";
import { getSortInfo } from "@/utils/data/sort";
import { getSortCorporationInfo } from "@/utils/data/sortCorporation";

export default {
  components: {
    DarkModeButton,
    GoTopButton,
    Footer,
  },
  data() {
    return {
      toolbarDrawer: false,
      mobile: window.innerWidth <= 840,
    };
  },
  created() {
    this.getWebInfo();
    this.getSortInfo();
    this.getSortCorporationInfo();

    window.addEventListener('resize', () => {
      let docWidth = window.innerWidth;
      if (docWidth <= 840) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
  },
  computed: {
    sortInfo() {
      return this.$store.state.sortInfo;
    }
  },
  methods: {
    setRedirectPath() {
      sessionStorage.setItem('redirectPath', this.$route.fullPath);
    },
    smallMenu(data) {
      if (data.path === '/login') {
        this.setRedirectPath();
      }
      this.$router.push(data);
      this.toolbarDrawer = false;
    },
    smallMenuLogout() {
      this.logout();
      this.toolbarDrawer = false;
    },
    logout() {
      this.$store.commit('loadCurrentUser', {});
      localStorage.removeItem('userToken');

      if (this.$store.state.currentAdmin) {
        this.$store.commit('loadCurrentAdmin', {});
        localStorage.removeItem('adminToken');
      }
      if (this.$route.path.includes('articleEdit')) {
        window.location.assign('/');
      } else {
        window.location.assign(this.$route.path);
      }
    },
    getWebInfo() {
      const webInfo = getWebInfo();
      this.$store.commit('loadWebInfo', webInfo);
    },
    getSortInfo() {
      const sortInfo = getSortInfo();
      this.$store.commit('loadSortInfo', sortInfo);
    },
    getSortCorporationInfo() {
      const sortCorporationInfo = getSortCorporationInfo();
      this.$store.commit('loadSortCorporationInfo', sortCorporationInfo);
    },
    handleAvatarClick() {
      if (!this.$common.isEmpty(this.$store.state.currentUser)) {
        // 用户已登录，跳转到个人中心
        this.$router.push({ path: `/user/${this.$store.state.currentUser.id}` });
      } else {
        // 用户未登录，跳转到登录页面
        sessionStorage.setItem('redirectPath', this.$route.fullPath);
        this.$router.push({ path: '/login' });
      }
    },
  }
};
</script>

<style scoped>
.main-container {
  padding-top: 60px;
  background: var(--background);
  min-height: calc(100vh - 60px);
  max-width: 1600px;
  margin: auto;
}

.toolbar-content {
  width: 100%;
  height: 60px;
  background: var(--content-background-color);
  position: fixed;
  z-index: 100;
  user-select: none;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.05);
}

.toolbar-title {
  cursor: pointer;
}

.toolbar-mobile-menu {
  font-size: 30px;
  cursor: pointer;
}

.menu-container {
  display: flex;
  justify-content: flex-end;
  padding: 0;

  .menu-item-container {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    position: relative;
    cursor: pointer;

    .menu-item {
      padding: 0 16px;
    }
  }

  .menu-item-container:not(:first-child):after {
    content: "";
    display: block;
    position: absolute;
    bottom: 50%;
    left: 0;
    background-color: var(--borderColor);
    height: 20%;
    width: 1px;
    transform: translateX(50%) translateY(50%);
  }

  .menu-item-container:hover {
    color: var(--hover-color-text);
  }
}

</style>
