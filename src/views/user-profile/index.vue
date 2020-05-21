<template>
  <div class="user-profile">
      <!-- $roter.back() 返回上级路由 -->
    <van-nav-bar class="app-nav-bar"
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <van-cell-group>
      <van-cell title="头像" value="内容" is-link >
        <van-image
          round
          width="30px"
          height="30px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell title="昵称" is-link value="you" />
      <van-cell title="性别" is-link value="男" />
      <van-cell title="生日" is-link value="2018-2-3" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {} // 用户数据
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      // console.log(data)
      this.user = data.data
    }
  }
}

</script>
<style scoped lang='less'>
</style>
