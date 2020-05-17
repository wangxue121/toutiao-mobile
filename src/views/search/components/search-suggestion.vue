<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
      icon="search"
      v-for="(suggest, index) in suggestions"
      :key=index
      >
      <div slot="title" v-html="hightlight(suggest)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    // 子组件接收
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    // 监视数据变化
    // 属性名：要监视数据的名称
    // searchText () {
    //     console.log('11')
    // }
    // 监视的完整写法
    searchText: {
    // 当数据发生变化的时候将会执行hander 处理函数
    // async handler () {

      // debounce 函数
      //  参数1：函数
      //  参数2：时间
      //  返回值：防抖处理的函数
      handler: debounce(async function () {
      // 封装请求方法
      // 请求获取数据
      // 模板绑定展示
        const { data } = await getSearchSuggest(this.searchText)
        // console.log(data)
        this.suggestions = data.data.options
      }, 500),
      immediate: true // 该回调将会在侦听开始之后被立即执行（vue.js 关方文档）
    }
  },
  created () {},
  mounted () {},
  methods: {
    hightlight (suggest) {
      // 正则表达式
      // RegExp 是正则表达式的构造函数
      // 参数1：字符串
      // 参数2：匹配模式
      // g全局 i是忽略大小写
      // 返回值：正则对象
      return suggest.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style='color: red'>${this.searchText}</span>`
      )
    }
  }
}
</script>
<style scoped lang='less'>
</style>
