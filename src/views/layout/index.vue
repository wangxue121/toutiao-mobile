<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
     <router-view />
    <!-- 子路由出口 -->
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon-prefix='toutiao' icon="shouye" to='/'>首页</van-tabbar-item>
      <van-tabbar-item icon-prefix='toutiao' icon="wenda" to='/qa'>问答</van-tabbar-item>
      <van-tabbar-item icon-prefix='toutiao' icon="shipin" to='/look'>视频</van-tabbar-item>
      <van-tabbar-item icon-prefix='toutiao' icon="wode" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}

</script>
<style scoped lang='less'>
</style>
