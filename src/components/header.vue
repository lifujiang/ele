<template>
  <div class="headerPage">
    <header class="header">
      <slot name="left"></slot>
      <slot></slot>
      <slot name="right"></slot>
    </header> 
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .headerPage {
    @import '../static/styles/mixin';
      height: 48px;
      width: 375px;

    .header {
      @include flexbw;
      @include bgc($maincl);
      z-index: 100;
      position: fixed;
      width: 100%;
      font-size: 16px;
      color: white;
      line-height: 48px;
      padding-left: 5px;
      padding-right: 10px;
    }
  }
</style>
