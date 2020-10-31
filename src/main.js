// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(axios);

Vue.config.productionTip = false
Vue.prototype.$axios = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
