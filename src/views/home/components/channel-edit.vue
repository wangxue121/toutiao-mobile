<template>
  <div class="channel-edit">
    <van-cell-group :border='false'>
      <van-cell
      title="我的频道">
      <van-button
       class="btn"
        size="mini"
        plain
        type="danger"
        @click='isEdit=!isEdit'
        round >{{isEdit ? '完成':'编辑'}}</van-button>
      </van-cell>
    </van-cell-group>
      <!--
      :class="{ active: index === 激活的频道 }"
     -->
    <van-grid :gutter="9" :border="false">
      <!-- 如果是编辑状态并且索引值不等于0 -->
      <!-- 切换频道是在非编辑状态切换频道 -->
      <van-grid-item
      v-for="(channel,index) in userChannels"
      :key="index"
      :text="channel.name"
      :icon="(isEdit&&index !==0) ? 'clear' : '' "
      @click="onUserChannelClick(channel, index)"
      :class="{ active: index === active }"
      >
      </van-grid-item>
    </van-grid>

     <van-cell-group>
      <van-cell slot="text"/>
      <van-cell
      title="频道推荐">
      </van-cell>
    </van-cell-group>
      <van-grid :gutter="9">
        <!-- 添加频道，给频道列表注册点击事件，获取点击的频道项 -->
      <van-grid-item
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)">
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  components: {},
  props: {
    // 子组件接收父组件传的值(我的频道)
    userChannels: {
      type: Array, // 数组形式
      required: true
    },
    // 设置点击高亮状态
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false // 控制编辑状态
    }
  },
  computed: {
    ...mapState(['user']),

    // 总的频道数 - 我的频道数 = 频道推荐
    // 数组的filter 方法 遍历数组，根据函数的返回值决定是否收集遍历项(返回true或false)
    // 返回值：一个数组，条件为true的元素
    recommendChannels () {
      // 遍历allChannels中的每一项
      return this.allChannels.filter(channel => {
        // 与userChannels数组中数据比较，id不等于userChannel中的数据则返回
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (channel) {
      // 在userChannel中添加点击项
      this.userChannels.push(channel)
      if (this.user) {
        // 如果登录保存到线上
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 如果没登录保存到本地存储
        setItem('user-channels', this.userChannels)
      }
    },
    onreduce (channel) {
      this.userChannels.pop(channel)
    },
    // 删除方法
    onUserChannelClick (channel, index) {
      // 判断按钮是编辑还是完成状态
      // 如果编辑状态（且不能为第一个，第一个不能删除），删除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      // 如果没有显示编辑状态，点击频道把频道打开
      } else {
        this.switchChannel(index)
      }
    },
    // 删除频道
    async deleteChannel (channel, index) {
      // 如果删除的是激活频道前面的
      if (index <= this.active) {
        // 更新激活频道索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        // 登录了，持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 没有登录，持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换频道
    switchChannel (index) {
      // console.log('切换频道')
      // 非编辑状态，执行切换频道操作
      // 给父组件绑定自定义事件，会指定函数 （添加的事件子组件会触发）
      // 在子组件，内部使用 this.$emit('自定义事件的名字','传递的数据')
      this.$emit('update-active', index) // 切换频道
      this.$emit('close') // 关闭弹出层
    }
  }
}

</script>
<style scoped lang='less'>
.channel-edit {
  padding-top: 54px;
}
.van-cell{
  font-size: 16px;
  font-weight: 700;
  .btn{
    font-size: 14px;
    font-weight: 400;
  }
}
.text-wrap{
  font-size: 14px;
}
/deep/ .van-grid-item__text{
  font-size: 14px;
  margin-top: 0; // 可以避免图标显示和隐藏是，字体上下动
}
/deep/ .van-grid-item__content{
  background-color: #f4f5f6 ;
  span{
    color: #000;
  }
  /deep/ .van-grid-item__icon {
      position: absolute;
      right: 0px;
      top: -6px;
      font-size: 20px;
      color: #ccc;
    }
}
.active{
    /deep/ .van-grid-item__text {
      color: red !important;
  }}
</style>
