import Vue from "vue";
import Router from "vue-router";

import Login from "@/views/login/Login"
const Layout = () => import("@/components/layout/Layout");
const Home = () => import("@/views/home/Home");
const A = () => import("@/views/A");
const A1 = () => import("@/views/A1");
const A2 = () => import("@/views/A2");
const A3 = () => import("@/views/A3");



Vue.use(Router);

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      name: "home",
      hidden: true,
      children: [
        {
          path: "home",
          component: Home
        }
      ]
    },
    {
      path: "/tel",
      component: Layout,
      name: "Tel",
      meta: { title: "TODO"},
      children: [
        {
          path: "e",
          component: A,
          name: '待跟进列表',
          meta: { title: "待跟进列表"}
        },
        {
          path: "a1",
          component: A1,
          name: 'A1',
          meta: { title: "纤维球"}
        },
        {
          path: "a2",
          component: A2,
          name: 'A2',
          meta: { title: "安抚阿达"}
          
        },
        {
          path: "a3",
          component: A3,
          name: 'A3',
          meta: { title: "冷月查"}
          
        },
      ]
    },
    {
        path: "/login",
        component: Login,
        hidden: true
    }
//   { path: "*", redirect: "/404", hidden: true }
    
  ]
});