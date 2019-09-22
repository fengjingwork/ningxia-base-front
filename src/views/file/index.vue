<template>
  <div class="file channel">
    <el-crumbs :crumbData="crumbData" />

    <div class="channel-main">
      <div class="con-box">
        <div class="channel-con float-l">
          <div class="channel-screen channel-part">
            <keep-alive>
            <el-screen :filterShow="{year: true, level: true, system: true, theme: true, app: true, enterprise: true}" :init="{type: query.type, code: query.code}" @getFilterList="getFilterList" />
            </keep-alive>
          </div>

          <div class="channel-tab channel-part">
            <el-radio-group v-model="tableParam.hasAnalysis" @change="getHasAnalysis">
              <el-radio-button label="">政策原文</el-radio-button>
              <el-radio-button label="1">政策解读</el-radio-button>
            </el-radio-group>
          </div>

          <div class="channel-table channel-part">
            <el-table-list :tableData="tableListData" :crumbData="crumbData" />
            <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
          </div>
        </div>

        <div class="channel-side float-r">
          <div class="side-box">
            <el-side-set />
          </div>

          <div class="side-box">
            <el-side-list :listData="sideListData" :crumbData="crumbData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'file',
  data () {
    return {
      query: {},
      crumbData: [
        {
          channel: 'file',
          name: '政策文件',
          path: '/file'
        }
      ],
      sideListData: [
        /*{title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},*/
      ],
      tableListData: [
        /*{
          title: '【国家】国务院关于大力推进大众创业万众创新若干政策措施的',
          date: '2019-01-10',
          state: '生效中'
        },
        {
          title: '【国家】国务院关于大力推进大众创业万众创新若干政策措施的',
          date: '2019-01-10',
          state: '倒计时'
        },
        {
          title: '【国家】国务院关于大力推进大众创业万众创新若干政策措施的',
          date: '2019-01-10',
          state: '生效中'
        },
        {
          title: '【国家】国务院关于大力推进大众创业万众创新若干政策措施的',
          date: '2019-01-10',
          state: '即将生效'
        },
        {
          title: '【国家】国务院关于大力推进大众创业万众创新若干政策措施的',
          date: '2019-01-10',
          state: '已截止'
        }*/
      ],
      total: 0,
      currentPage: 1,
      tableParam: {
        policyType: 1,
        title: '',
        page: 1,
        rows: 10,
        hasAnalysis: ''
      },
    }
  },
  created() {
    //this.tableParam = {policyType: 1, page: this.currentPage, rows: 10};
    //this.crumbData = this.$store.state.crumbs;
    this.$store.dispatch('addData', {key: 'crumbs', storage: 'local', data: this.crumbData});
    this.query = this.$route.query;
    if(this.query.type) {
      this.tableParam[this.query.type] = this.query.code;
    }
    this.getFilterList();
  },
  methods: {
    getFilterList(data) {
      if(data){
        //let tableParam = {};
        // this.tableParam.year = data.year;
        // this.tableParam.SendingSystem = data.system;
        // this.tableParam.policyClassificationNew = data.level;
        // this.tableParam.policyTheme = data.theme;
        // this.tableParam.applicableRange = data.app;
        // this.tableParam.applicableEnterprise = data.enterprise;

        this.tableParam = Object.assign(this.tableParam, data);
        if(this.tableParam.policyClassificationNew == '') {
          this.tableParam.policyClassificationNew = 0;
        }
      }
      if(this.$route.query.title) {
        this.tableParam.title = encodeURI(this.$route.query.title);
      } else {
        this.tableParam.title = '';
      }
      this.getListData(this, this.tableParam);
      this.getRecommendList(this, this.tableParam);
    },
    getHasAnalysis(val) {
      this.tableParam.hasAnalysis = val;
      this.getListData(this, this.tableParam);
    },

    getListData(self, param){
      self.$axios({
        url: 'public/list',
        type: 'get',
        data: param,
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self.tableListData = res.data.items || [];
            self.total = res.data.total || 0;
          } else {
            self.tableListData = [];
            self.total = 0;
          }
        },
        error: function (err) {
          self.tableListData = [];
          self.total = 0;
        }
      })
    },
    getPageList(page) {
      this.currentPage = page == undefined ? 1 : page;
      this.tableParam.page = this.currentPage;
      this.getListData(this, this.tableParam);
    },
    getRecommendList(self, param){
      self.$axios({
        url: 'public/recommendList',
        type: 'get',
        data: param,
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self.sideListData = res.data.items || [];
          }
        },
        error: function (err) {
          self.sideListData = [];
        }
      })
    },
  }
}
</script>
