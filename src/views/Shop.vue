<template>
  <div class="shopPage">
    <header class="header" v-if="res">
      <div class="arrowLeft">
        <van-icon name="arrow-left" @click="back" />
      </div>
      <div class="detail">
        <img :src="imgsrc + res.image_path" alt="" class="img">
        <div class="info">
          <p class="title">{{ res.name }}</p>
          <p>{{ res.delivery_mode.text }} / {{ res.order_lead_time }}分钟送达 / {{ res.piecewise_agent_fee.tips }}</p>
          <p>公告 : {{ res.promotion_info }}</p>
        </div>
        <van-icon name="arrow" class="arrowRight" />
      </div>
      <div class="activity" v-if="res.activities.length" @click="showPopup">
        <p>
          <span class="discount">{{ res.activities[0].icon_name }}</span>
          <span>&nbsp;{{ res.activities[0].description}}( APP专享 )</span>
        </p>
        <p>
          <span>1个活动</span>
          <van-icon name="arrow" />
        </p>
      </div>
    </header>
    <van-popup v-model="show" :overlay="false">
      <p class="name">title</p>
      <div class="content">
        <p>
          <span class="title">优惠信息</span>
        </p>
        <p class="content">
          <span class="discount">{{ res.activities[0].icon_name }}</span>
          <span>&nbsp;{{ res.activities[0].description}}( APP专享 )</span>
        </p>
        <p>
          <span class="title">商家公告</span>
        </p>
        <p class="content">{{ res.promotion_info }}</p>
      </div>
      <van-icon name="close" class="clsBTN" @click="hiddenPopup" />
    </van-popup>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.query.id,
      imgsrc: 'https://elm.cangdu.org/img/',
      // 通过 axios 获取的数据是异步的, 而页面渲染是在获取数据之后, 设置为undefined来判断其是否获取到数据, 否则会出现属性未定义的错误
      res: undefined,
      show: false
    }
  },
  created () {
    this.getShopDetail()
  },
  methods: {
    getShopDetail () {
      this.axios.get(`shopping/restaurant/${this.id}`).then(res => {
        this.res = res.data
        console.log(this.res)
      })
    },
    back () {
      this.$router.go(-1)
    },
    showPopup () {
      this.show = true
    },
    hiddenPopup () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  .shopPage {
    @import '../static/styles/mixin.scss';
    width: 375px;
    .header {
      padding: 8px;
      padding-top: 3px;
      color: white;
      @include bgc(#aaa);
      .arrowLeft {
        font-size: 25px;
        width: 30px;
      }
      .detail {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .img {
          display: block;
          width: 70px;
          height: 70px;
        }
        .info {
          margin-left: 5px;
          flex-grow: 1;
          p {
            font-size: 12px;
            margin: 10px 0;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
          }
        }
        .arrowRight {
          font-size: 20px;
        }
      }
      .activity {
        @include flexbw;
        font-size: 12px;
        .discount {
          @include bgc(rgb(247, 113, 115));
          display: inline-block;
          border-radius: 2px;
          padding: 2px 1px;
        }
      }
    }
    .van-popup {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100%;
      height: 100%;
      color: #ffffff;
      padding: 30px;
      @include bgc(rgba(0,0,0,.9));
      .name {
        margin-bottom: 30px;
        font-size: 22px;
      }
      .content {
        font-size: 12px;
        flex-grow: 1;
        p {
          margin-bottom: 20px;
          margin-top: 30px;
          .title {
            border: 1px solid white;
            border-radius: 26px;
            padding: 5px 6px;
          }
        }
        .content {
          text-align: left;
        }
        .discount {
          @include bgc(rgb(247, 113, 115));
          display: inline-block;
          border-radius: 2px;
          padding: 2px 1px;
        }
        
      }
      .clsBTN {
        font-size: 55px;
      }
    }
  }
</style>
