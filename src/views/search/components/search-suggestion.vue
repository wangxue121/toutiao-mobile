<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
      :title="suggest"
      icon="search"
      v-for="(suggest, index) in suggestions"
      :key=index
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api/search'
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
      async handler () {
      // 封装请求方法
      // 请求获取数据
      // 模板绑定展示
        const { data } = await getSearchSuggest(this.searchText)
        // console.log(data)
        this.suggestions = data.data.options
      },
      immediate: true // 该回调将会在侦听开始之后被立即执行（vue.js 关方文档）
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang='less'>
</style>
