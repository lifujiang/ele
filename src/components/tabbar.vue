<template>
  <div class="footerPage">
    <van-tabbar v-model="active">
      <van-tabbar-item @click="msite">
        <span>外卖</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.elm_a : icon.elm_n"
        >
      </van-tabbar-item>
      <van-tabbar-item @click="search">
        <span>搜索</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.search_a : icon.search_n"
        >
      </van-tabbar-item>
      <van-tabbar-item @click="order">
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
  props: ['i'],
  data () {
    return {
      icon: {
        elm_n: require('../static/icon/elm.svg'),
        elm_a: require('../static/icon/elm_active.svg'),
        search_n: require('../static/icon/search.svg'),
        search_a: require('../static/icon/search_active.svg'),
        order_n: require('../static/icon/order.svg'),
        order_a: require('../static/icon/order_active.svg'),
        user_n: require('../static/icon/user.svg'),
        user_a: require('../static/icon/user_active.svg')
      },
      active: this.i
    }
  },
  computed: {
    // 获取geohash
    geohash () {
      return this.$store.state.site.geohash
    }
  },
  methods: {
    // 食品首页
    msite () {
      this.active = 0
      this.$router.push({
        path: `/msite`,
        query: {
          geohash: this.geohash
        }
      })
    },
    // 搜索
    search () {
      this.active = 1
      this.$router.push({
        path: `/search/${this.geohash}`
      })
    },
    // 订单页
    order () {
      this.active = 2
      this.$router.push({
        path: '/order'
      })
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
  .footerPage {
    height: 55px;
  }
</style>
