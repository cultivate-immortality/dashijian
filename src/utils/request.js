import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 5000
})

// 定义请求拦截器,api里每次调用request都会先走这个请求拦截器
request.interceptors.request.use(
  function (config) {
    // config配置对象(要求后台的参数都在这个对象上)
    // 在请求前会触发一次,这个return交给axios源码内,根据配置项发起请求

    // 为请求头挂载 Authorization 字段
    // 把token值带给后台,后台才知道本地请求到底是哪个用户

    // 判断,登录页面和注册页面,vuex里无token,而且登录接口和注册接口也不需要携带token,其它页面需要
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  function (error) {
    /*
    请求发起前的代码,如果有异常报错,会直接进入这里
    返回一个拒绝状态的Promise对象(axios留在原地的Promise对象状态就为失败结果为error变量值)
    此函数类似catch函数()里return
    口诀:return非Promise对象值,会作为成功的结果,返回给下一个Promise对象(axios留在原地)
    口诀:returnPromise对象,这个Promise对象状态,返回给下一个Promise对象
    Promise.reject()原地留下一个新的Promise对象(状态为失败)它是Promise的类方法reject()
    等同于
    return newPromise((reslove,reject) => {reject(error)})
    */
    return Promise.reject(error)
  }
)

// 定义响应拦截器
request.interceptors.response.use(
  // 什么时候响应成功?当响应状态码为2xx/3xx开头的进这里,形参中的response是'成功的结果'
  function (response) {
    // return到axios原地Promise对象,作为成功的结果
    return response
  },

  // 什么时候响应失败?当响应状态码为4xx/5xx开头的进这里,形参中的rror是'失败的结果'
  function (error) {
    console.dir(error)
    if (error.response.status === 401) {
      // token过期,清除vuex,切换回登录页(被动退出登录状态)
      store.commit('updateToken', '')
      store.commit('updateUserInfo', {})
      router.push('/login')
      Message.error('身份过期,请重新登录')
    }
    // return到axios原地Promise对象位置,作为失败拒绝的状态,如果逻辑页面用try+catch或者catch函数捕获,可以捕获到我们传递过去的这个error变量的值
    return Promise.reject(error)
  }
)

export default request
