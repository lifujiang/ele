<template>
  <div class="searchPage">
    <!-- 头部 -->
    <header-default :title="'搜索'"></header-default>
    <!-- 搜索关键字 -->
    <div class="keyword">
      <form action="">
        <input type="search" class="search_input" v-model="keyword" placeholder="请输入商家或美食名称">
        <input type="submit" class="search_btn" @click="showRes">
      </form>
    </div>
    <!-- 搜索结果 -->
    <div class="main">
      <!-- 存在记录 -->
      <div class="res" v-if="res_flag == 1">
        <p class="shopWord">商家</p>
        <div class="shopCard">
          <shopCard-search v-for="item of res" :key="item.id" :res="item"></shopCard-search>
        </div>
      </div>
      <!-- 不存在记录 -->
      <div class="no_res" v-if="res_flag == 2">
        很抱歉 ! 无搜索结果
      </div>
    </div>
    <!-- 底部 -->
    <tabbar :i="1" />
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import shopCardSearch from '../components/shopCard-search'
import tabbar from '../components/tabbar'
export default {
  data () {
    return {
      res_flag: 1,
      res: [],
      keyword: ''
    }
  },
  methods:  {
    // 显示结果
    showRes (e) {
      e.preventDefault()
      // 不能为空
      if (this.keyword === '') return
      // 获取结果
      this.getSearchRes()
    },
    // 获取搜索结果
    getSearchRes () {
      this.axios.get('v4/restaurants', {
        params: {
          geohash: this.$route.params.geohash,
          keyword: this.keyword
        }
      }).then(res => {
        this.res = res.data
        // 判断返回值是否存在数据
        this.isExist()
      })
    },
    // 判断是否存在返回值
    isExist () {
      if (this.res.length == 0) {
        this.res_flag = 2
        return
      }
      this.res_flag = 1
    }
  },
  components: {
    headerDefault,
    shopCardSearch,
    tabbar
  }
}
</script>

<style lang="scss">
  .searchPage {
    @import '../static/styles/mixin';
    .keyword {
      @include bgc(white);
      padding: 10px;
      .search_input {
        width: 275px;
        height: 36px;
        font-weight: bold;
        @include bgc($pagecl);
        border: 1px solid #e5e5e5;
        padding-left: 5px;
        border-radius: 3px;
      }
      .search_btn {
        @include bgc($maincl);
        margin-left: 5px;
        border: none;
        color: #fff;
        width: 75px;
        height: 36px;
        border-radius: 4px;
      }
    }
    .main {
      .res {
        .shopWord {
          padding: 10px;
          font-size: 14px;
        }
        .shopCard {
          margin-top: 5px;
          @include bgc(white);
          border-bottom: 1px solid $bordercl;
        }
      }
      .no_res {
        @include bgc(white);
        border-top: 3px solid $pagecl;
        font-size: 14px;
        color: #555;
        padding: 15px;
        text-align: center;
      }
    }
  }
</style>
