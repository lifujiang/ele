<template>
  <div class="noticePage">
    <van-dialog
      v-model="show"
      :show-confirm-button="false"
    >
      <van-icon name="warning-o" />
      <p class="word">{{ title }}</p>
      <van-button size="large" type="primary" class="comfirmBTN" @click="$emit('hidden-notice')">确认</van-button>          
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ['title', 'show'],
  data () {
    return {
      // 获取父组件显示标识, 上面通过 emit 改变父组件显示标识实现双向改变
      sub_show: this.show
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .noticePage {
    text-align: center;
    .van-icon.van-icon-warning-o {
      margin-top: 30px;
      font-size: 90px;
      color: rgb(255, 203, 132);
    }
    .word {
      font-size: 17px;
      margin: 15px;
    }
    .comfirmBTN {
      margin-top: 10px;
    }
  }
</style>
