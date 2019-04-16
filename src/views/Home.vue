<template>
  <div class="homePage">
    <!-- 顶部栏 -->
    <Header class="HeaderCPNT">
      <template v-slot:left>
        <span class="brand" @click="reload">ele.me</span>
      </template>
      <template v-slot:right>
        <span class="lor">登录|注册</span>
      </template>
    </Header>
    <!-- 城市定位 -->
    <div class="city_list">
      <div class="location">
        <span class="located">当前定位城市: </span>
        <span class="choice">定位不准时 , 请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guess_city.id" class="select_city">
        <span class="guess">{{ guess_city.name }}</span>
        <span class="right_arr">&gt;</span>
      </router-link>
    </div>
    <!-- 热门城市 -->
    <cityList :city_list="hot_city" :city_word="'热门城市'" :isBlue="true"></cityList>
    <!-- 遍历A-Z顺序数组 -->
    <div v-for="(d, index) in all_city" :key="index">
      <!-- 遍历每一项对象 -->
      <cityList v-for="(data, i) in d" :key="i" :city_list="data" :city_word="i"></cityList>
    </div>
  </div>
</template>

<script>
import Header from '../components/header'
import cityList from '../components/city-list.vue'
export default {
  data () {
    return {
      guess_city: {},
      hot_city: [],
      all_city: []
    }
  },
  created () {
    this.getGuessCity()
    this.getHotCity()
    this.getAllCity()
  },
  methods: {
    getGuessCity () {
      this.axios.get('v1/cities', {
        params: { type: 'guess' }
      }).then(item => {
        this.guess_city = item.data
      })
    },
    getHotCity () {
      this.axios.get('v1/cities', {
        params: { type: 'hot' }
      }).then(item => {
        this.hot_city = item.data
      })
    },
    getAllCity () {
      this.axios.get('v1/cities', {
        params: { type: 'group' }
      }).then(item => {
        /* 大坑, v-for 的顺序为 Object.keys, Object.keys在这里并不是A-Z */
        // 将获取的对象套一层数组, 方便遍历
        var newKey = Object.keys(item.data).sort()
        for (var i of newKey) {
          var obj = {}
          obj[i] = item.data[i]
          this.all_city.push(obj)
        }
      })
    },
    reload () {
      window.location.reload();
    }
  },
  components: {
    Header,
    cityList
  }
}
</script>

<style lang="scss" scope>
  .homePage {
    @import '../static/styles/mixin';
    @include bgc($pagecl);
    .HeaderCPNT {
      .brand {
        font-size: 18px;
        line-height: 53px;
        padding-left: 10px;
      }
      .lor {
        font-size: 16px;
        line-height: 55px;
      }
    }
    .city_list {
      padding-top: 48px;
      @include bgc(white);
      width: 375px;
      .location {
        @include flexbw;
        height: 45px;
        line-height: 50px;
        border-bottom: 1px solid $bordercl;
        .located {
          font-size: 13px;
          padding-left: 10px;
        }
        .choice {
          font-size: 12px;
          font-weight: bold;
          padding-right: 10px;
          color: #aaa;
        }
      }
      .select_city {
        @include flexbw;
        height: 40px;
        line-height: 45px;
        border-bottom: 1px solid $bordercl;
        .guess {
          font-size: 18px;
          margin-left: 10px;
          color: $maincl;
        }
        .right_arr {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
</style>

