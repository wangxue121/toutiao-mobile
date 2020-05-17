<template>
  <div class="search-container">
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isResultShow = false"
    />
  </form>
  <!-- 搜索结果 -->
  <search-result v-if="isResultShow"></search-result>
  <!-- 联想建议 -->
  <!-- :search-text='searchText' 传给子组件 -->
  <search-suggestion
  v-else-if="searchText"
  :search-text='searchText'
  ></search-suggestion>
  <!-- 历史记录 -->
  <search-history v-else></search-history>

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
      isResultShow: false // 控制搜索结果的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('搜索结果')
      // 显示搜索结果
      this.isResultShow = true
    }
  }
}

</script>
<style scoped lang='less'>
</style>
