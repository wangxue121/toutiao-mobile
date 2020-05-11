import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// 这样做的目的可以避免访问和获取数据的名字不一致导致的问题
const USER_KEY = 'toutiao-user'

// 把数据放到容器里面的好处是，获取方便，数据发生变化时视图可以更新
// 为了数据可以持久化，把数据放到本地存储中
export default new Vuex.Store({
  // state 用来共享数据的就好比是组件中的data
  state: {
    // user: null, // 当前用户的登录状态(token等数据)
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem(USER_KEY)
  },
  // 修改容器中的state要用mutations
  // data是传入的数据
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新后数据丢失，所以要把数据存储到本地存储（就是为了数据持久化）
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
