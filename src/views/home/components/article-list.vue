<template>
<!-- 给这部分设置固定定位 -->
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="900"
    >
    <!-- load事件 -->
    <van-list
      v-model="isLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- key 不能直接绑定item  -->
      <!-- <van-cell
      v-for="(article, index) in articles"
      :key="index"
      :title="article.title" /> -->
      <article-item
        v-for="(article, index) in articles"
        :key="index"
        :article= 'article'
      />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    // channel 传入props中
    channel: {
      type: Object, // 对象类型
      required: true // 必须的
    }
  },
  data () {
    return {
      articles: [], // 数据列表
      isLoading: false, // 控制加载的loading状态（true是加载中，false是非加载中）
      finished: false, // 控制加载的结束状态，加载结束不再触发加载（为false表示加载结束）
      timestamp: null, // 获取下一页数据的时间戳

      count: 0,
      isRefreshLoading: false, // 下拉刷新loading状态

      refreshSuccessText: '' // 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // vant官网：https://youzan.github.io/vant/#/zh-CN/list
    // 为什么刚开始触发两次onload 因为刚开始加载页面不足一屏，所以又加载一次
    async onLoad () {
      // // 1.请求获取数据
      // setTimeout(() => {
      //   // 2. 把数据放到list数组中
      //   // 注意值push进去的
      //   for (let i = 0; i < 10; i++) {
      //     // 0+1=1
      //     // 1+1=2
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 3.设置加载状态结束，这样才可以开始下一次，否则永远停在这不动
      //   this.loading = false // 控制加载状态，加载中自动为true
      //   // 4.数据全部加载完成
      //   if (this.list.length >= 40) {
      //     // 数据全部加载完成后，不再触发加载更多（设置为true，设置为false永远加载）
      //     this.finished = true
      //   }
      // }, 1000)

      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 事件戳  (不能写死事件戳否则每页数据都一样),如果timestamp有效就使用，否则（如果为null）获取当前时间
        with_top: 1 // 是否包含置顶文章 （1-包含，0-不包含）
      })
      console.log(data)

      // 2. 把数据放到list(articles)数组中
      const { results } = data.data
      this.articles.push(...results) // ...Es6展开运算符

      // 3.设置加载状态结束，这样才可以开始下一次，否则永远停在这不动
      this.isLoading = false
      console.log('haha')

      // 4.数据全部加载完成
      if (results.length) { // 数组的长度不为0，则加载更多
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timetamp
      } else {
        // 数据全部加载完成后，不再触发加载更多（设置为true，设置为false永远加载）
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: Date.now(), // 事件戳  (不能写死事件戳否则每页数据都一样)
        // 只要下拉刷新就获取最新的事件戳（为了方便学习，只要刷新就有不一样的数据）
        with_top: 1 // 是否包含置顶文章 （1-包含，0-不包含）
      })
      console.log(data)
      // 2. 把数据放到list(articles)数组中
      this.articles.unshift(...data.data.results)

      // 3.设置加载状态结束，这样才可以开始下一次，否则永远停在这不动
      this.isRefreshLoading = false

      // 下拉加载更多提示
      this.refreshSuccessText = `更新了${data.data.results.length}条数据`
    }
  }
}

</script>
<style scoped lang='less'>
.article-list {
  // 固定定位
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
