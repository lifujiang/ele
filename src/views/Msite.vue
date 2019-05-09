<template>
  <div class="msitePage">
    <!-- 顶部 -->
    <Header class="HeaderCPNT">
      <template slot:left>
        <van-icon name="search" class="search_icon" @click="toSearch" />
      </template>
      <template>
        <span class="city_name" @click="toHome">{{ addrName }}</span>
      </template>
      <template slot:right>
        <router-link class="login" to="/login">登录|注册</router-link>
      </template>
    </Header>
    <!-- 食品分类 -->
    <div class="cate">
      <div class="slidebox">
        <van-swipe @change="onChange" class="slide" :width="375">
          <van-swipe-item v-for="(item, index) in cateList" :key="index">
            <ul>
              <li @click="toFood(i)" v-for="i in item" :key="i.id">
                <!-- 组件默认跳转链接方式 -->
                <img :src="imgsrc + i.image_url" alt="">
                <p>{{ i.title }}</p>
              </li>
            </ul>
            <div class="custom-indicator" slot="indicator">
              {{ current + 1 }}/2
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 商店列表 -->
    <main class="main">
      <div class="nearbyShop">
        <van-icon class="shop_icon" name="shop-o" />
        <span>附近商家</span>
      </div>
      <shopCard v-for="(item, index) in shopList" :key="index" :shopList="item" :geohash="geohash"></shopCard>
    </main>
    <!-- 底部 -->
    <tabbar :i="0" />
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
import Header from '../components/header'
import shopCard from '../components/shopCard'
export default {
  data() {
    return {
      current: 0,
      geohash: this.$route.query.geohash,
      addrName: '',
      latitude: '',
      longitude: '',
      imgsrc: 'https://fuss10.elemecdn.com',
      cateList: [],
      shopList: []
    }
  },
  created () {
    this.getAddr()
    this.getFoodsCate()
  },
  methods: {
    // 获取当前位置经纬度及名字
    getAddr () {
      this.$api.addr(this.geohash)
      .then(res => {
        this.addrName = res.data.name
        this.latitude = res.data.latitude
        this.longitude = res.data.longitude
        // 获取到经纬度 后才能请求商铺列表
        this.getShopList()
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    // 获取食品分类列表
    getFoodsCate () {
      this.$api.foodsCate()
      .then(res => {
        // 将数据放入两个数组中来遍历 swipe
        this.cateList.push(res.data.slice(0, 8))
        this.cateList.push(res.data.slice(8, 16))
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    // 获取商店列表
    getShopList () {
      this.$api.shopList({
        latitude: this.latitude,
        longitude: this.longitude
      })
      .then(res => {
        this.shopList = res.data
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    // 跳转至选择城市页面
    toHome () {
      this.$router.push({path: '/home'})
    },
    toSearch () {
      this.$router.push({
        path: `search/${this.geohash}`
      })
    },
    // 跳转至食品分类详情页面
    toFood (i) {
      var title = i.title
      var restaurant_category_id = i.id
      var geohash = this.geohash
      this.$router.push({
        path: '/food',
        query: {
          geohash,
          title,
          restaurant_category_id
        }
      })
    },
    onChange(index) {
      this.current = index;
    }
  },
  components: {
    tabbar,
    Header,
    shopCard
  }
}
</script>

<style lang="scss" scope>
  @import '../static/styles/mixin';
  .msitePage {
    .HeaderCPNT {
      @include bgc(white);
      .search_icon {
        height: 48px;
        padding-left: 15px;
        font-size: 24px;
        line-height: 48px;
        padding: 0;
      }
      .city_name {
        font-size: 20px;
        overflow:hidden;
        max-width: 188px;
      }
      .login {
        font-size: 16px;
        line-height: 48px;
        color: white;
      }
    }
    .cate {
      @include bgc(white);
      .slidebox {
        padding-bottom: 10px;
        border-bottom: 1px solid $bordercl;
        .slide {
          padding-bottom: 10px;
          ul {
            width: 100%;
            li {
              // 解决字体抖动问题
              -webkit-transform-style: preserve-3d;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
              width: 25%;
              text-align: center;
              float: left;
              font-size: 14px;
              padding: 10px;
              img {
                margin: 0 auto;
                display: block;
                height: 42px;
              }
              p {
                padding-top: 13px;
              }
            }
          }
          .van-swipe__indicator {
            @include bgc(#ccc);
            width: 9px;
            height: 9px;
            border-radius: 50%;
          }
          .van-swipe__indicator--active {
            @include bgc($maincl);
          }
        }
      }
    }
    .main {
      @include bgc(white);
      .nearbyShop {
        color: #999;
        padding: 10px;
        padding-top: 5px;
        border-top: 1px solid $bordercl;
        margin-top: 10px;
        line-height: 28px;
        .shop_icon {
          font-size: 17px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          vertical-align: middle;
          margin-left: 8px;
        }
      }
    }
  }
</style>
