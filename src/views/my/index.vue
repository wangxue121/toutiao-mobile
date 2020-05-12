<template>
  <div class="my-container" >
    <van-cell-group class="my-info" v-if="user">
      <van-cell
        class="base-info"
        title="单元格"
        value="内容"
        center
        :border="false">
      <van-image
        class="my-photo"
        round
        slot="icon"
        fit="cover"
        :src="currentUser.photo" />
      <div slot="title">{{currentUser.name}}</div>
      <van-button
      round
      size="small">编辑资料</van-button>
      </van-cell>
        <van-grid :border="false">
          <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
        </van-grid>
    </van-cell-group>

    <!-- 用户未登陆状态 -->
    <van-cell-group v-else class="not-login base-info">
      <!-- 退出后点击登录，进入到登录页面 -->
      <div @click="$router.push('/login')">
         <img src="./头像.png" alt="" class="head-photo">
      </div>
       <p class="text">退出 / 登陆</p>
    </van-cell-group>
    <!-- 用户未登陆状态 -->

     <van-grid column-num="2" class="van-grid">
        <van-grid-item icon-prefix='toutiao' icon="shoucang" text="收藏" />
        <van-grid-item icon-prefix='toutiao' icon="lishi" text="历史" />
      </van-grid>
     <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
   <van-button
   v-if="user"
   type="default"
   block class="button-out"
   @click="onLogout"
   >退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex' // 目的是将容器中的数据映射到组件
import { getCurrentUser } from '@/api/user/'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user']) // 将容器中的数据映射到组件
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () {},
  methods: {
    onLogout () {
      // 提示用户是否要退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '你确定要退出吗'
      })
        .then(() => {
          // 确认退出，清除token
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 取消退出
          // on cancel
        })
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    }
  }
}

</script>
<style scoped lang='less'>
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    box-sizing: border-box;
    .base-info {
      height: 115px;
      background-color: unset;
      display: flex;
      flex-direction: center;
     .my-photo{
        width: 69px;
        height: 69px;
        margin-top: 38px;
        margin-right: 15px;
      }
      .van-button {
        height: 20px;
        margin-top:63px;
        color: #666;
      }
      .van-cell__title{
        margin-top:60px;
        font-size: 20px;
        color: #fff;
      }
    }
  /deep/ .van-grid-item__content {
      background-color: unset;
      height: 65px;
      font-size: 12px;
      color: #fff;
      .text-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
        .count {
          font-size: 18px;
        }
      }
    }
  }
  /deep/ .van-grid {
   font-size:14px ;
   height: 71px;
   box-sizing: border-box;
   margin-bottom: 5px;
    .toutiao-shoucang{
      color: tomato;
    }
    .toutiao-lishi {
      color: goldenrod;
    }
  }

    .button-out{
    font-size: 14px;
    color: tomato;
  }
  // 未登陆状态
 .not-login{
   padding-top: 5px;
   box-sizing: border-box;
   height: 180px;
   background: url(./banner.png);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
    .head-photo{
    height: 70px;
    width: 70px;
  }
  .text{
    font-size: 14px;
    color: #fff;
  }
 }

}
</style>
