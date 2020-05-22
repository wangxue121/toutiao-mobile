<template>
  <div class="update-gender">
     <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { changeUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      // type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      // 初始值
      defaultIndex: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 选项改变时触发
    // 单列：Picker实例，选中值，选中值对应的索引
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      // 请求提交更新用户性别
      await changeUserProfile({
        gender: this.defaultIndex
      })
      this.$emit('input', this.defaultIndex)
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  }
}

</script>
<style scoped lang='less'>
</style>
