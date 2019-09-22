<template>
  <div class="container">
    <el-top :userInfo="userInfo" />
    <el-header @getRefresh="refreshView" :userInfo="userInfo" :ifUserShow="ifUserShow" />
    <el-nav :ifUserShow="ifUserShow" />
    <div class="main">
      <router-view :key="refresh" :userInfo="userInfo"/>
    </div>
    <el-footer />
  </div>
</template>

<script>
import crumbInfo from '@/router/info'
export default {
  name: 'container',
  data () {
    return {
      userInfo: {},
      navList: [
        {
          name: '首页',
          type: 'index',
          path: '/index',
          num: 0
        },
        {
          name: '政策文件',
          type: 'file',
          path: '/file',
          num: 1
        },
        {
          name: '项目申报',
          type: 'declare',
          path: '/declare',
          num: 2
        },
        {
          name: '政策解读',
          type: 'read',
          path: '/read',
          num: 3
        },
        {
          name: '政策图谱',
          type: 'maps',
          path: '/maps',
          num: 4
        }
      ],
      refresh: '',
      ifUserShow: true
    }
  },
  created () {
    this.getHeader(this);
    if(localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.getUserInfo(this);
    } else {
      this.userInfo.userHead = require('@/assets/images/user-head.png');
    }
    this.$store.dispatch('addData', {key: 'nav', storage: 'local', data: this.navList});
    this.getCrumbs();
  },
  methods: {
    getUserInfo(self) {
      self.userInfo.userShow = true;
      if(self.userInfo.img) {
        self.userInfo.userHead = 'data:image/jpeg;base64,' + self.userInfo.img;
      } else {
        self.userInfo.userHead = require('@/assets/images/user-head.png');
      }

      if(self.userInfo.userType == '1') {
        self.userInfo.userTypeStr = '企业用户';
        self.userInfo.userTypePath = '/user';
      } else if(self.userInfo.userType == '2') {
        self.userInfo.userTypeStr = '监管机构';
        self.userInfo.userTypePath = '/user';
      } else if(self.userInfo.userType == '3') {
        self.userInfo.userTypeStr = '管理员';
        self.userInfo.userTypePath = '/user';
      }
    },
    getNav() {
      let path = this.$route.path;
      path = path.split('/');
      let lists = this.$store.state.nav, arr = [];
      path.forEach((key) => {
        if (key != ('' && null && undefined) && lists[key]) {
          lists = lists[key];
          arr.push(lists)
        }
      });
      //this.$store.dispatch('addData', {key: 'headTitle', data: arr});
    },
    getCrumbs() {
      let path = this.$route.path;
      path = path.split('/');
      let lists = crumbInfo, arr = [];
      path.forEach((key) => {
        if (key != ('' && null && undefined) && lists[key]) {
          lists = lists[key];
          arr.push(lists)
        }
      });

      this.$store.dispatch('addData', {key: 'crumbs', data: arr});
    },
    refreshView() {
      this.refresh = Math.random();
    },
    getHeader() {
      let path = this.$route.path.indexOf('user');
      if(path === -1) {
        this.ifUserShow = true;
      } else {
        this.ifUserShow = false;
      }
    },
  },
  watch: {
    $route() {
      this.getHeader(this);
      //this.getNav();
    }
  }
}
</script>
