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
      <!-- 搜索前 -->
      <!-- 注意, 这里的 isHistory 需要括号, 代表获取值而不是引用 -->
      <div class="history" v-if="isHistory()">
        <p class="word">搜索历史</p>
        <div class="content">
          <p class="search_history_word" @click="his_showRes(item)" v-for="item of his" :key="item">{{ item }}</p>
          <div class="clearAll" @click="clearAll">清空搜索历史</div>
        </div>
      </div>
      <!-- 存在记录 -->
      <div class="res" v-if="res_flag == 1">
        <p class="shopWord">商家</p>
        <div class="shopCard">
          <shopCard-search v-for="item of res" :key="item.id" :geohash="geohash" :res="item"></shopCard-search>
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
      res_flag: 0, // 控制显示搜索结果(1代表存在结果, 2代表不存在结果, 0为搜索前)
      res: [], // 搜索结果(商店数据)
      his: [], // 历史记录数组(存储本地)
      geohash: this.$route.params.geohash,
      keyword: '' // 搜索关键字
    }
  },
  created () {
    var store_his = window.localStorage.getItem('search_his')
    this.his = store_his ? JSON.parse(store_his) : []
  },
  methods:  {
    // 显示结果
    showRes (e) {
      e.preventDefault()
      // 输入框不能为空
      if (this.keyword === '') return
      // 获取结果
      this.getSearchRes()
    },
    // 获取搜索结果
    getSearchRes () {
      this.axios.get('v4/restaurants', {
        params: {
          geohash: this.geohash,
          keyword: this.keyword
        }
      })
      .then(res => {
        if (res.data.status === 0) {
          this.res_flag = 2
          return
        }
        this.res = res.data
      })
      // 防止请求错误
      // 暂时修复此处, 注意: 重构时需将其他处修改(包括获取失败处理)
      .finally(() => {
        // 判断搜索结果是否存在
        this.isExist()
      })
    },
    // 判断是否存在搜索结果
    isExist () {
      // 存在数据则存入内存, 如果不需要将无结果记录存入可放在最后
      this.isStore()
      if (this.res.length == 0) {
        this.res_flag = 2
        return
      }
      this.res_flag = 1
    },
    // 是否本地存储
    isStore () {
      // 循环判断是否存在记录
      var store_flag = this.his.some(res => {
        // 纪录存在时返回 true
        return (res === this.keyword)
      })
      // 来判断是否添加记录
      if (!store_flag) {
        this.his.push(this.keyword)
        window.localStorage.setItem('search_his', JSON.stringify(this.his))
      }
    },
    // 本地是否存在记录
    isHistory () {
      // 历史记录数组长度不为0(存在记录)和结果标识为 0 显示
      if (this.his.length !== 0 && this.res_flag === 0) {
        return true
      }
    },
    // 通过历史记录获取搜索结果
    his_showRes (item) {
      this.keyword = item
      // 变换标识符为不存在的值
      this.res_flag = -1
      // 获取结果
      this.getSearchRes()
    },
    clearAll () {
      this.his = []
      window.localStorage.removeItem('search_his')
    }
  },
  watch: {
    // 监视 keyword 改变, 值为空时取 0(默认值)
    keyword (val) {
      if (val === '') {
        this.res_flag = 0
      }
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
      .history {
        .word {
          padding: 15px;
          color: #555;
          font-size: 15px;
          font-weight: bold;
        }
        .content {
          @include bgc(white);
          .search_history_word {
            padding: 15px;
            padding-left: 10px;
            border-bottom: 1px solid $bordercl;
          }
          .clearAll {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            padding: 15px;
            color: $maincl;
          }
        }
      }
    }
  }
</style>
