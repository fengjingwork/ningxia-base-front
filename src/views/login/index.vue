<template>
  <div class="login">
    <a href="http://qyxy.smenx.gov.cn" target="_blank" class="gov-login">政府登录入口</a>
    <div class="login-main">
      <div class="login-box">
        <div class="login-box-title">登录</div>
        <div class="login-box-form">
          <el-form :model="loginForm" ref="loginForm">
            <el-form-item prop="loginName">
              <i class="icon"><img src="@/assets/images/login-name.png"></i>
              <el-input v-model="loginForm.loginName" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <i class="icon"><img src="@/assets/images/login-password.png"></i>
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="16">
                <i class="icon"><img src="@/assets/images/login-code.png"></i>
                <el-input v-model="loginForm.code" placeholder="请输入验证码" clearable></el-input>
              </el-col>
              <el-col :span="8" align="right">
                <img v-bind:src="codeImg" alt="" class="codeImg" @click="getCode">
              </el-col>
            </el-form-item>
            <div class="login-msg">{{msgText}}</div>
          </el-form>
        </div>
        <div class="login-box-btn">
          <div class="btn" @click="loginSubmit">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'login',
    data() {
      return {
        //bgImg: '',
        codeImg:'/api/web_verifyCodeController/web_getImage.form',
        msgText: '',
        loginForm: {
          loginName: '',
          password: '',
          code: '',
        },
        ExpData: {
          loginName: '用户名',
          password: '用户密码',
          code: '验证码'
        }
      }
    },
    created() {
      this.getCode(this);
    },
    methods: {
      getCode(){//获取验证码图片流
        this.codeImg = '/api/web_verifyCodeFrontController/web_getImage.form' + "?=" + Math.random();
      },
      /*getCode() {
        let str = Math.random();
        str = str.toString();
        str = str.slice(2);
        this.bgImg = new Image();
        this.bgImg.src = '/api/web_verifyCodeFrontController/web_getImage.form?' + str;
        this.bgImg = this.bgImg.src;
      },*/

      //验证验证码
      loginSubmit() {
        let self = this;
        self.msgText = '';
        self.$axios({
          url: 'public/validate',
          type: 'post',
          data: {
            code: self.loginForm.code,
          },
          success: function (res) {
            if(res.code == '2000'){
              self.verifyLogin(self); //验证码通过后再调用用户名登录请求并验证
            } else {
              self.msgText = res.msg;
              self.getCode();
            }
          },
          error: function (err) {
            self.msgText = err;
            self.getCode();
          }
        })
      },
      //通过验证后用户登录请求
      verifyLogin(self){
        self.msgText = '';
        self.$axios({
          url: 'public/login',
          type: 'post',
          data: {
            loginName: self.loginForm.loginName,
            password: self.loginForm.password
          },
          success: function (res) {
            if(res.code == '2000') {
              self.msgText = res.msg;
              if(res.data){
                //self.$store.dispatch('addData', {key: 'userInfo', storage: 'local', data: res.data});
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                self.$router.push({path: '/'});
              }
            } else {
              self.msgText = res.msg;
              self.getCode();
            }
          },
          error: function (err) {
            self.msgText = err;
            self.getCode();
          }
        })
      },

      /*getEnter(e) {
        if (e.keyCode == 13) {
          this.expCode();
        }
      },*/
    }
  }
</script>
