<template>
  <div class="release user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 网站问题汇总</span>
    </div>

    <div class="user-tab">
      <el-button type="primary" class="float-r" @click="resetSearch">重置</el-button>
      <div class="user-search">
        <el-input placeholder="请输入单号" v-model="search" class="">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
        </el-input>
      </div>
      <el-select v-model="questionValue" placeholder="请选择" @change="changeTable">
        <el-option
          v-for="item in questionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </div>

    <div class="user-table table">
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead">
        <el-table-column type="index" width="50" header-align="center" align="center" label="序号"></el-table-column>
        <el-table-column prop="questionTypeStr" label="问题类型" width="100" header-align="center" align="center" :show-overflow-tooltip="true">
          <!--<template slot-scope="scope">
            <router-link :to="{ path: artPath, query: {id: scope.row.id} }" target="_blank">{{scope.row.title}}</router-link>
          </template>-->
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="indentCode" label="单号" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="addTimeStr" label="提交时间" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="releaseDateStr" label="操作" width="" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="getDetail(scope.row)">详情</el-button>
            <el-button type="warning" size="mini" @click="updateState(scope.row)" style="background:#409eff;border-color:#409eff;">处理</el-button>
            <el-button type="primary" size="mini" @click="delData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
    </div>

    <!-- 弹窗-->
    <el-dialog title="问题详情" :visible.sync="dialogFormVisible" width="700px" @close="cancle">
      <el-form :model="problemDetail">
        <div class="detailpopup">
          <div style="width:50%;">
            <span>问题类型：</span>
            <el-input class="popupinput" :readonly="true" v-model="problemDetail.questionTypeStr"></el-input>
          </div>
          <div style="width:50%;">
            <span>昵称：</span>
            <el-input class="popupinput" :readonly="true" v-model="problemDetail.nickName"></el-input>
          </div>
        </div>
        <div class="detailpopup" >
          <div style="width:50%;">
            <span>手机号码：</span>
            <el-input class="popupinput" :readonly="true" v-model="problemDetail.phone"></el-input>
          </div>
          <div style="width:50%;">
            <span>邮箱：</span>
            <el-input class="popupinput" :readonly="true" v-model="problemDetail.mail"></el-input>
          </div>
        </div>
        <div style="margin-bottom:20px;">
          <span class='textareaspan'>内容描述：</span>
          <textarea class="textareapopup" readonly='true' placeholder="请输入内容" v-model="problemDetail.questionDesc"></textarea>
        </div>
        <div v-if="replayPopup">
          <span class='textareaspan'>回复：</span>
          <textarea class="textareapopup" placeholder="请输入内容" v-model="problemDetail.reply"></textarea>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="replayPopup">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Problem",
      data () {
        return {
          //回复
          replayPopup:false,
          //弹窗
          dialogFormVisible:false,
          //详情数据
          problemDetail:{
            questionTypeStr:'',
            nickName:'',
            phone:'',
            mail:'',
            questionDesc:'',
            reply:'',
            id:''
          },
          //表格数据
          tableListData:[],
          //表格总数
          total: 0,
          currentPage: 1,
          //搜索value
          search:'',
          //问题类型value
          questionValue:'',
          //问题类型option
          questionOptions:[],
          aaa:'',
        }
      },
      created() {
        this.getFilter(this);
        this.getListData(this);
      },
      methods: {
        cancle(){
          this.dialogFormVisible = false;
          this.replayPopup = false
        },
        getFilterList(){
          let self = this;
          self.getListData(self)
        },
        resetSearch() {
          this.search = '';
          this.aaa = '';
          this.questionValue = '';
          this.getListData(this);
        },
        changeTable(val){
          let self = this;
          self.aaa = val;
          self.getListData(self,1,val)
        },
        getFilter(){
          let self = this;
          self.$axios({
            url: 'problem/select',
            type: 'get',
            data: {
              typeCode:'questionType'
            },
            success: function (res) {
              let data = [];
              for (let i = 0; i <res.data.rows.length; i++) {
                let obj = {};
                obj.label = res.data.rows[i].detailName;
                obj.value = res.data.rows[i].detailCode;
                data.push(obj)
              }
              self.questionOptions = data || [];
            },
            error: function (err) {}
          })
        },
        getListData(self, page ,type) {
          self.currentPage = page == undefined ? 1 : page;
          let currentTyle = type == undefined ? '': type;
          self.$axios({
            url: 'problem/list',
            type: 'get',
            data: {
              questionType:currentTyle,
              indentCode: self.search,
              page: self.currentPage,
              rows: 10,
            },
            success: function (res) {
              self.tableListData = res.data.items || [];
              self.total = res.data.total || 0;
            },
            error: function (err) {
              self.tableListData = [];
              self.total = 0;
            }
          })
        },
        getPageList(page) {
          let type = this.aaa;
          this.getListData(this, page, type);
        },
        getDetail(row) {
          console.log(row.indentCode);
          this.dialogFormVisible = true;
          let self = this;
          self.$axios({
            url: 'problem/detail',
            type: 'post',
            data: {
              indentCode:row.indentCode,
            },
            success: function (res) {
              // console.log(res.data)
              self.problemDetail = res.data
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        updateState(row){
          this.dialogFormVisible = true;
          this.replayPopup = true;
          let self = this;
          self.$axios({
            url: 'problem/detail',
            type: 'post',
            data: {
              indentCode:row.indentCode,
            },
            success: function (res) {
              self.problemDetail = res.data
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        submit(){
          let self = this;
          self.$axios({
            url: 'problem/submit',
            type: 'post',
            data: {
              id:self.problemDetail.id,
              reply:self.problemDetail.reply
            },
            success: function (res) {
              self.dialogFormVisible = false;
              self.replayPopup = false;
            },
            error: function (err) {
              console.log(err)
            }
          })
        },
        delData(row){
          let self = this;
          self.$axios({
            url: 'problem/delete',
            type: 'get',
            data: {
              id:row.id,
            },
            success: function () {
              self.getListData(self)
            },
            error: function (err) {
              console.log(err)
            }
          })
        }
      }
    }
</script>

<style scoped>
  .user-tab{
    padding-bottom: 15px;
    border-bottom: 1px dotted #ccc;
  }
  .detailpopup{
    display:flex;
    justify-content:space-around;
    margin-bottom:20px;
  }
  .detailpopup>div>span{
    display:inline-block;
    width:80px;
    text-align:right;
  }
  .popupinput{
    display:inline-block;
    width:230px
  }
  .textareaspan{
    display:inline-block;
    vertical-align:top;
    width:80px;
    text-align:right;
    padding-top:3px;
  }
  .textareapopup{
    display:inline-block;
    width:560px;height:100px;
    box-sizing:border-box;
    padding:10px;
    resize:none;
    border-color:#C0C4CC;
    border-radius:4px;
  }
</style>
