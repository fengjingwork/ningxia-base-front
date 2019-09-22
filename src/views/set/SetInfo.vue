<template>
  <div class="set-info user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 用户信息</span>
    </div>

    <div class="set-info-con">
      <div class="set-info-item set-info-head">
        <div class="top-pop-head float-l"><img :src="userInfo.userHead" width="60" height="60"></div>
        <div class="top-pop-info float-l">
          <div class="btn">{{userInfo.userName}}</div>
          <div class="type"><el-tag type="warning">{{userInfo.userTypeStr}}</el-tag></div>
        </div>
      </div>
      <div class="set-info-item">
        <span class="label">用户名：</span>
        <span class="value">{{userInfo.userName}}</span>
      </div>
      <!--<div class="set-info-item">
        <span class="label">企业名称：</span>
        <span class="value">{{userInfo.loginName}}</span>
      </div>-->
      <div class="set-info-item">
        <span class="label">手机号码：</span>
        <span class="value">{{userInfo.phone}}</span>
      </div>
      <div class="set-info-item">
        <span class="label">邮箱：</span>
        <span class="value">{{userInfo.mail}}</span>
      </div>

      <div class="tishi">
        <span>互联网账号存在被盗风险，建议您定更改密码以保护账号安全</span>
        <router-link :to="{path: '/user/setPassword'}">修改密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SetInfo",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  }
}
</script>
