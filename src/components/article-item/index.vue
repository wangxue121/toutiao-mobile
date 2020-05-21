<template>
  <div class="article-item">
    <van-cell>
      <div slot="title">{{article.title}}</div>
      <div slot="label">
        <!-- aut_name 作者名字 -->
        <span>{{article.aut_name}}</span>
        <!-- comm_count 回复数 -->
        <span>{{article.comm_count}}</span>
        <!-- 时间 -->
        <span>{{article.pubdate}}</span>
      </div>
      <!-- 默认插槽名字叫default ，可以省略 -->
      <div slot="default">你好</div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
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
