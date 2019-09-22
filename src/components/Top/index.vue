<template>
  <div class="top">
    <div class="con-box">
      <div class="top-info float-l">
        <router-link :to="{path: '/login'}" v-if="!userInfo.userShow" class="logout"><img src="@/assets/images/top-user.png"></router-link>
        <!--<span @click="" v-if="userInfo.userShow"><img src="@/assets/images/top-user.png"></span>-->
        <el-popover
          placement="bottom-start"
          width="190"
          trigger="hover"
          v-model="visible">
          <div class="top-pop">
            <div class="top-pop-head float-l"><img :src="userInfo.userHead" width="60" height="60"></div>
            <div class="top-pop-info float-r">
              <div class="type"><el-tag type="warning">{{userInfo.userTypeStr}}</el-tag></div>
              <div class="btn">
                <router-link :to="{path: '/user'}">用户管理</router-link> | <span @click="logout">退出</span>
              </div>
            </div>
          </div>
          <span slot="reference" v-if="userInfo.userShow"><img src="@/assets/images/top-user.png"></span>
        </el-popover>
        <span>欢迎来到宁夏自治区中小企业政策信息发布平台</span>
      </div>
      <div class="top-date float-r">
        <span>{{date}}</span>
        <span>{{week}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/top.scss'
export default {
  name: "el-top",
  inject: ['reload'],
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      date: '',
      week: ''
    }
  },
  created () {
    this.getDate(this);
  },
  methods: {
    logout() {
      localStorage.removeItem('userInfo');
      localStorage.clear();
      this.$router.push({path: '/'});
      this.reload();
    },
    getDate() {
      let weekArr = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let week = weekArr[date.getDay()];
      this.date = year + '年' + month + '月' + day +'日';
      this.week = week;
    }
  }
}
</script>

