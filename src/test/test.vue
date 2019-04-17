<template>
  <div class="testPage">
    <Header class="HeaderCPNT">
      <template slot:left>
        <van-icon name="search" class="search_icon" />
      </template>
      <template>
        <span class="city_name">成都</span>
      </template>
      <template slot:right>
        <span class="lor">登录|注册</span>
      </template>
    </Header>
    <main class="main">
<cube-slide ref="slide" :data="items" @change="changePage">
  <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
    <a :href="item.url">
      <img :src="item.image">
    </a>
  </cube-slide-item>
</cube-slide>
    </main>
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  data() {
    return {
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        }
      ]
    }
  },
  methods: {
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
    }
  }
}
</script>

<style lang="scss">
  .testPage {
    .HeaderCPNT {
      .search_icon {
        padding-left: 15px;
        font-size: 24px;
        line-height: 52px;
      }
      .city_name {
        font-size: 20px;
        overflow:hidden;
      }
      .lor {
        font-size: 16px;
        line-height: 48px;
      }
    }
    .main {
      padding-top: 48px;
      .slide {
        height: 180px;
      }
      ul {
        width: 100%;
        li {
          width: 25%;
          float: left;
        }
      }
    }
  }
</style>
