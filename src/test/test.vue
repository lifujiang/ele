<template>
  <div class="testPage">
    <div class="goods">
      <!-- 侧边导航栏 -->
      <div class="menu-wrapper">
        <ul class="item-ul">
          <!-- current -->
          <li
          @click="clickList(index)"
          ref="menuList"
          class="menu-item"
          v-for="(goods, index) in data"
          :key="goods.id"
          :class="{current: index === currentIndex}">
            <span class="menu-title">{{ goods.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 商品栏 -->
      <div class="goods-wrapper">
        <!-- 导航栏标题 -->
        <ul class="goods-ul">
          <li>
            <div>
              <h4></h4>
              <h5></h5>
              <span></span>
            </div>
            <ul ref="goodsList">
              <li class="goods-li" v-for="goods in data" :key="goods.id">
                <div class="foodCard" v-for="food in goods.foods" :key="food.id">
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
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      imgsrc: 'https://elm.cangdu.org/img/',
      data: undefined,
      scrollY: 0,
      rightLiTops: []
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.$api.goods({
        restaurant_id: 1
      })
      .then(res => {
        this.data = res.data
        console.log(this.data)
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    _initBScroll () {
      this.leftBscroll = new BScroll('.menu-wrapper', {click: true});
      this.rightBscroll = new BScroll('.goods-wrapper', {
        probeType: 3
      })
      this.rightBscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    _initRightHeight () {
      let itemArray = []
      let top = 0
      itemArray.push(top)
      // 获取右边所有的li
      let allList = this.$refs.goodsList.querySelectorAll('.goods-li')
      allList.forEach(li => {
        top += li.clientHeight
        itemArray.push(top)
      })
      this.rightLiTops = itemArray;
    },
    _initLeftScroll(index){
      let menu = this.$refs.menuList;
      let el = menu[index];
      this.leftBscroll.scrollToElement(el,300,0,-300)
    },
    clickList (index) {
      this.scrollY = this.rightLiTops[index]
      this.rightBscroll.scrollTo(0, -this.scrollY, 200)
    }
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this._initBScroll()
        this._initRightHeight()
      })
    }
  },
  computed: {
    currentIndex(index) {
      const { scrollY, rightLiTops } = this
      return rightLiTops.findIndex((tops, index) => {
        this._initLeftScroll(index)
        return scrollY >= tops && scrollY < rightLiTops[index +1]
      })
    }
  }
}
</script>

<style lang="scss">
  .testPage {
    @import '../static/styles/mixin.scss';
    
    .goods {
      display: flex;
      .menu-wrapper {
        height: 375px;
        .item-ul{
          .current {
            @include bgc(white);
            &::before {
              content: '';
              position: absolute;
              @include bgc($maincl);
              width: 5px;
              height: 60px;
              left: 0;
            }
          }
          .menu-item {
            width: 80px;
            height: 60px;
            border: 1px solid #ccc;
            overflow-x: hidden;
            white-space: nowrap;
          }
        }
      }
      .goods-wrapper {
        height: 375px;
        .goods-ul {

        }
      }
    }
    .foodCard {
      @include bgc(white);
      border-bottom: 1px solid $bordercl;
      padding: 13px;
      display: flex;
      font-size: 12px;
      width: 375px;
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
