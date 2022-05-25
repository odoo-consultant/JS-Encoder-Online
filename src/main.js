import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import cookie from './utils/cookie'
import i18n from './i18n'

import agconnect from '@agconnect/api'; 
import '@agconnect/instance'; 
import '@hmscore/analytics-web';

import '@assets/css/code-font.css'

// 插件
import './plugins/alert'
import message from './plugins/message'
Vue.prototype.$message = message
import { codemirror } from 'vue-codemirror'
Vue.use(codemirror)

Vue.config.productionTip = false

const agConnectConfig = 
{
  "agcgw":{
    "backurl":"connect-dra.hispace.hicloud.com",
    "url":"connect-dra.dbankcloud.cn",
    "websocketbackurl":"connect-ws-dra.hispace.dbankcloud.com",
    "websocketurl":"connect-ws-dra.hispace.dbankcloud.cn"
  },
  "agcgw_all":{
    "CN":"connect-drcn.dbankcloud.cn",
    "CN_back":"connect-drcn.hispace.hicloud.com",
    "DE":"connect-dre.dbankcloud.cn",
    "DE_back":"connect-dre.hispace.hicloud.com",
    "RU":"connect-drru.hispace.dbankcloud.ru",
    "RU_back":"connect-drru.hispace.dbankcloud.cn",
    "SG":"connect-dra.dbankcloud.cn",
    "SG_back":"connect-dra.hispace.hicloud.com"
  },
  "websocketgw_all":{
    "CN":"connect-ws-drcn.hispace.dbankcloud.cn",
    "CN_back":"connect-ws-drcn.hispace.dbankcloud.com",
    "DE":"connect-ws-dre.hispace.dbankcloud.cn",
    "DE_back":"connect-ws-dre.hispace.dbankcloud.com",
    "RU":"connect-ws-drru.hispace.dbankcloud.ru",
    "RU_back":"connect-ws-drru.hispace.dbankcloud.cn",
    "SG":"connect-ws-dra.hispace.dbankcloud.cn",
    "SG_back":"connect-ws-dra.hispace.dbankcloud.com"
  },
  "client":{
    "cp_id":"260086000067293784",
    "product_id":"99536292102315474",
    "client_id":"899462202602310208",
    "client_secret":"A4A55FA62B57E04779A6359195B46210D19D17556395C56C30352C0C9225B836",
    "project_id":"99536292102315474",
    "app_id":"243650030995833552",
    "api_key":"DAEDAI3hMMjQfsVv/YOFr8ZSPhEejDacOqwILbBsghMRviAzqLA6Bok6LoIsimzsU6Isx6K6RHXaryMfjONm9CbDw1pQeukILhutRw=="
  },
  "oauth_client":{
    "client_id":"106323439",
    "client_type":7
  },
  "app_info":{
    "app_id":"243650030995833552"
  },
  "service":{
    "analytics":{
      "collector_url":"datacollector-dra.dt.hicloud.com,datacollector-dra.dt.dbankcloud.cn",
      "collector_url_ru":"datacollector-drru.dt.dbankcloud.ru,datacollector-drru.dt.hicloud.com",
      "collector_url_sg":"datacollector-dra.dt.hicloud.com,datacollector-dra.dt.dbankcloud.cn",
      "collector_url_de":"datacollector-dre.dt.hicloud.com,datacollector-dre.dt.dbankcloud.cn",
      "collector_url_cn":"datacollector-drcn.dt.hicloud.com,datacollector-drcn.dt.dbankcloud.cn",
      "resource_id":"p1",
      "channel_id":""
    },
    "search":{
      "url":"https://search-dra.cloud.huawei.com"
    },
    "cloudstorage":{
      "storage_url":"https://ops-dra.agcstorage.link"
    },
    "ml":{
      "mlservice_url":"ml-api-dra.ai.dbankcloud.com,ml-api-dra.ai.dbankcloud.cn"
    }
  },
  "region":"SG",
  "configuration_version":"3.0"
};

// Initialize the configuration. 
agconnect.instance().configInstance(agConnectConfig); 
// // Initialize the Analytics Kit instance. 
// let analytics = agconnect.analytics();
Vue.prototype.$hiAnalytics = agconnect.analytics();

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