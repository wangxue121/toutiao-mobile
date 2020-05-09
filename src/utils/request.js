// 封装axios请求模块
import axios from 'axios'

const request = axios.create({
  // 基准地址
  baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
