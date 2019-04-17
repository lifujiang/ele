<template>
  <div class="shopCardPage">
    <div class="shopCard">
      <img class="shopImg" :src="imgsrc + shopList.image_path" alt="">
      <div class="info">
        <div class="info_top">
          <div class="top_left">
            <span class="brand">品牌</span>
            <span class="shop_name">{{ shopList.name }}</span>
          </div>
          <div class="top_right">
            <span v-for="item in shopList.supports" :key="item.id">{{ item.icon_name }}</span>
          </div>
        </div>
        <div class="info_middle">
          <div class="middle_left">
            <van-rate color="rgb(247, 182, 90)" allow-half :size="12" v-model="star" readonly />
            <span class="rating">{{ shopList.rating }}</span>
            <span class="mon_sale">月售{{ shopList.recent_order_num }}单</span>
          </div>
          <div class="middle_right">
            <span class="fengniao">蜂鸟专送</span>
            <span class="zhunshi">准时达</span>
          </div>
        </div>
        <div class="info_bottom">
          <div class="bottom_left">
            <span>&yen;{{ shopList.float_minimum_order_amount}}起送 / {{ shopList.piecewise_agent_fee.tips}}</span>
          </div>
          <div class="bottom_right">
            <span>{{ shopList.distance }} / </span>
            <span class="needTime">{{ shopList.order_lead_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['shopList'],
  data () {
    return {
      star: 2,
      imgsrc: 'https://elm.cangdu.org/img/'
    }
  },
  created () {
    this.star = this.shopList.rating
  }
}
</script>

<style lang="scss">
  .shopCardPage {
    // 禁止卡片左右移动
    overflow-x: hidden;
    width: 375px;
    @import '../static/styles/mixin';
    .shopCard {
      border-bottom: 1px solid $bordercl;
      padding: 18px 8px;
      .shopImg {
        display: block;
        float: left;
        height: 60px;
        padding-right: 10px;
      }
      .info {
        font-size: 12px;
        color: #555;
        div[class^='info_'] {
         @include flexbw();
         &:not(:last-of-type) {
           padding-bottom: 12px;
         }
        }
        .info_top {
          .top_left {
            .brand{
              @include bgc(rgb(255, 219, 49));
              padding: 0 3px;
              font-weight: bold;
            }
            .shop_name {
              color: #000;
              font-weight: bold;
              font-size: 15px;
              padding-left: 7px;
            }
          }
          .top_right {
            color: #aaa;
            span{
              border: 1px solid #eee;
              font-size: 9.6px;
              // 通过 scale 和 inline-block 使 chrome 显示小字体
              -webkit-transform: scale(0.8);
              display:inline-block;
              &:not(:first-of-type){
                margin-left: 1px;
              }
            }
          }
        }
        .info_middle {
          .middle_left {
            .van-rate {
              display: inline-block;
              i {
                width: 5px;
              }
            }
            .rating {
              font-size: 13px;
              padding-left: 10px;
              color: rgb(247, 182, 90);
            }
            .mon_sale{
              font-size: 10.8px;
              // 通过 scale 和 inline-block 使 chrome 显示小字体
              -webkit-transform: scale(0.8);
              display:inline-block;
            }
          }
          .middle_right {
            font-size: 8.4px;
            // 通过 scale 和 inline-block 使 chrome 显示小字体
            -webkit-transform: scale(0.7);
            display:inline-block;
            // 解决缩小后原空间不被占用
            zoom:1.4;
            margin-right: -10px;
            span {
              border-radius: 1px;
              border: 1px solid $maincl;
            }
            .fengniao {
              margin-right: 2px;
              @include bgc($maincl);
              color: #fff;
            }
            .zhunshi {
              color: $maincl;
            }
          }
        }
        .info_bottom {
          font-size: 10.8px;
          // 通过 scale 和 inline-block 使 chrome 显示小字体
          -webkit-transform: scale(0.95);
          display:inline-block;
          .bottom_left {
            span {
              margin-left: -5px;
            }
          }
          .bottom_right {
            color: #aaa;
            .needTime {
              margin-right: -10px;
              color: $maincl;
            }
          }
        }
      }
    }
  }
</style>
