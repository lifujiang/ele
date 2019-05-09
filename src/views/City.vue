<template>
  <div class="cityPage">
    <Header class="HeaderCPNT">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="back" class="back" />
      </template>
      <template v-slot:default>
        <span class="city_name">{{ city_info.name }}</span>
      </template>
      <template v-slot:right>
        <span @click="changeCity">切换城市</span>
      </template>
    </Header>
    <main class="main">
      <div class="search">
        <form>
          <input type="search" class="input_search" v-model="keyword" required placeholder="输入学校、商务楼、地址">
          <input type="submit" class="search_btn" @click="showSearch">
        </form>
      </div>
      <div class="search_res">
        <!-- 搜索历史 -->
        <p class="word" v-if="search_flag === 0">搜索历史</p>
        <!-- 无搜索结果 -->
        <div class="no_res" v-if="search_flag === 2">很抱歉! 无搜索结果</div>
        <!-- 搜索记录和历史记录共享组件, 由值 res 渲染 -->
        <div class="show_search">
          <div class="site_box" v-for="item of res" :key="item.geohash" @click="goandsave(item)">
            <p class="site_name">{{ item.name }}</p>
            <p class="site_addr">{{ item.address }}</p>
          </div>
        </div>
        <!-- 历史记录存在 才显示按钮 -->
        <div class="clear_all" @click="clearAll" v-if="search_flag === 0 && search_his.length !== 0">清空所有</div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  props: ['id'],
  data () {
    return {
      // 搜索结果标识, 0 代表历史记录, 1 代表存在搜索结果, 2 代表不存在搜索结果
      search_flag: 0,
      // 关键字
      keyword: '',
      // 城市信息(顶部标题)
      city_info: {},
      // 搜索历史, 显示需传值给res
      search_his: [],
      // 显示数据
      res: [] // 对象没长度, 这样能使初始状态不显示 no_res
    }
  },
  created () {
    this.getCityInfo()
    var temp_his = window.localStorage.getItem('addr_his')
    this.search_his = temp_his ? JSON.parse(temp_his) : []
    this.res = this.search_his
  },
  methods: {
    // 返回上一页
    back () {
      this.$router.push({path: '/home'})
    },
    // 获取城市信息(标题)
    getCityInfo () {
      this.$api.cityInfo(this.id)
      .then(res => {
        this.city_info = res.data
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    // 显示搜索结果
    showSearch (e) {
      // 判断关键字是否为空
      if (this.keyword === '') return
      // 阻止提交表单默认行为
      e.preventDefault()
      // 获取搜索结果
      this.getSearchInfo()
    },
    // 获取搜索信息
    getSearchInfo () {
      this.$api.searchInfo({
        city_id: this.id,
        keyword: this.keyword
      })
      .then(res => {
        this.res = res.data
        // 判断是否有返回结果
        this.isExist()
      })
      .catch(err => {
        this.$app.error(err)
      })
    },
    // 判断是否有返回结果
    isExist () {
      if (this.res.length === 0) {
        this.search_flag = 2
        return
      }
      this.search_flag = 1
    },
    // 本地储存历史地址
    goandsave (item) {
      // 通过标识符来确定该信息是否已被储存
      var flag = this.search_his.some(res => {
        // 判断是否有重复
        return res.geohash === item.geohash
      })
      if (!flag) {
        this.search_his.unshift(item)
        window.localStorage.setItem('addr_his', JSON.stringify(this.search_his))
      }
      // 存储经纬信息
      this.$store.commit('getSiteInfo', item)
      // 跳转
      this.$router.push({path: '/msite', query: { geohash: item.geohash }})
    },
    // 清除搜索记录
    clearAll () {
      window.localStorage.removeItem('addr_his')
      // 初始化变量
      this.search_his = this.res = []
    },
    // 返回上一层
    back () {
      this.$router.go(-1)
    },
    // 返回选择城市列表
    changeCity () {
      this.$router.push({path: '/home'})
    }
  },
  watch: {
    keyword (val) {
      if (val !== '') return
      this.search_flag = 0
      this.res = this.search_his
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" scope>
  .cityPage {
    @import '../static/styles/mixin';
    width: 375px;
    .HeaderCPNT {
      .back {
        height: 48px;
        line-height: 48px;
        font-size: 24px;
      }
      .city_name {
        overflow:hidden;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .main {
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
              overflow: hidden;
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
  }
</style>
