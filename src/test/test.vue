<template>
  <div class="testPage">
    <cube-scroll-nav
  :side="true"
  :data="data"
  :current="current"
  @change="changeHandler"
  @sticky-change="stickyChangeHandler">

  <cube-scroll-nav-panel
    v-for="item in data"
    :key="item.id"
    :label="item.id"
    :title="item.name">
    <ul>
      <li v-for="food in item.foods" :key="food.id">
        <div>
          <img :src=" imgsrc + food.image_path">
          <p>{{food.name}}</p>
        </div>
      </li>
    </ul>
  </cube-scroll-nav-panel>
</cube-scroll-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgsrc: 'https://elm.cangdu.org/img/',
      data: [],
      current: '',
      id: 1
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.axios.get('shopping/v2/menu', {
        params: {
          restaurant_id: this.id
        }
      }).then(res => {
        this.data = res.data
        this.current = this.data[0].id
        console.log(this.data)
      })
    },
     changeHandler(label) {
      console.log('changed to:', label)
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current)
    }
  }
}
</script>

<style lang="scss">
  .testPage {
    .cube-scroll-wrapper {
      height: 667px;
    }
    @import '../static/styles/mixin.scss';
    color: #555;
    .foodCard {
      padding: 13px;
      display: flex;
      .left {
        margin-right: 10px;
        img {
          display: block;
          width: 50px;
          height: 50px;
          border: 1px solid green;
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
          border: 1px solid red;
          color: red;
        }
        .priceSection {
          @include flexbw;
          .left {
            .price {
              font-size: 16px;
              font-weight: bold;
              color: rgb(255, 101, 0);
            }
          }
        }
      }
    }
  }
</style>
