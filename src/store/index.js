import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 把数据放到容器里面的好处是，获取方便，数据发生变化时视图可以更新
// 为了数据可以持久化，把数据放到本地存储中
export default new Vuex.Store({
  // state 用来共享数据的就好比是组件中的data
  state: {
    // user: null, // 当前用户的登录状态(token等数据)
    user: JSON.parse(window.localStorage.getItem('user')
    )
  },
  // 修改容器中的state要用mutations
  // data是传入的数据
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新后数据丢失，所以要把数据存储到本地存储（就是为了数据持久化）
      window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
