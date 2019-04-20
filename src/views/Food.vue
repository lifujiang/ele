<template>
  <div class="foodPage">
    <header-default :title="info.title"></header-default>
    <div class="filterFood">
      <ul class="filterBox clearFix" >
        <li>
          <span class="word">商超便利</span>
          <span class="arrow"></span>
        </li>
        <li>
          <span class="word">排序</span>
          <span class="arrow"></span>
        </li>
        <li>
          <span class="word">筛选</span>
          <span class="arrow"></span>
        </li>
      </ul>
    </div>
    <div class="main">
      <shopCard :shopList="item" v-for="(item, index) in shopList" :key="index"></shopCard>
    </div>
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import shopCard from '../components/shopCard'
export default {
  data () {
    return {
      info: {},
      latitude: '',
      longitude: '',
      shopList: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    // 获取查询字符串里的经纬度(未分开)
    getInfo () {
      this.info = this.$route.query
      // 获取经纬度之后才能分别得出经度和纬度
      this.getXitude()
    },
    // 分出经度和纬度
    getXitude () {
      var i = this.info.geohash.indexOf(',')
      var geohash = this.info.geohash
      this.latitude = geohash.slice(0, i)
      this.longitude = geohash.slice(i + 1)
      // 获得经纬度之后才能请求商铺信息
      this.getShops()
    },
    // 获取商铺信息
    getShops () {
      this.axios.get('shopping/restaurants', {
        params: {
          latitude: this.latitude,
          longitude: this.longitude,
          restaurant_category_id: this.info.restaurant_category_id
        }
      }).then(res => {
        this.shopList = res.data
      })
    }
  },
  components: {
    headerDefault,
    shopCard
  }
}
</script>

<style lang="scss">
  .foodPage {
    height: 888px;
    @import '../static/styles/mixin.scss';
    .filterFood {
      font-size: 13px;
      color: #666;
      border-bottom: 1px solid #eee;
      .filterBox {
        width: 100%;
        li {
          &:not(:last-of-type) {
            border-right: 1px solid $bordercl;
          }
          margin: 6px 0;
          padding: 5px 0;
          text-align: center;
          width: 33.3%;
          float: left;
          .arrow {
            width:0;
            height:0;
            margin-left: 5px;
            padding-bottom: 2px;
            border-width:5px 5px 0;
            border-style:solid;
            border-color:#666 transparent transparent;/*灰 透明 透明 */
            position: relative;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
