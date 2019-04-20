<template>
  <div class="slidebox">
    <van-swipe :autoplay="3000" indicator-color="white" class="slide" :width="375">
      <van-swipe-item v-for="(item, index) in cateList" :key="index">
        <ul>
          <li @click="toFood" v-for="i in item" :key="i.id">
            <!-- 组件默认跳转链接方式 -->
            <img :src="imgsrc + i.image_url" alt="">
            <p>{{ i.title }}</p>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgsrc: 'https://fuss10.elemecdn.com',
      cateList: []
    }
  },
  created () {
    this.getFoodsCate()
  },
  methods: {
    getFoodsCate () {
      this.axios.get('v2/index_entry').then(res => {
        this.cateList.push(res.data.slice(0, 8))
        this.cateList.push(res.data.slice(8, 16))
      })
    },
    toFood () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scope>
  @import '../static/styles/mixin';
      .slidebox {
        padding-bottom: 20px;
        border-bottom: 1px solid $bordercl;
        .slide {
          padding-bottom: 10px;
          ul {
            width: 100%;
            li {
              width: 25%;
              text-align: center;
              float: left;
              font-size: 14px;
              padding: 10px;
              img {
                margin: 0 auto;
                display: block;
                height: 42px;
              }
              p {
                padding-top: 13px;
              }
            }
          }
          .my-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            &:last-of-type {
              margin-left: 10px;
            } 
          }
          .active {
            @include bgc($maincl);
          }
        }
      }
</style>
