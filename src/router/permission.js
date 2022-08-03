import router from './index'
import store from '@/store'

const whiteList = ['/login', '/reg', '/404'] // 定义白名单，所有不受权限控制的页面

// 全局前置路由守卫,在路由发生真正跳转之前,执行此函数
// next()路由全局前置守卫不会在触发,而是匹配路由表,让组件挂载
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了
    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息,才去请求用户信息保存到vuex里
      // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息了
      store.dispatch('initUserInfo')
    }
    next()
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      // 未登录,可以访问的路由地址,则放行
      next()
    } else {
      next('/login') // 强制切换到登录路径上,next('具体路径')还会再次触发路由全局前置守卫
    }
  }
})

/*
退出登录,再重新登录,不刷新页面,只走相关组件代码,异步dom切换,不会导致所有代码重新执行,App.vue不执行
效果不对,换个账号它得重新请求用户数据
解决:
1,可以在登录页面,登录成功后,再发请求去拿到用户信息
2,可以在全局前置路由守卫写
*/
