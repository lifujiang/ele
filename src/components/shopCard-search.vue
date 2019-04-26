<template>
  <div class="shopCardSearchPage">
    <div class="shopCard clearFix">
      <div class="img">
        <img :src="imgsrc + res.image_path" alt="">
      </div>
      <div class="info">
        <p class="title">
          <span>{{ res.name }}</span>
          <span class="pay">
            <span class="payword">支付</span>
          </span>
        </p>
        <p>月售 {{ res.recent_order_num }} 单</p>
        <p>{{ res.float_minimum_order_amount }} 元起送 / 距离{{ res.distance }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['res'],
  data () {
    return {
      imgsrc: 'https://elm.cangdu.org/img/'
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
  .shopCardSearchPage {
    @import '../static/styles/mixin.scss';
    .shopCard {
      height: 100px;
      overflow-x: hidden;
      padding: 12px;
      @include bgc(white);
      .img {
        height: 100%;
        float: left;
        padding-right: 5px;
        img {
          display: block;
          width: 43px;
        }
      }
      .info {
        color: #333;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        // 浮动图片的距离
        margin-left: 47px;
        // 边框与内容的距离
        padding-bottom: 10px;
        p {
          margin-top: 7px;
        }
        .title {
          .pay {
            font-weight: bold;
            color: rgb(255, 105, 16);
            font-size: 10.8px;
            margin-left: 3px;
            display: inline-block;
            border: 1px solid rgb(255, 105, 16);
            padding: 1px;
            transform: skew(-20deg);
            -webkit-transform: scale(0.8) skew(-20deg);
            // 提升美感
            .payword {
              border-bottom: 1px solid rgb(255, 105, 16);
            }
          }
        }
      }
    }
  }
</style>
