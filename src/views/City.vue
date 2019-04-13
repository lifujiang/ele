<template>
  <div class="cityPage">
    <header class="header">
      <span @click="back" class="back">&lt;</span>
      <span class="city_name">{{ city_info.name }}</span>
      <span @click="back" class="change_city">切换城市</span>
    </header>
    <div class="search">
      <form>
        <input type="search" class="input_search" ref="inputWords" required placeholder="输入学校、商务楼、地址">
        <input type="submit" class="search_btn" @click="show_search">
      </form>
    </div>
    <div class="search_res">
      <p class="word" v-if="search_flag">搜索历史</p>
      <div class="no_res" v-if="res.length === 0">很抱歉! 无搜索结果</div>
      <div class="show_search">
        <div class="site_box" v-for="item of res" :key="item.geohash" @click="goandsave(item)">
          <p class="site_name">{{ item.name }}</p>
          <p class="site_addr">{{ item.address }}</p>
        </div>
      </div>
      <!-- 历史记录存在 且在搜索之前 才显示按钮 -->
      <div class="clear_all" @click="clearAll" v-if="search_his.length !== 0 && search_flag">
        清空所有
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      search_flag: true,
      city_info: {},
      search_detail: [],
      search_his: [],
      res: {} // 对象没长度, 这样能使初始状态不显示 no_res
    }
  },
  created () {
    this.getCityInfo()
    this.search_his = JSON.parse(window.localStorage.getItem('addr_his'))
    if (!this.search_his) {
      this.search_his = [] 
      return
    } 
    this.res = this.search_his
  },
  methods: {
    // 返回上一页
    back () {
      this.$router.push({path: '/home'})
    },
    // 显示搜索结果
    show_search (e) {
      if (this.$refs.inputWords.value) {
        this.search_flag = false
        // 阻止提交表单默认行为
        e.preventDefault()
        this.getSearchInfo()
      }
    },
    // 获取城市信息
    getCityInfo () {
      this.axios.get(`v1/cities/${this.id}`).then(res => {
        this.city_info = res.data
      })
    },
    // 获取搜索信息
    getSearchInfo () {
      this.axios.get('v1/pois', {
        params: {
          city_id: this.id,
          keyword: this.$refs.inputWords.value
        }
      }).then(res => {
        this.search_detail = res.data
        this.res = this.search_detail
      })
    },
    // 本地储存历史地址
    goandsave (item) {
      // 通过标识符来确定该信息是否已被储存
      var flag = true
      this.search_his.some(res => {
        // 判断是否有重复
        if (res.geohash === item.geohash) {
          flag = false
          return true
        }
      })
      if (flag) {
        this.search_his.unshift(item)
        window.localStorage.setItem('addr_his', JSON.stringify(this.search_his))
      }
      this.$router.push({path: '/msite', query: { geohash: item.geohash }})
    },
    // 清除搜索记录
    clearAll () {
      window.localStorage.removeItem('addr_his')
      // 初始化变量
      // 历史记录为空数组则"清空所有"按钮隐藏
      this.search_his = []
      this.res = {}
    }
  }
}
</script>

<style lang="scss" scope>
  .cityPage {
    @import '../static/styles/mixin';
    @include bgc($pagecl);
    width: 375px;
    height: 667px;
    .header {
      @include bgc($maincl);
      height: 48px;
      color: white;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      line-height: 48px;
      .back {
        font-size: 30px;
        padding-left: 10px;
      }
      .city_name {
        font-size: 20px;
        font-weight: bold;
      }
      .change_city {
        padding-right: 10px;
      }
    }
    .search {
      @include bgc(white);
      margin-top: 12px;
      padding-bottom: 10px;
      padding-top: 15px;
      border-bottom: 2px solid $bordercl;
      .input_search {
        display: block;
        width: 340px;
        height: 36px;
        border: 1px solid #ccc;
        border-radius: 2px;
        margin: 0 auto;
        margin-bottom: 12px;
        padding-left: 10px;
      }
      .search_btn {
        @include bgc($maincl);
        display: block;
        border: none;
        color: #fff;
        width: 340px;
        height: 36px;
        margin: 0 auto;
        border-radius: 4px;
      }
    }
    .search_res {
      .word {
        font-size: 13px;
        padding: 2px 10px;
        border-bottom: 1px solid $bordercl;
      }
      .no_res {
        @include bgc(white);
        padding: 10px;
      }
      .show_search {
        .site_box {
          @include bgc(white);
          padding: 12px 18px;
          height: 75px;
          border-bottom: 1px solid $bordercl;
          .site_name {
            font-size: 17px;
            padding-bottom: 8px;
          }
          .site_addr {
            font-size: 13px;
            color: #aaa;
          }
        }
      }
      .clear_all {
        color: #555;
        font-size: 18px;
        padding: 15px;
        text-align: center;
        @include bgc(white);
        border-bottom: 1px solid $bordercl;
      }
    } 
  }
</style>
