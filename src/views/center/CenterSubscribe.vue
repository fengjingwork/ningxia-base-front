<template>
  <div class="center-subscribe user-box">
    <div class="user-box-title" style="height:36px;line-height:36px;">
      <span><i class="el-icon-menu"></i> 订阅政策</span>
      <el-button type="primary" size="medium" @click="$router.push({path: '/user/setSubscribe'})" style="float:right;">修改订阅设置</el-button>
    </div>

    <div class="user-screen">
      <el-screen :ifSubscribe="true" :filterShow="{year: false, level: true, system: true, theme: true, app: true, enterprise: true}" :init="{}" @getFilterList="getFilterList" :userInfo="userInfo" />
    </div>

    <div class="user-table">
      <el-table-list :tableData="tableListData" :crumbData="crumbData" />
      <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterSubscribe",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      crumbData: [
        {
          channel: 'file',
          name: '政策文件',
          path: '/file'
        }
      ],
      tableListData: [],
      total: 0,
      currentPage: 1,
      tableParam: {
        policyType: 1,
        page: 1,
        rows: 10,
        hasAnalysis: ''
      },
    }
  },
  created() {
    this.getFilterList();
  },
  methods: {
    getFilterList(data) {
      if(data){
        this.tableParam = Object.assign(this.tableParam, data);
        if(this.tableParam.policyClassificationNew == '') {
          this.tableParam.policyClassificationNew = 0;
        }
      }

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
  }
}
</script>
