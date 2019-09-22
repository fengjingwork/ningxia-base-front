<template>
  <div class="match">
    <el-crumbs :crumbData="crumbData" />

    <div class="match-main">
      <div class="con-box">
        <div class="match-form">
          <div class="match-form-tit">
            <div class="float-l"><i class="el-icon-d-arrow-right"></i>企业基本情况</div>
          </div>

          <div class="match-info">
            <table width="100%">
              <tr>
                <td class="th">企业名称</td>
                <td>{{tableParam.enterpriseName}}</td>
                <td class="th">所在地区</td>
                <td>{{tableParam.city}}</td>
              </tr>
              <tr>
                <td class="th">企业联系人</td>
                <td>{{tableParam.enterpriseContacts}}</td>
                <td class="th">联系电话</td>
                <td>{{tableParam.phoneNum}}</td>
              </tr>
              <tr>
                <td class="th">基本信息</td>
                <td colspan="3">{{tableParam.basicInformation}}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="match-form">
          <div class="match-form-tit">
            <div class="float-l"><i class="el-icon-d-arrow-right"></i>政策匹配结果</div>
          </div>

          <div class="match-list">
            <el-table-list :tableData="tableListData" :crumbData="crumbData" />
            <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchResult",
  data () {
    return {
      crumbData: [
        {
          channel: 'file',
          name: '政策匹配',
          path: '/match'
        },
        {
          channel: 'MatchResult',
          name: '政策匹配结果',
          path: '/match/result'
        },
      ],
      tableListData: [],
      total: 0,
      currentPage: 1,
      tableParam: {}
    }
  },
  created() {
    this.tableParam = JSON.parse(localStorage.getItem('match'));
    //this.$store.dispatch('addData', {key: 'crumbs', storage: 'local', data: this.crumbData});
    this.getListData(this);
  },
  methods: {
    getListData(self){
      self.$axios({
        url: 'match/list',
        type: 'get',
        data: {
          industry: self.tableParam.industry,
          applicableEnterprises: self.tableParam.applicableEnterprises
        },
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
      this.getListData(this);
    }
  }
}
</script>

