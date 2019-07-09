import Vue from 'vue'
import App from './App.vue'
import './plugins/element/element.js'
import Router from "./router";
import Store from "./store";

Vue.config.productionTip = false

new Vue({
  router: Router,
  store: Store,
  render: h => h(App),
}).$mount('#app')
