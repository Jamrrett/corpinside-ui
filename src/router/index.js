import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../components/home'),
    children: [{
      path: '/',
      name: 'index',
      component: () => import('../components/index')
    }, {
      path: '/sort/:sortId',
      name: 'sort',
      component: () => import('../components/sort')
    }, {
      path: '/sortCorporation/:sortCorporationId',
      name: 'sortCorporation',
      component: () => import('../components/sortCorporation')
    }, {
      path: '/article/:id',
      name: 'article',
      component: () => import('../components/article')
    }, {
      path: '/corporation/:id',
      name: 'corporation',
      component: () => import('../components/corporation')
    }, {
      path: '/department/:id',
      name: 'department',
      component: () => import('../components/department')
    }, {
    //   path: '/game',
    //   name: 'game',
    //   component: () => import('../components/game')
    // }, {
    //   path: '/HeaRT',
    //   name: 'HeaRT',
    //   component: () => import('../components/HeaRT')
    // }, {
      path: '/about',
      name: 'about',
      component: () => import('../components/about')
    // }, {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../components/login')
    // }, {
    //   path: '/user/:userId',
    //   name: 'user',
    //   component: () => import('../components/user')
    }, {
      path: '/articleEdit',
      name: 'articleEdit',
      component: () => import('../components/articleEdit')
    }]
  },
  {
    path: '/admin',
    meta: {requiresAuth: true},
    component: () => import('../components/admin/admin'),
    children: [{
      path: '/admin',
      name: 'main',
      component: () => import('../components/admin/main')
    }, {
      path: '/admin/webEdit',
      name: 'webEdit',
      component: () => import('../components/admin/webEdit')
    }, {
      path: '/admin/userList',
      name: 'userList',
      component: () => import('../components/admin/userList')
    }, {
      path: '/admin/articleList',
      name: 'articleList',
      component: () => import('../components/admin/articleList')
    }, {
      path: '/admin/corporationList',
      name: 'corporationList',
      component: () => import('../components/admin/corporationList')
    }, {
      path: '/admin/corporationEdit',
      name: 'corporationEdit',
      component: () => import('../components/admin/corporationEdit')
    }, {
      path: '/admin/departmentList',
      name: 'departmentList',
      component: () => import('../components/admin/departmentList')
    }, {
      path: '/admin/departmentEdit',
      name: 'departmentEdit',
      component: () => import('../components/admin/departmentEdit')
    }]
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../components/admin/verify')
  },
  {
    path: '*', // 匹配所有未定义的路由
    name: 'notFound',
    component: () => import('../components/not-found')
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.NODE_ENV === 'production'
  //   ? '/corpinside/'
  //   : '/',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('adminToken')) {
      next({
        path: '/verify',
        query: {redirect: to.fullPath}
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
