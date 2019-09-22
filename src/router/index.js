import Vue from 'vue'
import Router from 'vue-router'
import config from './config'

Vue.use(Router);

const router = new Router({
  routes: config,
});

router.beforeEach((to, from, next) => {
  let user = to.path.indexOf('user');
  let match = to.path.indexOf('match');
  if(match !== -1 || user !== -1) {
    if(localStorage.getItem('userInfo')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
  /*if (to.matched.some(function (item) {
    return item.meta.login_require
  })) {
    next('/login')
  } else {
    next()
  }*/
});

export default router


