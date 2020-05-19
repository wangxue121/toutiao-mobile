// 文章请求相关模块

import request from '@/utils/request'
// 频道新闻推荐V1.1
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
