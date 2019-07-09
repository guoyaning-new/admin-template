<template>
  <div class="login-container">
    <div :class="['relative','detail-con','relative',isResize?'is-resize':'']">
      <img :src="bannerImgSrc" class="bg-img v-bottom">
      <el-form class="login-form absolute" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <h3 class="title">后台管理系统</h3>
        <el-form-item prop="username" class="el-form-item-content">
          <span class="svg-container svg-container_login">
             <i class="el-icon-user fs20"></i>
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入手机号/工号/用户名" />
        </el-form-item>
        <el-form-item prop="password" class="el-form-item-content">
          <span class="svg-container">
            <i class="el-icon-lock fs20" ></i>
          </span>
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
            placeholder="请输入密码"></el-input>
            <span class="show-pwd" @click="showPwd">
                <i class="el-icon-view fs20" ></i>
            </span>
        </el-form-item>
        <el-form-item prop="verifyCode" class="el-form-item-content bg-none item-img-code">
          <div>
          <el-input name="verifyCode" type="text" v-model="loginForm.verifyCode" placeholder="请输右侧验证码" class="bg-white" @keyup.enter.native="handleLogin"/>
          <img :src="imgCodeSrc" class="img-code ml20 pointer v-bottom" @click="getImgCode" >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;height:40px" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>   
      <div class="copyright absolute white text-center fs16">
        <p>杭州小善科技</p>
      </div>
  </div>
</div>
</template>

<script>


export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        verifyCode: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        verifyCode: [
          { required: true, trigger: "blur", message: "请输入右侧验证码" }
        ]
      },
      loading: false,
      pwdType: "password",
      showLogo: false,
      imgCodeSrc: "api/sys/kaptcha", //图片验证码
      isResize: false
    };
  },
  mounted() {
    this.windowResize();
    
  },
  methods: {
    //图片验证码
    getImgCode() {
      this.imgCodeSrc = "api/sys/kaptcha?" + Math.random();
    },
    //密码 名暗文切换
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    //去登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //屏幕自适应
    windowResize() {
      window.onresize = () => {
        const minH = 710;
        this.isResize =
          document.documentElement.offsetHeight < minH ? true : false;
      };
      window.onresize(); //页面刷新自适应
    }
  },
  computed: {
    //获取随机图片
    bannerImgSrc() {
      let index = Math.floor(Math.random() * 5) + 1;
      return require("@/assets/images/banners/0" + index + ".jpg");
    }
  }
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 22px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    top: 0;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 150px auto;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  .svg-container {
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-form-item-content {
    border-radius: 4px;
    background: #fff;
  }
  .copyright {
    width: 100%;
    bottom: 40px;
  }
  .img-code {
    width: 120px;
    height: 47px;
  }
  .user-name {
    border-radius: 4px;
  }
  .item-img-code {
    border: none;
    .el-input {
      width: 55%;
    }
  }
  .logo-img {
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 520px;
  }
  .bg-img {
    width: 100%;
    height: 100%;
    z-index: -99;
  }
  .detail-con {
    height: 100%;
  }
  .is-resize {
    height: 710px;
  }
}
</style>
