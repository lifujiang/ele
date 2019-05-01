<template>
  <div class="servicePage">
    <header-default :title="'服务中心'" />
    <!-- 客服 -->
    <div class="server">
      <div class="online">
        <p class="iconfont icon-service"></p>
        <p>在线客服</p>
      </div>
      <div class="phone">
        <p class="iconfont icon-hot-line"></p>
        <p>电话客服</p>
      </div>
    </div>
    <!-- 问题 -->
    <div class="hotQuestion">
      <div class="title">
        热门问题
      </div>
      <router-link class="detail" tag="div" v-for="(i, num) of captionList" :key="i" :to="`/question/${num}`" :content="1">
        <span class="word">{{ explain[i] }}</span>
        <van-icon name="arrow" color="#555" />
      </router-link>
    </div>
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
export default {
  data () {
    return {
    }
  },
  created () {
    this.getExplain()
  },
  computed: {
    captionList () {
      return this.$store.state.explainCaption
    },
    explain () {
      return this.$store.state.explain
    }
  },
  methods: {
    getExplain () {
      if (!this.$store.state.explainContent.length) {
        this.axios.get('v3/profile/explain').then(res => {
          this.$store.commit('getInfo', {
            data: res.data,
            name: 'explain'
          })
          this.toList(res.data)
        })
      }
    },
    toList (data) {
      let tempContent = []
      let tempCaption = []
      for (let i in data) {
        if (i.includes('Content')) {
          tempContent.push(i)
        } else if(i.includes('Caption')){
          tempCaption.push(i)
        }
      }
      this.$store.commit('getInfo', {
        data: tempContent,
        name: 'explainContent'
      })
      this.$store.commit('getInfo', {
        data: tempCaption,
        name: 'explainCaption'
      })
    }
  },
  components: {
    headerDefault
  }
}
</script>

<style lang="scss">
  .servicePage {
    @import '../static/styles/mixin.scss';
    color: #555555;
    @include bgc(white);
    .server {
      display: flex;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      .online,
      .phone {
        flex-grow: 1;
        padding: 10px;
        &:first-of-type {
          border-right: 1px solid #eee;
        }
        p {
          margin: 10px 0;
        }
        .icon-service {
          font-size: 25px;
          color: rgb(255, 121, 82);
        }
        .icon-hot-line {
          font-size: 25px;
          color: rgb(107, 195, 8);
        }
      }
    }
    .hotQuestion {
      .title {
        padding: 27px 18px;
        font-size: 18px;
      }
      .detail {
        font-size: 14px;
        padding: 15px 18px;
        border-top: 1px solid #eee;
        display: flex;
        .word {
          display: inline-block;
          flex-grow: 1;
        }
      }
    }
  }
</style>
