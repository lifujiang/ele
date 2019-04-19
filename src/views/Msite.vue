<template>
  <div class="msitePage">
    <Header class="HeaderCPNT">
      <template slot:left>
        <van-icon name="search" class="search_icon" />
      </template>
      <template>
        <span class="city_name" @click="toHome">{{ addrName }}</span>
      </template>
      <template slot:right>
        <span class="lor">登录|注册</span>
      </template>
    </Header>
    <div class="cate">
      <div class="slidebox">
          <cube-slide :options="options" :autoPlay="false" class="slide" ref="slide" :data="cateList">
          <cube-slide-item v-for="(item, index) in cateList" :key="index">
            <ul>
              <li @click="toFood(i)" v-for="i in item" :key="i.id">
                <!-- 组件默认跳转链接方式 -->
                <img :src="imgsrc + i.image_url" alt="">
                <p>{{ i.title }}</p>
              </li>
            </ul>
          </cube-slide-item>
          <template slot="dots" slot-scope="props">
            <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots" :key="index">{{index + 1}}</span>
          </template>
        </cube-slide>
      </div>
    </div>
    <main class="main">
      <div class="nearbyShop">
        <van-icon class="shop_icon" name="shop-o" />
        <span>附近商家</span>
      </div>
      <shopCard :shopList="item" v-for="(item, index) in shopList" :key="index"></shopCard>
    </main>
    <tabbar />
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
import Header from '../components/header'
import shopCard from '../components/shopCard'
export default {
  data() {
    return {
      options: {
        stopPropagation:true
      },
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
    getAddr () {
      this.axios.get(`v2/pois/${this.geohash}`).then(res => {
        this.addrName = res.data.name
        this.latitude = res.data.latitude
        this.longitude = res.data.longitude
        this.getShopList()
      })
    },
    getFoodsCate () {
      this.axios.get('v2/index_entry').then(res => {
        this.cateList.push(res.data.slice(0, 8))
        this.cateList.push(res.data.slice(8, 16))
      })
    },
    getShopList () {
      this.axios.get('shopping/restaurants', {
        params: {
          latitude: this.latitude,
          longitude: this.longitude
        }
      }).then(res => {
        this.shopList = res.data
      })
    },
    toHome () {
      this.$router.push({path: '/home'})
    },
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
    @include bgc($pagecl);
    .HeaderCPNT {
      @include bgc(white);
      .search_icon {
        padding-left: 15px;
        font-size: 24px;
        line-height: 52px;
      }
      .city_name {
        font-size: 20px;
        overflow:hidden;
        max-width: 188px;
      }
      .lor {
        font-size: 16px;
        line-height: 48px;
      }
    }
    .cate {
      @include bgc(white);
      padding-top: 48px;
      .slidebox {
        padding-bottom: 20px;
        border-bottom: 1px solid $bordercl;
        .slide {
          padding-bottom: 10px;
          ul {
            width: 100%;
            li {
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
          .my-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            &:last-of-type {
              margin-left: 10px;
            } 
          }
          .active {
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
