import Vue from 'vue'
import Vuex from 'vuex'
// vuex的变量默认是保存在内存里面,所以页面一刷新,所有的值回归初始化,无法做到持久存储,这也就是为什么需要本地存储
import createPersistedState from 'vuex-persistedstate'
// 导入axios
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userInfo: {} // 定义用户信息对象
  },
  // 全局计算属性,依赖state里的值返回内容
  getters: {
    username: (state) => state.userInfo.username, // 用户名
    nickname: (state) => state.userInfo.nickname, // 昵称
    user_pic: (state) => state.userInfo.user_pic // 用户头像
  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    },
    // 更新用户的信息
    updateUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    async initUserInfo (store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {},
  plugins: [createPersistedState()] // 配置为 vuex 的插件，注入持久化插件
})
