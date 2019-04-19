<template>
  <div class="headerDefaultPage">
    <Header>
      <template v-slot:left>
        <van-icon name="arrow-left" @click="back" class="back" />
      </template>
      <template v-slot:default>
        <span class="city_name">{{ title }}</span>
      </template>
      <template v-slot:right>
        <span class="space"></span>
      </template>
    </Header>
  </div>
</template>

<script>
import Header from './header'
export default {
  props:['title'],
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
  .headerDefaultPage {
    height: 48px;
    .back {
      line-height: 48px;
      font-size: 24px;
    }
    .city_name {
      overflow:hidden;
      font-size: 20px;
      font-weight: bold;
    }
    .space {
      // 设置与左边图标宽度想等
      width: 25px;
    }
  }
</style>
