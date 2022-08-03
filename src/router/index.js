import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      { path: 'home', component: () => import('@/views/home') },
      { path: 'user-info', component: () => import('@/views/user/userInfo') },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/userAvatar')
      },
      { path: 'user-pwd', component: () => import('@/views/user/userPwd') },
      { path: 'art-cate', component: () => import('@/views/article/artCate') },
      { path: 'art-list', component: () => import('@/views/article/artList') }
    ]
  },
  { path: '/reg', component: () => import('@/views/register') },
  { path: '/login', component: () => import('@/views/login') }
]

const router = new VueRouter({ routes })

export default router
