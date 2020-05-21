// 封装axios请求模块
import axios from 'axios'

// 在非组件模块中获取 store 必须通过这种方式
// 这里单独加载 store，和在组件中 this.$store 一个东西
import store from '@/store/'

const request = axios.create({
  // 基准地址
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state // 解构
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 本身就带的，处理之后要把config返回，否则请求发不出去
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
