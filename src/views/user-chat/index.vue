<template>
  <div class="user-chat">
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <!-- <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" /> -->
      <van-cell
        v-for="(answer, index) in messages"
        :key="index"
        :title="answer.msg"
      />
    </van-cell-group>
   <van-cell-group class="send-message-wrap">
    <van-field
      v-model="message"
      placeholder="请输入内容"
    />
    <van-button
      size="small"
      type="primary"
      @click="onSend"
      >发送</van-button>
   </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '', // 输入框的值
      socket: null, // WebSocket 通信对象
      // messages: [] // 存储发送和接收的数据
      messages: getItem('chat-messages') || [] // 存储发送和接收的数据,第一次没有数据所以||一个空数组
    }
  },
  computed: {},
  watch: {
    messages () {
      setItem('chat-messages', this.messages)
      // 数据更新影响视图不是立即的
      // 如果你要在操作数据之后立即操作数据影响的视图 DOM，那么最好把代码放到 nextTick 函数中
      this.$nextTick(() => {
        this.scrollTobottom()
      })
    }
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn/')
    this.socket = socket

    socket.on('connect', () => {
      console.log('连接建立成功')
    })

    socket.on('disconnect', () => {
      console.log('断开连接')
    })

    // 根据接口文档说明  发送与接收消息的事件(event)均为message
    // 2-监听message事件，接收服务端消息
    socket.on('message', data => {
      // 把接收到的消息也放到数组中
      this.messages.push(data)
    })
  },
  mounted () {
    // 生命周期钩子函数，渲染模板
    this.scrollTobottom()
  },
  methods: {
    onSend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      // 根据接口文档说明  发送与接收消息的事件(event)均为message
      // 1-请求发送消息
      this.socket.emit('message', data)

      // 把用户发出去的消息存储到数组中
      this.messages.push(data)

      // 发送消息之后清空文本框
      this.message = ''
    },
    scrollTobottom () {
      // 确保滚动到最底部,只需要距离顶部的距离 = 可滚动的高度
      // 获取dom
      const list = this.$refs['message-list']
      // 距离顶部的距离=可滚动的高度
      list.scrollTop = list.scrollHeight
    }
  }
}

</script>
<style scoped lang='less'>
.send-message-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.message-list {
  position: fixed;
  top:46px ;
  bottom:44px ;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
