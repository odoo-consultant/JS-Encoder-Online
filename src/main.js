import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import cookie from './utils/cookie'
import i18n from './i18n'

import '@assets/css/code-font.css'

// 插件
import './plugins/alert'
import message from './plugins/message'
Vue.prototype.$message = message
import { codemirror } from 'vue-codemirror'
Vue.use(codemirror)

Vue.config.productionTip = false


// Vue.use(vuexI18n.plugin, store)
// // import predefined localizations
// import tZhCN from './i18n/zh-CN.js'
// import tEn from './i18n/en.js'
// // add translations
// Vue.i18n.add('zh-CN', tZhCN)
// Vue.i18n.add('en', tEn)
// // default locale is english
// Vue.i18n.set('en')

// console.log(lang.lang)

// 请求方法
import api from '@service/api'
Vue.prototype.$http = api

// 过滤器
Vue.filter('preNickname', function (nickname) {
  return nickname.substr(0, 2)
})

Vue.filter('formatNumber', function (num) {
  return num >= 1e3 ? (num / 1e3).toFixed(1) + 'k' : num
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// 防止用户手动修改sessionStorage
window.addEventListener('storage', function (e) {
  sessionStorage.setItem(e.key, e.oldValue)
})

window.onbeforeunload = function () {
  cookie.del('AUTH_TOKEN')
}