<template>
  <div>
    <Header class="HeaderCPNT">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="back" class="back" />
      </template>
      <template v-slot:default>
        <span class="city_name">成都</span>
      </template>
      <template v-slot:right>
        <span @click="changeCity">切换城市</span>
      </template>
    </Header>
  </div>
</template>

<script>
import Header from './components/header'
import headerDefault from './components/header-default'
export default {
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    changeCity () {
      this.$router.push({path: '/home'})
    }
  },
  components: {
    Header,
    headerDefault
  }
}
</script>

<style lang="scss">
  .HeaderCPNT {
    .back {
      line-height: 48px;
      font-size: 24px;
    }
    .city_name {
      overflow:hidden;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
