import requset from '@/utils/request'

// 获取联想建议
export const getSearchSuggest = q => {
  return requset({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResult = params => {
  return requset({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
