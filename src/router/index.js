import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/home'
import store from '@store/index.js'
import cookie from '@utils/cookie'
import localStore from '@utils/localStorage'
import baseUrl from '@service/env'

Vue.use(VueRouter)

/**
 * meta
 * hideHAF 隐藏header和footer
 * requireAuth 登录后才能进入该页面
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@views/signup')
  },
  {
    path: '/forgetPwd',
    name: 'ForgetPwd',
    component: () => import('@views/forgetPwd')
  },
  {
    path: '/resetPwd',
    name: 'ResetPwd',
    component: () => import('@views/resetPwd')
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('@views/explore'),
  },
  {
    path: '/features',
    name: 'Features',
    component: () => import('@views/features')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@views/feedback'),
    meta: { requireAuth: true }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@views/user'),
    redirect: '/user/:id/works',
    children: [
      {
        path: 'works',
        name: 'Works',
        component: () => import('@views/user/works')
      },
      {
        path: 'liked',
        name: 'Liked',
        component: () => import('@views/user/liked')
      },
      {
        path: 'following',
        name: 'Following',
        component: () => import('@views/user/following')
      },
      {
        path: 'followers',
        name: 'Followers',
        component: () => import('@views/user/followers')
      },
      {
        path: 'cycleBin',
        name: 'CycleBin',
        component: () => import('@views/user/cycle-bin'),
        meta: { requireAuth: true }
      },
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@views/settings'),
    redirect: '/settings/profile',
    meta: { requireAuth: true },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@views/settings/profile'),
        meta: { requireAuth: true }
      },
      {
        path: 'code',
        name: 'Code',
        component: () => import('@views/settings/code'),
        meta: { requireAuth: true }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@views/settings/account'),
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/newWork',
    name: 'NewWork',
    component: () => import('@views/instance'),
    meta: { hideHAF: true }
  },
  {
    path: '/work/:username/:instanceID',
    name: 'Work',
    component: () => import('@views/instance'),
    meta: { hideHAF: true },
  },
  {
    path: '*',
    name: '404',
    component: () => import('@views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.name && from.name) { 
    router.app.$hiAnalytics.pageEnd(window.location.host + '/#' + from.path); 
    router.app.$hiAnalytics.pageStart(window.location.host + '/#' + to.path); 
  }   
  // 每次跳转页面取消之前的请求
  // try {
  //   store.state.cancelRequest.cancelTokenArr.forEach((cancelToken) => {
  //     cancelToken('over')
  //   })
  //   store.commit('cancelRequest/clearToken')
  // } catch (error) {
  //   console.log(error)
  // }
  const api = Vue.prototype.$http
  const message = Vue.prototype.$message
  if (to.name === 'Home') {
    const { type, code, state: csrfT } = to.query
    const OauthTypeList = ['github', 'gitee']

    // console.log('AUTH_TOKEN=' + cookie.get('AUTH_TOKEN'))    
    // 如果参数满足要求则为第三方登录绑定，如果没有满足请求，则进行普通自动登录
    if (code && OauthTypeList.includes(type) && csrfT) {
      /**
       * 页面加载前判断url中是否包含code参数，请求后端数据
       * 请求数据成功后，如果用户没有注册过账号，需要跳转至注册页面注册
       * 如果注册了但没有和账号绑定过，需要跳转至登录页面登录
       */
      // csrfT用于防止csrf攻击
      const localCsrfT = cookie.get('CSRF_TOKEN')
      if (csrfT === localCsrfT || type === 'gitee' || type === 'github') {
        cookie.del('CSRF_TOKEN')
        try {
          const authT = cookie.get('AUTH_TOKEN')

          const redirectUri = baseUrl.client + '/?type=' + type
          const giteeRes = type === 'gitee' ? await api.loginGitee({ code, redirect_uri: redirectUri }, authT ? { headers: { token: authT } } : {}) : await api.loginGithub({ code, redirect_uri: redirectUri }, authT ? { headers: { token: authT } } : {})
          const { state: bindState, token: tmpToken, msg: errCode } = giteeRes
          // 在本地已有登录凭证，说明是在登录状态下进行第三方绑定
          if (authT && bindState) {
            // message.success('绑定第三方账户成功！')
            message.success(Vue.i18n.translate('signin.bindSuccessTips'))
            login()
          } else {
            // 存储临时token用于第三方登录绑定账号
            sessionStorage.setItem('TMP_OAUTH_TOKEN', tmpToken)
            if (bindState) {
              // 绑定账号了，直接将token传过去获取登录信息
              const oauthLoginRes = await api.oauthLogin({session_id: tmpToken}, { headers: { token: tmpToken } })
              const { state: loginState, token: loginToken, data } = oauthLoginRes
              if (loginState) {
                // 存储请求权限凭证
                cookie.set('AUTH_TOKEN', loginToken, Infinity, {
                  secure: true,
                  sameSite: 'Lax',
                })
                // 存储用户信息到VueX
                const { username, name: nickname, userPicture: avatar } = data
                store.commit('setLoginState', true)
                store.commit('setLoginInfo', {
                  username,
                  nickname,
                  avatar,
                })
                sessionStorage.removeItem('TMP_OAUTH_TOKEN')
                // 临时的第三方登录TMP_REMEMBER_ME
                sessionStorage.setItem('TMP_REMEMBER_ME', true)
                history.replaceState({}, '', '/')
                // message.success('登录成功！')
              } else {
                // message.error('登录失败！')
              }
            } else {
              if (errCode === 1) {
                message.error(Vue.i18n.translate('signin.bindErrorMessage'))
                next('/')
              } else {
                // 没有绑定过账号就弹出dialog询问用户是否有账号
                store.commit('setVisibleDialogName', 'loginVerify')
              }
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      await login()
    }
  } else {
    await login()
  }
  next()
})

async function login () {
  const api = Vue.prototype.$http
  // const message = Vue.prototype.$message
  // 在本地存有REMEMBER_ME或在session中存有TMP_REMEMBER_ME(第三方记住我)进行正常登录
  const loginState = store.state.loginState
  const rememberMe = localStore.get('REMEMBER_ME')
  const oauthRememberMe = sessionStorage.getItem('TMP_REMEMBER_ME')

  if (!loginState && (rememberMe === true || oauthRememberMe)) {
    try {
      const res = await api.verifyLogin()
      if (res.state) {
        const { data, token } = res
        // 存储请求权限凭证
        cookie.set('AUTH_TOKEN', token, Infinity)
        // 存储用户信息到VueX
        const {
          username,
          name: nickname,
          userPicture: avatar,
        } = data
        store.commit('setLoginState', true)
        store.commit('setLoginInfo', {
          username,
          nickname,
          avatar,
        })
        // message.success('登录成功！')
      } else {
        // message.error('登录失败！')
      }
    } catch (err) {
      console.log(err)
    }
  }
}

router.beforeResolve((to, from, next) => {
  const loginState = store.state.loginState
  if (to.meta.requireAuth && !loginState) {
    Vue.prototype.$message.info(Vue.i18n.translate('common.loginRequiredTips'))
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.name === 'Home') {
    // 清除浏览器地址栏中的参数
    history.replaceState({}, '', '/')
  }
  // 退出用户主页时清除用户信息
  const allowList = ['Works', 'Liked', 'Following', 'Followers', 'CycleBin', 'User']
  if (allowList.includes(from.name) && !allowList.includes(to.name)) {
    store.commit('clearCurUserDetail')
  }
  window.scrollTo(0, 0)
})

// 捕获路由报错，避免因为浏览器缓存问题导致用户访问更新前的文件
router.onError((err) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.message.match(pattern);
  if (isChunkLoadFailed) {
    let chunkBool = sessionStorage.getItem('chunkError');
    let nowTimes = Date.now();
    if (chunkBool === null || chunkBool && nowTimes - parseInt(chunkBool) > 60000) {//路由跳转报错,href手动跳转
      sessionStorage.setItem('chunkError', 'reload');
      const targetPath = router.history.pending.fullPath;
      window.location.href = window.location.origin + targetPath;
    } else if (chunkBool === 'reload') { //手动跳转后依然报错,强制刷新
      sessionStorage.setItem('chunkError', Date.now());
      window.location.reload(true);
    }
  }
})

export default router
