<template>
  <div class="goodsCPNT">
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
              <span class="subTitle">{{ foods.description }}</span>
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
  .goodsCPNT {
    @import '../static/styles/mixin.scss';
    width: 375px;
    .goods {
      display: flex;
      // 侧边导航
      .menu-wrapper {
        @include wordShake;
        // 防止滚动时覆盖顶部元素
        overflow: hidden;
        text-align: center;
        height: 667px;
        .item-ul{
          .current {
            @include bgc(white);
            &::before {
              content: '';
              position: absolute;
              @include bgc($maincl);
              width: 5px;
              height: 55px;
              left: 0;
            }
          }
          .menu-item {
            font-size: 14px;
            width: 90px;
            height: 55px;
            line-height: 65px;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
      .goods-wrapper {
        flex-grow: 1;
        // 防止滚动时覆盖顶部元素
        overflow: hidden;
        width: 285px;
        height: 667px;
        .goods-ul {
          .goods-li {
            .title-box {
              height: 55px;
              line-height: 55px;
              padding-right: 10px;
              color: #aaa;
              display: flex;
              span {
                padding-left: 10px;
              }
              .title {
                color: #333;
                font-size: 17px;
              }
              .subTitle {
                font-size: 13px;
                flex-grow: 1;
              }
              .detail {}
            }
          }
        }
      }
    }
  }
</style>
