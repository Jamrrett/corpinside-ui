<template>
  <div>
    <!-- 导航栏 -->
    <div v-show="toolbar.visible || ($common.mobile() || mobile)" class="toolbar-content myBetween">
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
               @click="toolbarDrawer = !toolbarDrawer"
               :class="{ enter: toolbar.enter }">
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

    <div class="tool-button color-mode-button" @click="changeColor()">
      <SvgIcon :name="darkMode === $constant.DarkMode.DARK ? 'light' : 'dark'" :size="24" />
      </div>

    <div class="tool-button go-top-button" v-if="showGoTopButton" @click="toTop()">
      <SvgIcon name="go-top" :size="30" />
    </div>

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
const SvgIcon = () => import( './icon');
const Footer = () => import( './common/footer.vue');
import { getWebInfo } from "@/utils/data/webInfo";
import { getSortInfo } from "@/utils/data/sort";
import { getSortCorporationInfo } from "@/utils/data/sortCorporation";

export default {
  components: {
    SvgIcon,
    Footer
  },
  data() {
    return {
      showGoTopButton: false,
      mouseAnimation: false,
      darkMode: localStorage.getItem('DarkMode') || this.$constant.DarkMode.LIGHT,
      scrollTop: 0,
      toolbarDrawer: false,
      mobile: window.innerWidth <= 840,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollPage);
    window.addEventListener('storage', this.handleStorageChange);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScrollPage);
    window.removeEventListener('storage', this.handleStorageChange);
  },
  watch: {
    scrollTop(scrollTop) {
      this.showGoTopButton = scrollTop > window.innerHeight / 2;
    },
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
    this.setColor();
  },
  computed: {
    toolbar() {
      return this.$store.state.toolbar;
    },
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
      this.$http.get(this.$constant.baseURL + '/user/logout')
        .then((res) => {
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });
      this.$store.commit('loadCurrentUser', {});
      localStorage.removeItem('userToken');
      // if (this.$route.path === '/') {
      //   this.$router.go(0);
      // } else {
      //   this.$router.push({ path: '/' });
      // }
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
    handleStorageChange(event) {
      if (event.key === 'DarkMode') {
        this.darkMode = event.newValue;
        this.setColor();
      }
    },
    changeColor() {
      const newMode = this.darkMode === this.$constant.DarkMode.LIGHT ? this.$constant.DarkMode.DARK : this.$constant.DarkMode.LIGHT;
      this.darkMode = newMode;
      localStorage.setItem('DarkMode', newMode);
      this.setColor();
    },
    setColor() {
      let root = document.querySelector(':root');

      if (this.darkMode === this.$constant.DarkMode.DARK) {
        root.style.setProperty('--background', '#1d1d1d');
        root.style.setProperty('--fontColor', '#cccccc');
        root.style.setProperty('--borderColor', '#4F4F4F');
        root.style.setProperty('--borderHoverColor', 'black');
        root.style.setProperty('--articleFontColor', '#E4E4E4');
        root.style.setProperty('--articleGreyFontColor', '#D4D4D4');
        root.style.setProperty('--commentContent', '#D4D4D4');
        root.style.setProperty('--favoriteBg', '#1e1e1e');
        root.style.setProperty('--content-background-color', '#2a2a2a');
        root.style.setProperty('--content-background-color-light', '#2a2a2a');
        root.style.setProperty('--hover-box-shadow', '0 2px 13px 6px rgba(20, 20, 20, 0.7)');
        root.style.setProperty('--theme-green', '#2b918a');
        root.style.setProperty('--theme-green-hover', '#20817a');
        root.style.setProperty('--theme-green-active', '#1d716a');
        root.style.setProperty('--theme-purple', '#7b7bc7');
        root.style.setProperty('--theme-pink', '#a877a2');
        root.style.setProperty('--theme-blue', '#347ab2');
        root.style.setProperty('--white-content', '#eeeeee');
        root.style.setProperty('--grey-content', '#898989');
        root.style.setProperty('--grey-background', '#444444');
        root.style.setProperty('--label-background', 'rgba(128, 128, 128, 0.2)');
        root.style.setProperty('--list-item-border', '#494949');
        root.style.setProperty('--content-border', '#777777');
      } else {
        root.style.setProperty('--background', '#f1f3f5');
        root.style.setProperty('--fontColor', '#000000');
        root.style.setProperty('--borderColor', 'rgba(0, 0, 0, 0.5)');
        root.style.setProperty('--borderHoverColor', 'rgba(110, 110, 110, 0.4)');
        root.style.setProperty('--articleFontColor', '#1F1F1F');
        root.style.setProperty('--articleGreyFontColor', '#616161');
        root.style.setProperty('--commentContent', '#F7F9FE');
        root.style.setProperty('--favoriteBg', '#f7f9fe');
        root.style.setProperty('--content-background-color', '#ffffff');
        root.style.setProperty('--content-background-color-light', '#f3f5f7');
        root.style.setProperty('--hover-box-shadow', '0 2px 13px -2px rgba(110, 110, 110, 0.4)');
        root.style.setProperty('--theme-green', '#39c5bb');
        root.style.setProperty('--theme-green-hover', '#30b0aa');
        root.style.setProperty('--theme-green-active', '#28a098');
        root.style.setProperty('--theme-purple', '#bdbdf0');
        root.style.setProperty('--theme-pink', '#eec1ea');
        root.style.setProperty('--theme-blue', '#87cefa');
        root.style.setProperty('--white-content', '#ffffff');
        root.style.setProperty('--grey-content', '#797979');
        root.style.setProperty('--grey-background', '#bbbbbb');
        root.style.setProperty('--label-background', 'rgba(200, 200, 200, 0.2)');
        root.style.setProperty('--list-item-border', '#cccccc');
        root.style.setProperty('--content-border', '#aaaaaa');
      }
    },

    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    onScrollPage() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
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
