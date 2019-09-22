<template>
  <div class="release user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 登录日志</span>
    </div>

    <div class="user-tab" style="height:40px;">
      <div class="user-search" style="display:inline-block;float:none;">
        <el-input placeholder="请输入登录账号" v-model="search">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
        </el-input>
      </div>
      <el-button type="primary" @click="resetSearch" style="display:inline-block">重置</el-button>
      <div class="buttonBox" style="float:right;margin-top:-10px;">
        <el-button type="primary" @click="deletePicture">删除</el-button>
      </div>
    </div>

    <div class="user-table table">
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead" highlight-current-row  @current-change="handleCurrentChange">
        <el-table-column type="index" width="50" header-align="center" align="center" label="序号"></el-table-column>
        <el-table-column prop="visitIp" label="IP地址" width="210" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="userName" label="用户名称" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="loginName" label="登录账号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="result" label="登录结果" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="storageTimeStr" label="登录时间" width="" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
    </div>
    <!-- 删除弹窗-->
    <el-dialog title="删除" :visible.sync="deleteVisible" width="640px" @close="cancle">
      <div class="delete">您确定要删除该项吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="deleteThis">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Journal",
    data () {
      return {
        //弹窗
        deleteVisible:false,
        //表单信息
        problemDetail:{
          name:'',
          url:'',
          level:'',
          orderNo:'',
          type:'',
        },
        //当前选中的id
        currentId:'',
        //表格数据
        tableListData:[],
        //表格总数
        total: 0,
        currentPage: 1,
        //搜索value
        search:'',
      }
    },
    created() {
      this.getListData(this)
    },
    methods: {
      //搜索
      getFilterList(){
        this.getListData(this)
      },
      //关闭弹窗
      cancle(){
        this.deleteVisible = false
      },
      //删除弹窗
      deletePicture(){
        let self = this;
        if(self.currentId == ''){
          alert("请选择要删除的日志")
        }else{
          self.deleteVisible = true;
        }
      },
      //删除
      deleteThis(){
        let self = this;
        self.$axios({
          url: 'public/dataremove',
          type: 'get',
          data: {
            id:self.currentId
          },
          success: function () {
            self.deleteVisible = false;
            self.getListData(self)
          },
          error: function (err) {}
        })
      },
      //获取点击值
      handleCurrentChange(val){
        this.currentId = val.id;
      },
      //重置
      resetSearch() {
        this.search = '';
        this.getListData(this);
      },
      //获取列表
      getListData(self, page ,type) {
        self.currentPage = page == undefined ? 1 : page;
        self.$axios({
          url: 'public/datalist',
          type: 'get',
          data: {
            loginName: self.search,
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
      //获取分页
      getPageList(page) {
        this.getListData(this, page);
      }
    }
  }
</script>

<style scoped>
  .buttonBox{
    display:flex;
    flex-direction:row-reverse;
  }
  .buttonBox button{
    margin:10px 0 10px 10px!important;
  }
  .popupinput{
    display:inline-block;
    vertical-align:middle;
    width:480px
  }
  .delete{
    text-align:center;
    font-size:18px;
  }
</style>
