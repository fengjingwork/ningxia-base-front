<template>
  <div class="center-subscribe user-box">
    <div class="user-tab">
      <div class="float-r">
        <el-button type="primary" size="medium" @click="delCollect" :disabled="idStr == ''">取消收藏</el-button>
      </div>
      <el-radio-group v-model="tableParam.policyType" @change="getPolicyType">
        <el-radio-button label="1">收藏政策文件</el-radio-button>
        <el-radio-button label="2">收藏项目申报</el-radio-button>
        <el-radio-button label="4">收藏政策解读</el-radio-button>
      </el-radio-group>
    </div>

    <div class="user-table table">
      <!--<el-table-list :tableData="tableListData" :crumbData="crumbData" />-->
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead" @select="checkIdStr" @select-all="checkIdStr">
        <el-table-column type="selection" width="50" header-align="center" align="center" label="全选" :key="Math.random()"></el-table-column>
        <el-table-column prop="title" label="标题" width="" header-align="center" align="left" :show-overflow-tooltip="true" :key="Math.random()">
          <template slot-scope="scope">
            <router-link :to="{ path: artPath, query: {id: scope.row.newsId, read: read, type: tableParam.policyType} }" target="_blank">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="releaseDateStr" label="发文日期" width="120" header-align="center" align="center" v-if="tableParam.policyType != 2" :key="Math.random()"></el-table-column>
        <el-table-column prop="" label="状态" width="180" header-align="center" align="center" v-if="tableParam.policyType == 2" :key="Math.random()">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.effectiveDay === '即将生效'" :disable-transitions="true">{{scope.row.effectiveDay}}</el-tag>
            <el-tag type="warning" v-if="scope.row.effectiveDay === '生效中'" :disable-transitions="true">{{scope.row.effectiveDay}}</el-tag>
            <el-tag type="info" v-if="scope.row.effectiveDay === '已截止'" :disable-transitions="true">{{scope.row.effectiveDay}}</el-tag>
            <el-tag type="danger" v-if="scope.row.effectiveDay.indexOf('倒计时') !== -1" :disable-transitions="true">{{scope.row.effectiveDay}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="releaseDateStr" label="收藏日期" width="120" header-align="center" align="center"></el-table-column>
      </el-table>

      <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "CenterCollect",
    props: {
      userInfo: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        artPath: '',
        read: '',
        tableListData: [],
        total: 0,
        currentPage: 1,
        tableParam: {
          policyType: 1,
          page: 1,
          rows: 10,
          userId: this.userInfo.id
        },
        idStr: ''
      }
    },
    created() {
      this.artPath = '/file/detail';
      this.getListData(this, this.tableParam);
    },
    methods: {
      getPolicyType(val) {
        console.log();
        this.idStr = '';
        let type;
        if(val == '1') {
          type = 'file';
          this.read = '';
        } else if(val == '2') {
          type = 'declare';
          this.read = '';
        } else if(val == '4') {
          type = 'read';
          this.read = '1';
        }
        this.artPath = '/' + type + '/detail';
        this.getListData(this, this.tableParam);
      },
      getListData(self, param){
        self.$axios({
          url: 'collect/list',
          type: 'get',
          data: param,
          success: function (res) {
            if(res.code == '2000' && res.data.items.length != 0) {
              self.tableListData = res.data.items || [];
              self.total = res.data.total || 0;
              self.idStr = '';
            } else {
              self.tableListData = [];
              self.total = 0;
              self.idStr = '';
            }
          },
          error: function (err) {
            self.tableListData = [];
            self.total = 0;
            self.idStr = '';
          }
        })
      },
      getPageList(page) {
        this.currentPage = page == undefined ? 1 : page;
        this.tableParam.page = this.currentPage;
        this.getListData(this, this.tableParam);
      },

      checkIdStr(selection) {
        let self = this;
        let idStr = [];
        for(let i = 0; i<selection.length; i++) {
          idStr.push(selection[i].id);
        }
        self.idStr = idStr.toString();
      },

      delCollect() {
        let self = this;
        self.$axios({
          url: 'collect/listDelete',
          type: 'post',
          data: {
            idstr: self.idStr,
            userId: self.userInfo.id
          },
          success: function (res) {
            if(res.code == '2000') {
              self.getListData(self, self.tableParam);
            }
          },
          error: function (err) {}
        })
      }
    }
  }
</script>
