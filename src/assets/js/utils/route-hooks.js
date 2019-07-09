import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import Common from '@/assets/js/common';

//路由钩子
export function routeHook() {
  const whiteList = ['/app/login'];
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (Common.getStorage('userLoginInfo')) {
      if (to.path === '/app/login') {
        next({ path: '/' });
        NProgress.done();
      } else {
        next();
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next('/app/login');
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    NProgress.done(); // 结束Progress
  });
}
