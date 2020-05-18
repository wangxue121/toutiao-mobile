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
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistory } from '@/api/search'
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadSearchHistories()
  },
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

      // 如果用户已经登录，则把搜索记录存储到线上
      //   提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
      // 如果没有登录，则把历史记录存储到本地
      setItem('search-histories', this.searchHistories)
      // console.log('搜索结果')
      // 显示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 由于后端存储的用户搜索历史记录太少了
      // 所以我们这里让后端返回的历史记录和本地的历史记录合并到一起
      // 如果用户已经登录
      let searchHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        // console.log(data.data.keywords)
        // 合并数组： [...数组, ...数组]
        // 把 Set 转为数组：[...Set对象]
        // 数组去重：[...new Set([...数组, ...数组])
        // 本地存储和线上存储合并
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      }
      // console.log(searchHistories)
      this.searchHistories = searchHistories
    }
  }
}

</script>
<style scoped lang='less'>
</style>
