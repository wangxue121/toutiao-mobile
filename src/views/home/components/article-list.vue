<template>
<!-- 给这部分设置固定定位 -->
  <div class="article-list">
    <!-- load事件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- key 不能直接绑定item  -->
      <van-cell
      v-for="(article, index) in article"
      :key="index"
      :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // channel 传入props中
    channel: {
      type: Object, // 对象类型
      required: true // 必须的
    }
  },
  data () {
    return {
      article: [], // 数据列表
      loading: false, // 控制加载的loading状态（true是加载中，false是非加载中）
      finished: false, // 控制加载的结束状态，加载结束不再触发加载（为false表示加载结束）
      timestamp: null // 获取下一页数据的时间戳
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

      // 2. 把数据放到list(article)数组中
      const { results } = data.data
      this.article.push(...results) // ...Es6展开运算符

      // 3.设置加载状态结束，这样才可以开始下一次，否则永远停在这不动
      this.loading = false

      // 4.数据全部加载完成
      if (results.length) { // 数组的长度不为0，则加载更多
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timetamp
      } else {
        // 数据全部加载完成后，不再触发加载更多（设置为true，设置为false永远加载）
        this.finished = true
      }
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
