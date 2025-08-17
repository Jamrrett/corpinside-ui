<template>
  <div class="sidebar">
    <div @click="collapse()" style="color: rgb(96, 98, 102);cursor: pointer;background-color: #ebf1f6;display: flex">
      <i class="el-icon-menu" style="margin: 14px;font-size: 17px"></i>
      <div style="font-size: 15px;margin-top: 13px">折叠</div>
    </div>
    <el-menu class="sidebar-el-menu"
             background-color="#ebf1f6"
             text-color="#606266"
             active-text-color="#20a0ff"
             unique-opened
             :default-active="$router.currentRoute.path"
             router>
      <el-menu-item v-for="item in items" :index="item.index" :key="item.index">
        <i :class="item.icon"></i>
        {{ item.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      items: [{
        icon: 'el-icon-s-home',
        index: '/admin',
        title: '系统首页',
      }, {
        icon: 'el-icon-s-tools',
        index: '/admin/webEdit',
        title: '网站设置',
      }, {
        icon: 'el-icon-user-solid',
        index: '/admin/userList',
        title: '用户管理',
      }, {
        icon: 'el-icon-postcard',
        index: '/admin/articleList',
        title: '文章管理',
      }, {
        icon: 'el-icon-office-building',
        index: '/admin/corporationList',
        title: '公司管理',
      }, {
        icon: 'el-icon-suitcase',
        index: '/admin/departmentList',
        title: '部门管理',
      }]
    };
  },

  computed: {},

  watch: {},

  created() {

  },

  mounted() {

  },

  methods: {
    collapse() {
      if (this.isCollapse) {
        $('.sidebar').css('width', '43px');
        $('.content-box').css('left', '43px');
      } else {
        $('.sidebar').css('width', '130px');
        $('.content-box').css('left', '130px');
      }
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  width: 130px;
  user-select: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar > ul {
  height: 100%;
}

.sidebar-el-menu .el-menu-item {
  padding: 0 10px !important;
}
</style>
