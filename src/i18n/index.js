import Vue from 'vue'
import store from '@/store'
import vuexI18n from 'vuex-i18n'

import { jsonQueryString } from '@utils/url'
import localStore from '@utils/localStorage'

Vue.use(vuexI18n.plugin, store)

// import predefined localizations
import tZhCN from './zh-CN.js'
import tEn from './en.js'
import tJp from './jp.js'

// add translations
Vue.i18n.add('zh-CN', tZhCN)
Vue.i18n.add('en', tEn)
Vue.i18n.add('jp', tJp)

const langs = ['zh-CN', 'en', 'jp'] // 支持哪些语言
const defaultLang = langs[0] // 默认

function matchLang(rawLang) {
    if (rawLang) {
      rawLang = rawLang.toLowerCase()
    }
    let current = langs[1]
    switch (rawLang) {
      // case 'en-us':
      //   current = langs[1]
      //   break
      case 'jp':
      case 'ja':
      case 'ja-jp':
        current = langs[2]
        break
      case 'zh-cn':
      case 'zh-hans':
      case 'zh-sg':
      case 'zh-tw':
      case 'zh-hanf':
      case 'zh-hk':
      case 'zh-mo':
        current = langs[0]
        break
      default:      
        break
    }
    return current
}

function getLang() {
  let queries = jsonQueryString()
  let storeLang = localStore.get('lang')
  let rawLang
  let flag = false

  if (queries && queries['lang']) {
    rawLang = matchLang(queries['lang'])
    localStore.set('lang', rawLang)
  } else {
    rawLang = storeLang || matchLang(navigator.language)
  }

  langs.map(item => {
    if (item === rawLang) {
      flag = true
    }
  })
  return flag ? rawLang : defaultLang
}

function setLang(rawLang) {
  localStore.set('lang', rawLang)
}

const lang = getLang()

// default locale is english
Vue.i18n.set(lang)

Vue.i18n.fallback(langs[0])

export {
    // lang, // 获取到当前语言
    // langs, // 所支持的语言列表
    setLang
}
