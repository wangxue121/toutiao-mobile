// 本地存储封装模块

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 把JSON.parse 放到 try-catch 中是因为data可能不是JSON格式的字符串
  try {
    // 把data转为JavaScript对象
    // 如果转换成功 那么他就是JSON格式的字符串
    return JSON.parse(data)
    // 如果报错那么就直接原样返回
  } catch (err) {
    // data 不是JSON格式的字符串 直接原样返回
    return data
  }
}
export const setItem = (name, value) => {
  // 如果value 是对象，就把value 转为JSON格式的字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // 否则直接原样返回
  window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
