<template>
  <div class="release user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 首页图片</span>
    </div>

    <div class="user-tab">
      <el-button type="primary" class="float-r" @click="resetSearch">重置</el-button>
      <div class="user-search">
        <el-input placeholder="请输入图片标题" v-model="search" class="">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
        </el-input>
      </div>
      <span>类型:</span>
      <el-select v-model="problemDetail.type" placeholder="请选择" @change="changeTable">
        <el-option
          v-for="item in pictureOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="user-table table">
      <div class="buttonBox">
        <el-button type="primary" @click="deletePicture">删除</el-button>
        <el-button type="primary" style="background:#409eff;border-color:#409eff;" @click="editPicture">修改</el-button>
        <el-button type="success" @click="addPicture">新增</el-button>
        <el-button type="info" @click="previewPicture">预览</el-button>
      </div>
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead" highlight-current-row  @current-change="handleCurrentChange">
        <el-table-column type="index" width="50" header-align="center" align="center" label="序号"></el-table-column>
        <el-table-column prop="title" label="图片标题" width="210" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="picName" label="图片名称" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="picTypeStr" label="类型" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="顺序" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="storageTimeStr" label="创建时间" width="" header-align="center" align="center"></el-table-column>
      </el-table>
      <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
    </div>
    <!-- 预览弹窗-->
    <el-dialog title="预览图片" :visible.sync="previewVisible" width="640px" @close="cancle">
      <div class="preivew">
        <img :src="problemDetail.annexUrl">
      </div>
    </el-dialog>
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
      <el-form :model="problemDetail" label-position="right" label-width="100px">
        <el-form-item label="图片标题：">
          <el-input class="popupinput" v-model="problemDetail.title" placeholder="请输入图片标题"></el-input>
        </el-form-item>
        <el-form-item label="顺序：">
            <el-input class="popupinput" v-model="problemDetail.orderNo" placeholder="请输入顺序"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="pictureValue" placeholder="请选择" @change="changeTable">
            <el-option
              v-for="item in pictureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型：">
          <el-select v-model="dataValue" placeholder="请选择" @change="changeTable">
            <el-option
              v-for="item in dataOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片文件：">
          <input type="file" v-on:change="getappendix" style="position: relative;top:8px; width:230px;overflow: hidden;float: left;"/>
          <el-button @click="updatefiles" type="primary" style="float: left;">上 传</el-button>
          <span style="float: left;margin-top:10px;">
<!--                <span style="float: left;padding:0 10px;">已上传文件</span>-->
                <span :title="problemDetail.annexName+'.'+problemDetail.annexSuffix" style="display:inline-block;width:450px;height:38px;border:1px solid #67c23a;padding:0 20px 0 10px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                  <span style="color:#ccc;" v-if="!problemDetail.annexName">暂未上传文件！</span>
                  {{problemDetail.annexName}}
                  <span v-if="problemDetail.annexName">.</span>
                  {{problemDetail.annexSuffix}}
                </span>
              </span>
          <el-button type="primary" @click="clearupdata" style="margin-left:50px;">清空</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="popupType =='0'">保 存</el-button>
        <el-button type="primary" @click="update" v-if="popupType == '1'">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "Picture",
      data () {
        return {
          title:'',
          //新增或者修改
          popupType:'',
          //弹窗
          dialogFormVisible:false,
          previewVisible:false,
          deleteVisible:false,
          //表单信息
          problemDetail:{
            title:'',
            orderNo:'',
            type:'',
            annexName:'',
            annexSuffix:'',
            annexUrl:''
          },
          copyproblemDetail:{
            title:'',
            orderNo:'',
            type:'',
            annexName:'',
            annexSuffix:'',
            annexUrl:''
          },
          //数据类型value
          dataValue:'',
          copydataValue:'',
          //数据类型option
          dataOption:[],
          //文件信息
          getfile:{
            file:'',
            image_url:'',
          },
          //当前选中的id
          currentId:'',
          //图片value
          pictureValue:'',
          copypictureValue:'',
          //图片option
          pictureOptions:[],
          //表格数据
          tableListData:[],
          //表格总数
          total: 0,
          currentPage: 1,
          //搜索value
          search:'',
          aaa:'',
        }
      },
      created() {
        this.getFilter(this)
        this.getListData(this)
        this.getDater(this)
      },
      methods: {
        //搜索
        getFilterList(){
          this.getListData(this)
        },
        //关闭弹窗
        cancle(){
          this.dialogFormVisible = false;
          this.previewVisible = false;
          this.deleteVisible = false
        },
        //保存
        submit(){
          let self = this;
          if(self.problemDetail.title == ''){
            alert("请输入图片标题")
            return;
          }
          if(self.problemDetail.orderNo == ''){
            alert("请输入顺序")
            return;
          }
          if(self.pictureValue == ''){
            alert("请选择类型")
            return;
          }
          if(self.dataValue == ''){
            alert("请选择数据类型")
            return;
          }
          if(self.problemDetail.annexName == ''){
            alert("请上传图片文件")
            return;
          }else {
            self.$axios({
              url: 'syscon/add',
              type: 'post',
              data: {
                title: self.problemDetail.title,
                orderNo: self.problemDetail.orderNo,
                picType: self.pictureValue,
                picName: self.problemDetail.annexName,
                picSuffix: self.problemDetail.annexSuffix,
                picture: self.problemDetail.annexUrl,
                dataStatus: self.dataValue
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
          if(self.problemDetail.title == ''){
            alert("请输入图片标题")
            return;
          }
          if(self.problemDetail.orderNo == ''){
            alert("请输入顺序")
            return;
          }
          if(self.pictureValue == ''){
            alert("请选择类型")
            return;
          }
          if(self.dataValue == ''){
            alert("请选择数据类型")
            return;
          }
          if(self.problemDetail.annexName == ''){
            alert("请上传图片文件")
            return;
          }else{
            self.$axios({
              url: 'syscon/update',
              type: 'post',
              data: {
                title:self.problemDetail.title,
                orderNo:self.problemDetail.orderNo,
                picType:self.pictureValue,
                picName:self.problemDetail.annexName,
                picSuffix:self.problemDetail.annexSuffix,
                picture:self.problemDetail.annexUrl,
                dataStatus:self.dataValue,
                id:self.currentId
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
        // 获取本地的文件
        getappendix(data){
          this.getfile.file = data.target.files[0];
        },
        // 清除上传的附件
        clearupdata(){
          this.problemDetail.annexName=''; //附件名称
          this.problemDetail.annexSuffix=''; //附件后缀
          this.problemDetail.annexUrl=''; //附件后缀
        },
        //上传文件
        updatefiles(){
          let self = this;
          console.log(self.getfile)
          if (!self.getfile.file){
            return
          }
          self.$axios({
            url: 'syscon/upload',
            type: 'post',
            data: {
              file:self.getfile.file,
              image_url:self.getfile.image_url,
            },
            success: function (res) {
              if(res.code == '2000') {
                self.$message({
                  message: '上传成功！',
                  type: 'success'
                });
                self.problemDetail.annexName=res.data.fileName; //附件名称
                self.problemDetail.annexSuffix=res.data.fileExt; //附件后缀
                self.problemDetail.annexUrl=res.data.fileUrl; //附件URL
              }
            },
            error: function (err) {}
          })
        },
        // 预览弹窗
        previewPicture(){
          let self = this;
          if(self.currentId == ''){
            alert("请选择要预览的图片")
          }else{
            self.previewVisible = true;
          }
        },
        //打开新增弹窗
        addPicture(){
          let self = this;
          self.title = "新增图片";
          self.problemDetail.title = '';
          self.problemDetail.orderNo = '';
          self.pictureValue = '';
          self.problemDetail.annexName = '';
          self.problemDetail.annexSuffix = '';
          self.dataValue = '';
          self.problemDetail.annexUrl = '';
          self.popupType = '0';
          self.dialogFormVisible = true
        },
        //修改弹窗
        editPicture(){
          let self = this;
          if(self.currentId == ''){
            alert("请选择要修改的图片")
          }else{
            self.title = "修改图片";
            self.problemDetail.title = self.copyproblemDetail.title;
            self.problemDetail.orderNo = self.copyproblemDetail.orderNo;
            self.pictureValue = self.copypictureValue;
            self.problemDetail.annexName = self.copyproblemDetail.annexName;
            self.problemDetail.annexSuffix = self.copyproblemDetail.annexSuffix;
            self.dataValue = self.copydataValue;
            self.problemDetail.annexUrl = self.copyproblemDetail.annexUrl;
            self.popupType = '1';
            self.dialogFormVisible = true
          }
        },
        //删除弹窗
        deletePicture(){
          let self = this;
          if(self.currentId == ''){
            alert("请选择要删除的图片")
          }else{
            self.deleteVisible = true;
          }
        },
        //删除
        deleteThis(){
          let self = this;
          self.$axios({
            url: 'syscon/delete',
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
          this.problemDetail.title = val.title;
          this.problemDetail.orderNo = val.orderNo;
          this.pictureValue = val.picType;
          this.problemDetail.annexName = val.picName;
          this.problemDetail.annexSuffix = val.picSuffix;
          this.dataValue = val.dataStatus;
          this.problemDetail.annexUrl = val.pictureUrl;

          this.copyproblemDetail.title = val.title;
          this.copyproblemDetail.orderNo = val.orderNo;
          this.copypictureValue = val.picType;
          this.copyproblemDetail.annexName = val.picName;
          this.copyproblemDetail.annexSuffix = val.picSuffix;
          this.copydataValue = val.dataStatus;
          this.copyproblemDetail.annexUrl = val.pictureUrl
        },
        //重置
        resetSearch() {
          this.search = '';
          this.aaa = '';
          this.problemDetail.type = '';
          this.getListData(this);
        },
        //选择类型
        changeTable(val){
          let self = this;
          self.aaa = val;
          self.getListData(self,1,val)
        },
        //获取列表
        getListData(self, page ,type) {
          self.currentPage = page == undefined ? 1 : page;
          let currentTyle = type == undefined ? '': type;
          self.$axios({
            url: 'public/slide',
            type: 'get',
            data: {
              picType:currentTyle,
              title: self.search,
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
          let type = this.aaa;
          this.getListData(this, page, type);
        },
        //获取数据类型
        getDater(){
          let self = this;
          self.$axios({
            url: 'problem/select',
            type: 'get',
            data: {
              typeCode:'dataStatus'
            },
            success: function (res) {
              let data = [];
              for (let i = 0; i <res.data.rows.length; i++) {
                let obj = {};
                obj.label = res.data.rows[i].detailName;
                obj.value = res.data.rows[i].detailCode;
                data.push(obj)
              }
              self.dataOption = data || [];
            },
            error: function (err) {}
          })
        },
        //获取图片类型
        getFilter(){
          let self = this;
          self.$axios({
            url: 'problem/select',
            type: 'get',
            data: {
              typeCode:'picType'
            },
            success: function (res) {
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
