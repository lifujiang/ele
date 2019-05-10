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
          v-for="(foods, index) in data"
          :key="foods.id"
          :class="{current: index === currentIndex}">
            <span class="menu-title">{{ foods.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 商品栏 -->
      <div class="goods-wrapper">
        <!-- 导航栏标题 -->
        <ul class="goods-ul" ref="goodsList">
          <li class="goods-li" v-for="foods in data" :key="foods.id">
            <div class="title-box">
              <span class="title">{{ foods.name }}</span>
              <span class="subTitle"></span>
              <span class="detail">...</span>
            </div>
            <ul>
              <li v-for="food in foods.foods" :key="food.id">
                <food-card :food="food"></food-card>
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
import foodCard from '../components/foodCard'
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
    this.getFoods()
  },
  methods: {
    getFoods () {
      this.$api.goods({
        restaurant_id: 1
      })
      .then(res => {
        this.data = res.data
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
  },
  components: {
    foodCard
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
          .goods-li {
            .title-box {
              height: 40px;
              line-height: 40px;
              .title {
                
              }
              .subTitle {}
              .detail {}
            }
          }
        }
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
