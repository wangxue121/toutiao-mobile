<template>
  <div class="my-container" >
    <van-cell-group class="my-info">
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
        src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div slot="title">昵称</div>
      <van-button
      round
      size="small">编辑资料</van-button>
      </van-cell>
        <van-grid :border="false">
          <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">111</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">111</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">111</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="text-wrap">
            <div class="count">111</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
        </van-grid>
    </van-cell-group>
     <van-grid column-num="2" class="van-grid">
        <van-grid-item icon-prefix='toutiao' icon="shoucang" text="收藏" />
        <van-grid-item icon-prefix='toutiao' icon="lishi" text="历史" />
      </van-grid>
     <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
   <van-button type="default" block class="button-out">退出登录</van-button>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
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

}
</style>
