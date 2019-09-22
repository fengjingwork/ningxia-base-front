<template>
  <div class="release user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 字典类型</span>
    </div>

    <div class="user-tab" style="border-bottom: 1px dotted #ccc;">
      <el-button type="primary" class="float-r" @click="resetSearch">重置</el-button>
      <div class="user-search">
        <el-input placeholder="请输入字典类型" v-model="search" class="">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
        </el-input>
      </div>
      <div class="screen-box screen-border" style="height:40px;width:400px;line-height:40px;border:none;">
        <span style="float:left;">状态：</span>
        <el-radio-group v-model="source" size="small" @change="getFilterList1" style="float: left;">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button :label="item.detailCode" v-for="item in sourceList" :key="item.detailCode">{{item.detailName}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="user-table table">
      <div class="buttonBox">
        <el-button type="primary" @click="deletePicture">删除</el-button>
        <el-button type="primary" style="background:#409eff;border-color:#409eff;" @click="editPicture">修改</el-button>
        <el-button type="success" @click="addPicture">新增</el-button>
      </div>
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead" highlight-current-row  @current-change="handleCurrentChange">
        <el-table-column type="index" width="50" header-align="center" align="center" label="序号"></el-table-column>
        <el-table-column prop="typeName" label="字典类型" width="210" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="typeCode" label="类型编号" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="排序" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="dataStatusStr" label="数据状态" header-align="center" align="center"></el-table-column>
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
    <!-- 新增/修改弹窗-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="640px" @close="cancle">
      <el-form :model="problemDetail" label-position="right" label-width="110px">
        <el-form-item label="字典类型：" >
          <el-input class="popupinput" v-model="problemDetail.typeName" placeholder="请输入字典类型"></el-input>
        </el-form-item>
        <el-form-item label="类型编号：">
          <el-input class="popupinput" v-model="problemDetail.typeCode" placeholder="请输入类型编号"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input class="popupinput" v-model="problemDetail.orderNo" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="数据状态：">
          <el-select v-model="problemDetail.dataStatusStr" placeholder="请选择">
            <el-option
              v-for="item in pictureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="popupType == 0">保 存</el-button>
        <el-button type="primary" @click="update" v-if="popupType == 1">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AdminType",
    data () {
      return {
        title:'',
        //新增或者修改
        popupType:'',
        //弹窗
        dialogFormVisible:false,
        deleteVisible:false,
        //表单信息
        problemDetail:{
          typeName:'',
          typeCode:'',
          orderNo:'',
          type:'',
          dataStatusStr:''
        },
        copyproblemDetail:{
          typeName:'',
          typeCode:'',
          orderNo:'',
          type:'',
          dataStatusStr:''
        },
        source: 0,
        sourceList: [],
        //当前选中的id
        currentId:'',
        //链接value
        pictureValue:'',
        //链接option
        pictureOptions:[],
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
      this.getFilter(this);
      this.getListData(this)
    },
    methods: {
      getFilterList1(data) {
        let self = this;
        if(data) {
          if(data == '0'){
            data = ''
            self.getListData(self,1,data)
          }else{
            self.getListData(self,1,data)
          }
        }
      },
      //搜索
      getFilterList(){
        this.getListData(this)
      },
      //关闭弹窗
      cancle(){
        this.dialogFormVisible = false;
        this.deleteVisible = false
      },
      //保存
      submit(){
        let self = this;
        if(self.problemDetail.typeName == ''){
          alert('请输入字典类型');
          return;
        }
        if(self.problemDetail.typeCode == ''){
          alert('请输入类型编号');
          return;
        }
        if(self.problemDetail.orderNo == ''){
          alert('请输入顺序');
          return;
        }
        if(self.problemDetail.dataStatusStr == ''){
          alert('请选择数据状态');
          return;
        }else{
          self.$axios({
            url: 'public/zidianadd',
            type: 'post',
            data: {
              typeName:self.problemDetail.typeName,
              typeCode:self.problemDetail.typeCode,
              orderNo:self.problemDetail.orderNo,
              dataStatus:self.problemDetail.dataStatusStr
            },
            success: function (res) {
              self.dialogFormVisible = false;
              self.getListData(self)
            },
            error: function (err) {
              this.dialogFormVisible = false
            }
          })
        }
      },
      //修改信息
      update(){
        let self = this;
        if(self.problemDetail.typeName == ''){
          alert('请输入字典类型');
          return;
        }
        if(self.problemDetail.typeCode == ''){
          alert('请输入类型编号');
          return;
        }
        if(self.problemDetail.orderNo == ''){
          alert('请输入顺序');
          return;
        } else {
          self.$axios({
            url: 'public/zidianupdate',
            type: 'post',
            data: {
              typeName: self.problemDetail.typeName,
              typeCode: self.problemDetail.typeCode,
              orderNo: self.problemDetail.orderNo,
              dataStatus: self.problemDetail.dataStatusStr,
              id: self.currentId
            },
            success: function () {
              self.dialogFormVisible = false;
              self.getListData(self)
            },
            error: function (err) {
              this.dialogFormVisible = false
            }
          })
        }
      },
      //打开新增弹窗
      addPicture(){
        let self = this;
        self.title = '新增代码类型';
        self.problemDetail.typeName = '';
        self.problemDetail.typeCode = '';
        self.problemDetail.orderNo = '';
        self.problemDetail.dataStatusStr = '';
        self.dialogFormVisible = true;
        self.popupType = '0';
      },
      //修改弹窗
      editPicture(){
        let self = this;
        if(self.currentId == ''){
          alert("请选择要修改的字典类型")
        }else{
          self.title = '修改代码类型';
          self.problemDetail.typeName = self.copyproblemDetail.typeName;
          self.problemDetail.typeCode = self.copyproblemDetail.typeCode;
          self.problemDetail.orderNo = self.copyproblemDetail.orderNo;
          self.problemDetail.dataStatusStr = self.copyproblemDetail.dataStatusStr;
          self.popupType = '1';
          self.dialogFormVisible = true
        }
      },
      //删除弹窗
      deletePicture(){
        let self = this;
        if(self.currentId == ''){
          alert("请选择要删除的字典类型")
        }else{
          self.deleteVisible = true;
        }
      },
      //删除
      deleteThis(){
        let self = this;
        self.$axios({
          url: 'public/zidiandelete',
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
        this.problemDetail.typeName = val.typeName;
        this.problemDetail.typeCode = val.typeCode;
        this.problemDetail.orderNo = val.orderNo;
        this.problemDetail.dataStatusStr = val.dataStatus;

        this.copyproblemDetail.typeName = val.typeName;
        this.copyproblemDetail.typeCode = val.typeCode;
        this.copyproblemDetail.orderNo = val.orderNo;
        this.copyproblemDetail.dataStatusStr = val.dataStatus;
      },
      //重置
      resetSearch() {
        this.search = '';
        this.source = 0;
        this.getListData(this);
      },
      //获取列表
      getListData(self, page ,type) {
        self.currentPage = page == undefined ? 1 : page;
        let currentTyle = type == undefined ? '': type;
        self.$axios({
          url: 'public/zidianlist',
          type: 'get',
          data: {
            dataStatus:currentTyle,
            typeName: self.search,
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
      },
      //获取启用类型
      getFilter(self) {
        self.$axios({
          url: 'problem/select',
          type: 'get',
          data: {
            typeCode:'dataStatus'
          },
          success: function (res) {
            self.sourceList = res.data.rows || [];
            self.source = 0;
            let data = [];
            for (let i = 0; i <res.data.rows.length; i++) {
              let obj = {};
              obj.label = res.data.rows[i].detailName;
              obj.value = res.data.rows[i].detailCode;
              data.push(obj)
            }
            self.pictureOptions = data || [];
          },
          error: function (err) {}
        })
      },
    }
  }
</script>

<style scoped>
  .buttonBox{
    display:flex;
    flex-direction:row-reverse
  }
  .buttonBox button{
    margin:10px 0 10px 10px!important;
  }
  .popupinput{
    display:inline-block;
    vertical-align:middle;
    width:480px
  }
  .preivew{
    position:relative;
    width:600px;height:330px;
  }
  .preivew>img{
    max-width:600px;max-height:330px;
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    margin:auto;
  }
  .delete{
    text-align:center;
    font-size:18px;
  }
</style>
