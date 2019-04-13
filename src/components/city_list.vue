<template>
  <div class="city_listPage">
    <p class="key">{{ city_word }}</p>
    <ul class="clearFix">
      <li :class="{isBlue: isBlue ,value: true}" @click="toCity(item)" v-for="item of city_list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['city_list', 'city_word', 'isBlue'],
  data () {
    return {
      
    }
  },
  created () {
  },
  methods: {
    toCity (item) {
      this.$router.push({path: '/city/' + item.id})
    }
  }
}
</script>

<style lang="scss" scpoe>
  @import '../static/styles/mixin.scss';
  .city_listPage {
    width: 375px;
    margin-top: 15px;
    @include bgc(white);
    .key {
      border-top: 1px solid #ddd;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      width: 100%;
      text-align: left;
      padding-left: 10px;
    }
    ul {
      width: 375px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      .value {
        white-space:nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: rgb(99, 101, 99);
        width: 25%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        float: left;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        &:nth-of-type(4n) {
          border-right: none;
        }
      }
      // 热门城市文字颜色
      .isBlue {
        color: $maincl;
      }
    }
  }
</style>