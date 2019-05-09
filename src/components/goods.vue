<template>
  <div class="goodsCPNT">
    <cube-scroll-nav
      :side="true"
      :data="data"
      :current="current">
      <cube-scroll-nav-panel
        v-for="item in data"
        :key="item.id"
        :label="item.id"
        :title="item.name">
        <div class="foodCard" v-for="food in item.foods" :key="food.id">
          <div class="left">
            <img :src="imgsrc + food.image_path" alt="">
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
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      imgsrc: 'https://elm.cangdu.org/img/',
      current: '',
      data: []
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.$api.goods({
        restaurant_id: this.id
      })
      .then(res => {
        this.data = res.data
        this.current = this.data[0].id
      })
      .catch(err => {
        this.$api.error(err)
      })
    }
  }
}
</script>

<style lang="scss">
  .goodsCPNT {
    @import '../static/styles/mixin.scss';
    .cube-scroll-wrapper {
      height: 667px;
    }
    .cube-sticky-content {
      .cube-scroll-nav-bar-item {
        @include bgc(#ccc);
        padding: 5px;
        width: 70px;
        line-height: 60px;
        span {
          display: block;
          word-break: break-all;
        }
      }
      .cube-scroll-nav-bar-item_active {
        border-left: 4px solid $maincl;
        color: #555;
        @include bgc(white);
      }
    }
    .foodCard {
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
