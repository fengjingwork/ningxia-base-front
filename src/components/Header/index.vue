<template>
  <header>
    <!--<el-top :userInfo="userInfo" />-->

    <div class="header" v-if="ifUserShow">
      <div class="con-box">
        <div class="header-search">
          <el-radio-group v-model="policyType" @change="getPolicyType">
            <el-radio-button :label="'file'">政策文件</el-radio-button>
            <el-radio-button :label="'declare'">项目申报</el-radio-button>
            <el-radio-button :label="'read'">政策解读</el-radio-button>
          </el-radio-group>
          <div class="header-search-input">
            <el-input v-model="searchTitle" class="" placeholder="请输入政策关键字进行查询" clearable @clear="clear">
              <el-button slot="append" icon="el-icon-search" type="primary" @click="search"></el-button>
            </el-input>
          </div>
          <!--<el-tabs type="border-card">
            <el-tab-pane label="政策文件"></el-tab-pane>
            <el-tab-pane label="申报通知"></el-tab-pane>
            <el-tab-pane label="政策解读"></el-tab-pane>
          </el-tabs>-->
        </div>
      </div>
    </div>

    <div class="header-user" v-if="!ifUserShow">
      <div class="con-box">
        <div class="header-user-logo float-l">
          <div class="logo-box"></div>
          <div class="logo-txt">
            <h1>宁夏中小企业政策信息发布平台</h1>
            <h2>zcxx.smenx.com.cn</h2>
          </div>
        </div>
        <div class="header-user-btn float-r">
          <span @click="$router.push({path: '/'})" title="回到首页">
            <img src="@/assets/images/icon-home.png" width="50" height="50"/>
          </span> |
          <span @click="logout" title="退出">
            <img src="@/assets/images/icon-quit.png" width="45" height="45"/>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import '@/assets/style/header.scss'
export default {
  name: 'el-header',
  inject: ['reload'],
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    ifUserShow: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      policyType: 'file',
      searchTitle: '',
      //ifUserShow: true
    }
  },
  methods: {
    getPolicyType(val) {
      this.searchTitle = '';
    },
    search() {
      if(this.searchTitle != '') {
        //this.$router.push({name: this.policyType, params: {title: this.searchTitle}});
        this.$router.push({path: '/' + this.policyType, query: {title: this.searchTitle}});
        this.$emit('getRefresh');
      }
    },
    clear() {
      if(this.$route.name == this.policyType) {
        this.$router.push({path: '/' + this.policyType});
        this.$emit('getRefresh');
      }
    },
    getHeader() {
      let path = this.$route.path.indexOf('user');

      if(path === -1) {
        this.ifUserShow = true;
      } else {
        this.ifUserShow = false;
      }
    },
    logout() {
      localStorage.removeItem('userInfo');
      localStorage.clear();
      this.$router.push({path: '/'});
      this.reload();
    },
  },
  watch: {
    $route() {
      this.getHeader(this);
    }
  }
}
</script>
