<template>
  <div class="searchPage">
    <!-- 头部 -->
    <header-default :title="'搜索'"></header-default>
    <div class="keyword">
      <input type="search" class="search_input" placeholder="请输入商家或美食名称">
      <button class="search_btn">提交</button>
    </div>
    <tabbar :i="1" />
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import tabbar from '../components/tabbar'
export default {
  data () {
    return {

    }
  },
  methods:  {

  },
  components: {
    headerDefault,
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
  }
</style>
