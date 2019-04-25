<template>
  <div class="orderPage">
    <!-- 顶部 -->
    <header-default :title="'订单列表'"></header-default>
    <!-- 底部 -->
    <tabbar :i="2" />
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import tabbar from '../components/tabbar'
export default {
  data () {
    return {

    }
  },
  methods: {},
  components: {
    headerDefault,
    tabbar
  }
}
</script>

<style lang="scss">
  .orderPage {
    
  }
</style>
