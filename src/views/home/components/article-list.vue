<template>
  <div class="article-list">文章列表</div>
</template>

<script>
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // channel 传入props中
    channel: {
      type: Object, // 对象类型
      required: true // 必须的
    }
  },
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
</style>
