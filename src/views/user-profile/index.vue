<template>
  <div class="user-profile">
      <!-- $roter.back() 返回上级路由 -->
    <van-nav-bar class="app-nav-bar"
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    >
    </van-nav-bar>
    <van-cell-group>
      <van-cell title="头像" value="内容" is-link >
        <van-image
          round
          width="30px"
          height="30px"
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
      />
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
      />
      <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
      <!-- 修改昵称组件 -->
      <update-name
        :name="user.name"
        @updata-name='user.name = $event'
        @close="isEditNameShow = false"
      />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  props: {},
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false
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
    showPopup () {
      this.isEditNameShow = true
    },
    onClickRight () {
      console.log('完成')
    }
  }
}

</script>
<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
</style>
