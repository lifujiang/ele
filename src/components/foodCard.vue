<template>
  <div class="foodCardCPNT">
    <div class="foodCard">
      <div class="left">
        <img :src="handleSrc(food.image_path)" alt="">
      </div>
      <div class="right">
        <p class="title">{{ food.name }}</p>
        <p class="subTitle">{{ food.description }}</p>
        <p>月售{{ food.month_sales }}份 好评率{{ food.satisfy_rate }}%</p>
        <p class="tag" v-if="food.activity">{{ food.activity.image_text }}</p>
        <div class="priceSection">
          <p class="left">
            <span class="price">&yen;20</span>
            <span> 起</span>
          </p>
          <span>+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['food'],
  data () {
    return {
      imgsrc: 'https://elm.cangdu.org/img/'
    }
  },
  methods: {
    // 根据接口特殊性处理SRC
    handleSrc (image) {
      return image[5] == ':' ? image : this.imgsrc + image
    }
  }
}
</script>

<style lang="scss">
  .foodCardCPNT {
    @import '../static/styles/mixin.scss';
    .foodCard {
      @include wordShake;
      @include bgc(white);
      border-bottom: 1px solid $bordercl;
      padding: 13px;
      display: flex;
      font-size: 12px;
      .left {
        margin-right: 10px;
        img {
          display: block;
          width: 50px;
          height: 50px;
        }
      }
      .right {
        flex-grow: 1;
        p {
          margin-bottom: 7px;
          font-size: 12px;
        }
        .title {
          font-size: 17px;
          font-weight: bold;
        }
        .subTitle {
          color: #999;
        }
        .tag {
          border-radius: 8px;
          display: inline-block;
          padding: 1px;
          border: 1px solid #f07373;
          color: #f1884f;
        }
        .priceSection {
          @include flexbw;
          .left {
            .price {
              font-size: 16px;
              font-weight: bold;
              color: rgb(255, 121, 24);
            }
          }
        }
      }
    }
  }
</style>
