<template>
<!-- 给这部分设置固定定位 -->
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
      v-for="item in list"
      :key="item"
      :title="item" />
    </van-list>
  </div>
</template>

<script>
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
      list: [], // 数据列表
      loading: false, // 控制加载的loading状态
      finished: false // 控制加载的结束状态，加载结束不再触发加载
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLoad () {
      // 1.请求获取数据
      setTimeout(() => {
        // 2. 把数据放到list数组中
        // 注意值push进去的
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 3.设置加载状态结束，这样才可以开始下一下
        this.loading = false // 控制加载状态，加载中自动为true
        // 4.数据全部加载完成
        if (this.list.length >= 40) {
          // 数据全部加载完成后，不再触发加载更多.
          this.finished = true
        }
      }, 1000)
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
