<template>
  <div class="home-container">
    <!-- van-nav-bar 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 文章列表频道-->
    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs v-model="active">
      <!-- <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key='channel.id'>
        {{channel.name}}内容
        <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
        <!-- 文章列表  使用-->
        <!-- 把遍历的channel 传给:channel -->
      <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list' // 加载
export default {
  name: 'HomeIndex',
  components: {
    ArticleList // 注册
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      // 获取频道数据
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}

</script>
<style scoped lang='less'>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
