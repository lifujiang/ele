<template>
  <div class="footerPage">
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <span>外卖</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.elm_a : icon.elm_n"
        >
      </van-tabbar-item>
      <van-tabbar-item>
        <span>搜索</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.search_a : icon.search_n"
        >
      </van-tabbar-item>
      <van-tabbar-item>
        <span>订单</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.order_a : icon.order_n"
        >
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.user_a : icon.user_n"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      icon: {
        elm_n: require('../static/icon/elm.svg'),
        elm_a: require('../static/icon/elm_active.svg'),
        search_n: require('../static/icon/search.svg'),
        search_a: require('../static/icon/search_active.svg'),
        order_n: require('../static/icon/order.svg'),
        order_a: require('../static/icon/order_active.svg'),
        user_n: require('../static/icon/user.svg'),
        user_a: require('../static/icon/user_active.svg')
      }
    }
  }
}
</script>

<style lang="scss">
  .footerPage {
    height: 55px;
  }
</style>
