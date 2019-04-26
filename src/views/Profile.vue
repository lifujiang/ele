<template>
  <div class="profilePage">
    <!-- 顶部 -->
    <header-default :title="'我的'"></header-default>
    <!-- 底部 -->
    <tabbar :i="3" />
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import tabbar from '../components/tabbar'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    headerDefault,
    tabbar
  }
}
</script>

<style lang="scss">
  .profilePage {
    
  }
</style>
