import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant组件库
import Vant from 'vant'
// 加载Vant 组件库样式
import 'vant/lib/index.css'

// 方便覆盖第三方样式文件
import './style/index.less'

// 加载 自动设置 REM 基准值（html 标签字体大小）
import 'amfe-flexible'

// 全局注册 Vant 中的组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
