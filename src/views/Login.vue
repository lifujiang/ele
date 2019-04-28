<template>
  <div class="loginPage">
    <!-- 顶部 -->
    <header-default :title="'密码登录'"></header-default>
    <!-- 主体 -->
    <div class="main">
      <!-- 输入框 -->
      <van-cell-group>
        <!-- 用户名 -->
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <!-- 密码 -->
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <!-- 验证码 -->
        <van-field
          v-model="checking"
          center
          required
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :right-icon="imgsrc"
          @click-right-icon="refresh"
        >
        </van-field>
      </van-cell-group>
      <!-- 温馨提示 -->
      <p class="tips">温馨提示: 未注册过的账号, 登录时将自动注册</p>
      <p class="tips">注册过的用户可凭账号密码登录</p>
      <!-- 登录按钮 -->
      <div class="login_btn">
        <van-button size="large" type="primary" @click="login">登录</van-button>
      </div>
      <!-- 未输入值提示 -->
      <Notice :title="lack_word" :show="show" @hidden-notice="hiddenNotice"></Notice>
      <!-- 重置密码 -->
      <div class="repassword">
        <router-link to="/home" class="word">重置密码?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
import Notice from '../components/Notice'
export default {
  data () {
    return {
      // 用户名
      username: '',
      // 密码
      password: '',
      // 验证码
      checking: '',
      // 验证码图片
      imgsrc: '',
      // 是否显示错误提示, 该标识需传给子组件
      show: false,
      // 错误提示文字(统一传入子组件)
      lack_word: '',
      // 具体提示文字(赋值给 lack_word )
      lack_username: '请输入手机号/邮箱/用户名',
      lack_pw: '请输入密码',
      lack_check: '请输入验证码'
    }
  },
  created () {
    this.getCaptchas()
  },
  methods: {
    // 获取验证码
    getCaptchas () {
      this.axios.post('v1/captchas').then(res => {
        this.imgsrc = res.data.code
      })
    },
    // 刷新验证码
    refresh () {
      this.getCaptchas()
    },
    // 登录
    login () {
      // 缺少关键字
      var flag = this.lack_keyword()
      if (!flag) return
    },
    // 缺少关键字
    lack_keyword () {
      if (!this.username) {
        this.lack_word = this.lack_username
      } else if (!this.password) {
        this.lack_word = this.lack_pw
      } else if (!this.checking) {
        this.lack_word = this.lack_check 
      } else {
        return true
      }
      this.show = true
    },
    // 子组件自定义事件(通过改变 show(子组件受影响), 隐藏提示)
    hiddenNotice () {
      this.show = false
    }
  },
  components: {
    headerDefault,
    Notice
  }
}
</script>

<style lang="scss">
  .loginPage {
    @import '../static/styles/mixin.scss';
    .main {
      padding-top: 12px;
      // 验证码图标容器
      .van-field__right-icon {
        width: 100px;
        height: 30px;
        // 验证码图片
        .van-icon--image {
          width: 100%;
          height: 100%;
        }
      }
      // 温馨提示
      .tips {
        padding: 10px;
        font-size: 12px;
        color: red;
      }
      // 登录按钮
      .login_btn {
        padding: 0 13px;
      }
      // 重置密码
      .repassword {
        padding: 25px 13px;
        text-align: right;
        .word {
          font-size: 14px;
          color: $maincl;
        }
      }
    }
  }
</style>
