<template>
  <div class="search-container">
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @focus="isResultShow = false"
    />
  </form>
  <!-- 搜索结果 -->
  <search-result
  v-if="isResultShow"
  :search-text='searchText'
  ></search-result>
  <!-- 联想建议 -->
  <!-- :search-text='searchText' 传给子组件 -->
  <!-- @search='onSearch' 子传父 -->
  <search-suggestion
  v-else-if="searchText"
  :search-text='searchText'
  @search='onSearch'
  ></search-suggestion>
  <!-- 历史记录 -->
  <!-- :search-histories="searchHistories" 传给子组件 -->
  <search-history
  v-else
  :search-histories="searchHistories"
  ></search-history>

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistories: [] // 搜索历史数据
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (searchText) {
    // 输入框设置为你要搜索指定文本
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) { // 等于-1说明没找到相同数组
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)
      // console.log('搜索结果')
      // 显示搜索结果
      this.isResultShow = true
    }
  }
}

</script>
<style scoped lang='less'>
</style>
