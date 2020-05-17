<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="历史记录">
        <van-icon name="delete" />
      </van-cell>
     <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index">
    <van-icon name="close" />
    </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isResultShow: false // 控制搜索的显示状态
    }
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
