<template>
  <div class="update-name">
    <van-nav-bar
     class="van-nav-bar"
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onConfirm()"
    />
    <div class="name-field-wrap">
        <!-- v-model="message" 当前输入的值 -->
    <van-field
      v-model="localName"
      rows="2"
      autosize
      label="昵称"
      type="textarea"
      maxlength="10"
      placeholder="请输入昵称"
      show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { changeUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    name: {
      // type: String,
      required: true
    }
  },
  data () {
    return {
      // 把父组件传下来的 映射到localName
      // 但是修改这个不会影响到props中的数据
      localName: this.name
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {
      console.log('返回')
    },
    // 点击右侧按纽，保存修改
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      try {
        await changeUserProfile({
          // 1.请求提交更新的用户昵称
          name: this.localName
        })
        // 更新成功  修改父组件的name   关闭弹出层
        this.$emit('updata-name', this.localName)
        this.$emit('close')

        this.$toast.success('保存成功')
        // catch 捕获异常
      } catch (err) {
        if (err && err.resopnse && err.resopnse.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}

</script>
<style scoped lang='less'>
.van-nav-bar {
  background-color: #ccc !important;
}
.update-name {
    background-color: #ccc !important;
}
</style>
