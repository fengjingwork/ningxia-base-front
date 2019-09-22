<template>
  <div class="declare channel">
    <el-crumbs :crumbData="crumbData" />

    <div class="channel-main">
      <div class="con-box">
        <div class="channel-con float-l">
          <div class="channel-screen channel-part">
            <el-screen :filterShow="{year: false, level: true, system: true, theme: true, app: true, enterprise: true}" @getFilterList="getFilterList" />
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
    name: 'declare',
    data () {
      return {
        crumbData: [
          {
            channel: 'declare',
            name: '项目申报',
            path: '/declare'
          }
        ],
        sideListData: [],
        tableListData: [],
        total: 0,
        currentPage: 1,
        tableParam: {},
      }
    },
    created() {
      this.$store.dispatch('addData', {key: 'crumbs', storage: 'local', data: this.crumbData});
      this.tableParam = {policyType: 2, page: this.currentPage, rows: 10};
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

        if(this.$route.query.title) {
          this.tableParam.title = this.$route.query.title;
        } else {
          this.tableParam.title = '';
        }

        this.getListData(this, this.tableParam);
        this.getRecommendList(this, this.tableParam);
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
