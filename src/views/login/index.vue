<template>
  <div class="login-container">
  <van-nav-bar
    class="van-nav-bar"
    title="登录 / 注册"
    left-arrow
    @click-left="onClickLeft"
  />
<!-- submit 当表单验证通过的时候才会触发
prevent 组织表单默认行为 -->
<!-- show-error 是否在校验不通过时标红输入框 -->
<!-- show-error-message  是否在校验不通过时在输入框下方展示错误提示 -->
<!-- validate-first是否在某一项校验不通过时停止校验 -->
<!-- onFailed 表单验证失败会触发onFailed 事件 -->
<van-form
@submit='onLogin'
:show-error='false'
:show-error-message ='false'
validate-first
@failed="onFailed"
ref:login-for
>
  <van-field
    v-model="user.mobile"
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请填写手机号"
    :rules="FormRules.mobile"
    />
  <van-field
    v-model="user.code"
    type="password"
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    :rules='FormRules.code'>
    <!-- @validate 验证表单，支持传入name来验证表单项 -->
     <template #button>
        <van-button
        class="send-btn"
        size="small"
        @validate="onSendSms"
      >获取验证码</van-button>
     </template>
    </van-field>
       <div class="login-btn-border">
      <van-button
      class="login-btn"
      type="info" block
      >登录</van-button>
   </div>
    </van-form>
  </div>
</template>

<script>
import {
  login
} from '@/api/user'
// 引入Toast轻提示
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      FormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }]
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
    // 表单验证通过提交的事件
    async onLogin () {
      Toast.loading({
        message: '加载中...', // 点击登录后提示信息
        forbidClick: true // 禁止背景点击
      })
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求调用登录
      try {
        const res = await login(this.user)
        // 4. 处理响应结果
        console.log('登录成功', res)
        Toast.success('恭喜你，登录成功')
        // this.$toast('恭喜你，登录成功') // 组件中可以直接通过this.$toast 调用
      } catch (err) {
        console.log('登录失败', err)
        Toast.fail('很遗憾，登录失败,请输入正确的手机号或验证码')
      }
    },
    // 表单验证失败触发的事件
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 提示消息出现在上部分，防止被手机键盘挡住
        })
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
