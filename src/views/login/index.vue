<template>
  <div class="login-container">
  <van-nav-bar
    class="van-nav-bar"
    title="登录 / 注册"
    left-arrow
    @click-left="onClickLeft"
  />

<van-cell-group>
  <van-field
    v-model="user.mobile"
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请填写手机号"
  />
  <van-field
    v-model="user.code"
    type="password"
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码" >
     <template #button>
        <van-button
        class="send-btn"
        size="small"
      >获取验证码</van-button>
     </template>
    </van-field>
    </van-cell-group>
   <div class="login-btn-border">
      <van-button
      class="login-btn"
      type="info" block
      @click="onLogin"
      >登录</van-button>
   </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {
    },
    async onLogin () {
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求调用登录
      try {
        const res = await login(this.user)
        // 4. 处理响应结果
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
      }
    }
  }
}

</script>
<style scoped lang='less'>
.login-container {
  // .van-nav-bar {
  //   // background-color: #1989fa;
  //   // color: #fff;
  // }
  .send-btn {
    background-color: #ccc;
    border-radius: 30px;
  }
}
.login-btn-border{
  padding: 20px 10px;
 .login-btn {
    border: none;
    border-radius: 30px;
    background-color: #6db4fb;
  }
}
</style>
