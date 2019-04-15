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
    .header {
      @include flexbw;
      width: 375px;
      height: 48px;
      @include bgc($maincl);
      font-size: 16px;
      color: white;
      line-height: 48px;
      padding-left: 5px;
      padding-right: 10px;
    }
  }
</style>
