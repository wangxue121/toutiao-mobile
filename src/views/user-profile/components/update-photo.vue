<template>
  <div class="update-photo">
      <img :src="image" alt="" ref="image" class="image">
      <van-nav-bar
        class="van-nav-bar"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
        />
  </div>
</template>

<script>
import { changeUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file: {
    // type: String,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false, // 默认背景
      movable: true // 是否可以移动
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },

    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true, // 禁止背景点击
        duration: 0 // loading展示时间 ，0 表示持续展示（在图片没有加载出来时）
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // 如果要求 Content-Type 是 multipart/form-data，
      // 则一定要提交 FormData 数据对象，专门用于文件上传的
      // 不能提交 {}，没用  例如不可以： await.changeUserPhoto({})
      //   const fd = new FormData()
      //   fd.append('photo', this.file)
      await changeUserPhoto(fd)

      // 更新组件中的用户头像
      // this.$emit('update-photo', this.image)
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹出层
      this.$emit('close')

      // 保存成功
      this.$toast.success('保存成功')
    }
  }
}

</script>
<style scoped lang='less'>
.van-nav-bar{
  background-color:#000 !important;
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.image{
  display: block;
  max-width: 100%;
}
.update-photo {
  height: 100%;
}

</style>
