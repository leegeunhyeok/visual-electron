import Vue from 'vue'
// import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Config from './common/ConfigManager.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
/* 현재 axios 미사용 */
// Vue.prototype.$http = axios

/* Config Manager */
Vue.prototype.$config = new Config()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
