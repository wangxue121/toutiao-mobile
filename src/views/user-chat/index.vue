<template>
  <div class="user-chat">
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="message-list">
      <van-cell title="单元格" />
    </van-cell-group>
   <van-cell-group class="send-message-wrap">
    <van-field
      v-model="message"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入内容"
    />
    <van-button
      size="small"
      type="primary">发送</van-button>
   </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserChat',
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
.send-message-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
