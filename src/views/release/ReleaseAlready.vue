<template>
  <div class="release user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 已处理政策列表</span>
    </div>

    <div class="user-tab">
      <el-button type="primary" @click="resetSearch" class="float-r">重置</el-button>
      <div class="user-search">
        <el-input placeholder="请输入政策关键字进行查询" v-model="search" class="">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
        </el-input>
      </div>
      <el-radio-group v-model="policyType" @change="getPolicyType">
        <el-radio-button label="1">国家政策</el-radio-button>
        <el-radio-button label="2">宁夏政策</el-radio-button>
      </el-radio-group>
    </div>

    <div class="user-screen">
      <div class="screen">
        <div class="screen-box screen-border">
          <span class="screen-name">发布来源：</span>
          <el-radio-group v-model="source" size="small" @change="getFilterList" style="float: left; width: 750px;">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button :label="item.detailCode" v-for="item in sourceList" :key="item.detailCode">{{item.detailName}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="screen">
        <div class="screen-box screen-border">
          <span class="screen-name">搜索条件：</span>
          <el-radio-group v-model="dataStatus" size="small" @change="getFilterList" style="float: left; width: 750px;">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="10">隐藏</el-radio-button>
            <el-radio-button label="11">显示</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-screen :filterShow="{search: false, year: false, level: false, system: true, theme: true, app: true, enterprise: true}" :init="{}" @getFilterList="getFilterList" />
    </div>

    <div class="user-table table">
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead">
        <el-table-column type="index" width="50" header-align="center" align="center" label="序列"></el-table-column>
        <el-table-column prop="title" label="标题" width="" header-align="center" align="left" :show-overflow-tooltip="true">
          <!--<template slot-scope="scope">
            <router-link :to="{ path: artPath, query: {id: scope.row.id} }" target="_blank">{{scope.row.title}}</router-link>
          </template>-->
        </el-table-column>
        <el-table-column prop="releaseDateStr" label="发布日期" width="120" header-align="center" align="center"></el-table-column>
        <el-table-column prop="dataStatusStr" label="状态" width="60" header-align="center" align="center"></el-table-column>
        <el-table-column prop="releaseDateStr" label="操作" width="210" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="getDetail(scope.row)">处理</el-button>
            <el-button type="warning" size="mini" @click="updateState(scope.row)" v-if="scope.row.dataStatusStr == '隐藏'">显示</el-button>
            <el-button type="warning" size="mini" @click="updateState(scope.row)" v-else>隐藏</el-button>
            <el-button type="primary" size="mini" @click="delData(scope.row)">不处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ReleaseAlready",
  data () {
    return {
      crumbData: [
        {
          channel: 'file',
          name: '政策文件',
          path: '/file'
        }
      ],
      artPath: '/file/detail',
      search: '',
      policyType: 1,
      typeCode: 'websiteSource1',
      source: 0,
      dataStatus: '',
      SendingSystem: 0,
      policyTheme: 0,
      applicableRange: 0,
      applicableEnterprise: 0,

      sourceList: [],
      tableListData: [],
      total: 0,
      currentPage: 1,
    }
  },
  created() {
    this.getFilter(this);
    this.getListData(this);
  },
  methods: {
    getPolicyType(val) {
      if(val == 1){
        this.typeCode = 'websiteSource1';
      } else if(val == 2) {
        this.typeCode = 'websiteSource2';
      }
      this.source = 0;
      //this.artPath = '/' + type + '/detail';
      this.getFilter(this);
      this.getListData(this);
    },
    resetSearch() {
      this.search = '';
      this.getListData(this);
    },
    getFilter(self) {
      self.$axios({
        url: 'public/filter',
        type: 'get',
        data: {
          typeCode: self.typeCode
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.sourceList = res.data.items || [];
            self.source = 0;
          }
        },
        error: function (err) {}
      })
    },
    getFilterList(data) {
      if(data) {
        this.SendingSystem = data.SendingSystem || 0;
        this.policyTheme = data.policyTheme || 0;
        this.applicableRange = data.applicableRange || 0;
        this.applicableEnterprise = data.applicableEnterprise || 0;
      }
      this.getListData(this);
    },
    getListData(self, page) {
      self.currentPage = page == undefined ? 1 : page;
      self.$axios({
        url: 'release/listAlready',
        type: 'get',
        data: {
          policyClassificationNew: self.policyType,
          websiteSourceNew: self.source,
          dataStatus: self.dataStatus,
          SendingSystem: self.SendingSystem,
          policyTheme: self.policyTheme,
          applicableRange: self.applicableRange,
          applicableEnterprise: self.applicableEnterprise,
          title: self.search,
          page: self.currentPage,
          rows: 10,
        },
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
    delData(row) {
      let self = this;
      self.$axios({
        url: 'release/delete',
        type: 'get',
        data: {
          id: row.id,
        },
        success: function (res) {
          if(res.code == '2000') {
            self.getListData(self);
          }
        },
        error: function (err) {}
      })
    },
    updateState(row) {
      let self = this;
      let state;
      if(row.dataStatus == '10') {
        state = '11';
      } else if(row.dataStatus == '11') {
        state = '10';
      }
      self.$axios({
        url: 'release/state',
        type: 'post',
        data: {
          id: row.id,
          dataStatus: state
        },
        success: function (res) {
          if(res.code == '2000') {
            self.getListData(self);
          }
        },
        error: function (err) {}
      })
    },
    getPageList(page) {
      this.getListData(this, page);
    },

    getDetail(row) {
      let open = this.$router.resolve({path: '/user/releaseDetail', query: {id: row.id}});
      window.open(open.href, '_blank');
    }
  }
}
</script>
