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
      <!-- accept="image/*" 所有全部图片类型 -->
      <input
        type="file"
        ref="file"
        hidden accept="image/*"
        @change="onFileChange"
        >
      <van-cell
        title="头像"
        value="内容"
        is-link
        @click="$refs.file.click()"
      >
        <van-image
          round
          width="30px"
          height="30px"
          fit="cover"
          :src='user.photo'
        />
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="user.name"
        @click="isEditNameShow = true"
      />
      <van-cell
        title="性别"
        is-link
        :value="user.gender===0 ? '男':'女'"
        @click="isEditGenderShow = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
      />
      <!-- 修改昵称 -->
      <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
      <!-- v-if条件渲染，为true渲染，为false销毁 -->
      <update-name
        v-if="isEditNameShow"
        :name="user.name"
        @updata-name='user.name = $event'
        @close="isEditNameShow = false"
      ></update-name>
      </van-popup>
      <!-- 修改性别 -->
        <van-popup
        v-model="isEditGenderShow"
        position="bottom"
        :style="{ height: '40%' }"
      >
      <update-gender
        v-if="isEditGenderShow"
        v-model="user.gender"
        @close="isEditgenderShow = false"
      />
      </van-popup>
      <!-- 修改头像照片 -->
        <van-popup
        v-model="isEditPhotoShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
      <update-photo
      />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 编辑昵称的显示状态
      isEditGenderShow: false, // 编辑性别的显示状态
      isEditPhotoShow: false, // 编辑性别的显示状态
      previewImage: null // 预览图片
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
    },
    onFileChange () {
      console.log(111)
      // 展示弹出层  在弹出层里预览图片
      this.isEditPhotoShow = true
      const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      this.previewImage = blob

      // 为了解决选择相同文件不触发的情况 手动清空选中file的value值
      this.$refs.file.value = ''
    }
  }
}

</script>
<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
</style>
