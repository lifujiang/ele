<template>
  <div class="profilePage">
    <!-- 顶部 -->
    <header-default :title="'我的'"></header-default>
    <!-- 个人信息 -->
    <div class="myProfile">
      <div class="info" @click="loginOrInfo">
        <div class="avatar">
          <span class="iconfont icon-user-nologin"></span>
        </div>
        <div class="loginInfo">
          <p class="login">
              登录/注册
          </p>
          <p class="phone">
            <span class="iconfont icon-phone"></span>
            <span>暂无绑定手机号</span>
          </p>
        </div>
        <van-icon name="arrow" color="#fff" />
      </div>
      <ul class="aboutMoney">
        <li>
          <p><span class="moneyOrange">0.00</span>元</p>
          <p>我的余额</p>
        </li>
        <li>
          <p><span class="discountRed">0</span>个</p>
          <p>我的优惠</p>
        </li>
        <li>
          <p><span class="pointsGreen">0</span>分</p>
          <p>我的积分</p>
        </li>
      </ul>
    </div>
    <!-- 功能 -->
    <div class="function">
      <router-link to="/order" tag="div">
        <span class="iconfont icon-order"></span>
        <p>
          <span>我的订单</span>
          <van-icon name="arrow" color="#bbb" />
        </p>
      </router-link>
      <div>
        <span class="iconfont icon-shop-bag"></span>
        <p>
          <span>积分商城</span>
          <van-icon name="arrow" color="#bbb" />
        </p>
      </div>
      <div>
        <span class="iconfont icon-vip"></span>
        <p class="noBorder">
          <span>饿了么会员</span>
          <van-icon name="arrow" color="#bbb" />
        </p>
      </div>
      <router-link tag="div" to="/service">
        <span class="iconfont icon-server-center"></span>
        <p>
          <span>服务中心</span>
          <van-icon name="arrow" color="#bbb" />
        </p>
      </router-link>
      <div>
        <span class="elm">e</span>
        <p class="noBorder">
          <span>下载饿了么APP</span>
          <van-icon name="arrow" color="#bbb" />
        </p>
      </div>
    </div>
    <!-- 底部 -->
    <tabbar :i="3" />
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import tabbar from '../components/tabbar'
export default {
  data () {
    return {}
  },
  methods: {
    loginOrInfo () {
      this.$router.push('/login')
    }
  },
  components: {
    headerDefault,
    tabbar
  }
}
</script>

<style lang="scss">
  .profilePage {
    @import '../static/styles/mixin.scss';
    .myProfile {
      width: 100%;
      margin-bottom: 10px;
      .info {
        @include bgc($maincl);
        padding: 15px;
        display: flex;
        align-items: center;
        .avatar {
          width: 60px;
          display: inline-block;
          border-radius: 50%;
          .icon-user-nologin {
            color: #eee;
            font-size: 70px;
          }
        }
        .loginInfo {
          flex-grow: 1;
          color: #ffffff;
          line-height: 25px;
          margin-left: 10px;
          display: inline-block;
          .login {
            padding-left: 5px;
            font-size: 19px;
            font-weight: bold;
          }
          .phone {
            font-size: 14px;
            .icon-phone {
              display: inline-block;
              vertical-align: top;
              font-size: 19px;
            }
          }
        }
      }
      .aboutMoney {
        @include bgc(white);
        display: flex;
        // 容器
        li {
          color: #555;
          font-size: 14px;
          display: inline-block;
          flex-grow: 1;
          padding: 10px;
          text-align: center;
          // 不设置最后一个容器的边框
          &:not(:last-of-type) {
            border-right: 1px solid $bordercl;
          }
          // 文字内容(两行)
          p {
            padding: 5px;
            // 数字样式
            span {
              font-size: 30px;
              font-weight: bold;
            }
          }
          .moneyOrange {
            color: rgb(255, 154, 0);
          }
          .discountRed {
            color: rgb(255, 93, 57);
          }
          .pointsGreen {
            color: rgb(107, 195, 8);
          }
        }
      }
    }
    .function {
      margin-bottom: 10px;
      // 功能容器
      div {
        @include bgc(white);
        display: flex;
        font-size: 16px;
        padding-left: 15px;
        vertical-align: middle;
        align-items: center;
        // 图标
        > span {
          font-size: 17px;
        }
        .icon-shop-bag {
          color: rgb(255, 121, 82);
        }
        .icon-vip {
          color: rgb(255, 199, 49);
        }
        .icon-server-center {
          color: rgb(74, 166, 247);
        }
        .elm {
            font-size: 17px;
            color: $maincl;
            padding-bottom: 2px;
            padding-right: 5px;
          }
        // 文字与箭头
        p {
          @include flexbw;
          border-bottom: 1px solid #efefef;
          padding: 12px 0;
          padding-right: 5px;
          margin-left: 10px;
          flex-grow: 1;
        }
        .noBorder {
          border: none;
        }
        &:nth-of-type(3) {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
