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
    <van-tabs v-model="active" class="channel-tabs">
      <!-- <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key='channel.id'>
        <!-- {{channel.name}}内容 -->
        <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
        <!-- 文章列表  使用-->
        <!-- 把遍历的channel 传给:channel -->
      <article-list :channel="channel" />
      </van-tab>
      <!-- 汉堡按钮部分 -->
      <!-- 插槽 占位，不让最后一个选项被挡住 -->
      <div slot="nav-right"
      class="wap-nav-placeholder"></div>
      <div
        slot="nav-right"
        class = "warp-nav-warp"
        @click="show = true"
        >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 挂载到 body 节点下 -->
    <!-- bottom 弹出位置 -->
    <!-- close-icon-position 关闭图标位置 -->
    <van-popup
    class="edit-channel-popup"
    v-model="show"
    get-container="body"
    style=" height: 100% "
    position="bottom"
    close-icon-position="top-left"
    closeable
    >
    <!-- 使用频道编辑组件 -->
    <!-- 父传子 -->
    <channel-edit
    :user-channels="channels"
    @close="show = false"
    @update-active='onUpdateActive'
    :active="active"
    />
    <!-- 上面是点击关闭弹层 -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list' // 加载首页内容页
import channelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList, // 注册
    channelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      show: false // 弹出层显示
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
    },
    onUpdateActive (index) {
      this.active = index // 激活频道
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
  .warp-nav-warp {
   position: fixed;
   height: 33px;
   width: 33px;
   right: 0;
   font-size: 25px;
   margin-top: 10px;
   margin-right: 0;
   opacity: 0.6;
   background-color: #fff;
     // 汉堡按钮的左侧有一个渐变小竖线，可以用一个图片表示
  &:before {
    content: '';
    width: 1px;
    background: url("./line.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: -9px;
    top: 0;
    bottom: 0;
  }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
}
</style>
