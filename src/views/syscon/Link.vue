<template>
  <div class="release user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 友情链接</span>
    </div>

    <div class="user-tab">
      <el-button type="primary" class="float-r" @click="resetSearch">重置</el-button>
      <div class="user-search">
        <el-input placeholder="请输入网站名称" v-model="search" class="">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
        </el-input>
      </div>
      <span>网站类型:</span>
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
      </div>
      <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead" highlight-current-row  @current-change="handleCurrentChange">
        <el-table-column type="index" width="50" header-align="center" align="center" label="序号"></el-table-column>
        <el-table-column prop="name" label="网站名称" width="210" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="url" label="链接" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="levelStr" label="网站类型" width="210" header-align="center" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="顺序" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="storageTimeStr" label="创建时间" width="" header-align="center" align="center"></el-table-column>
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
      <el-form :model="problemDetail" label-position="right" label-width="100px">
        <el-form-item label="网站名称：">
          <el-input class="popupinput" v-model="problemDetail.name" placeholder="请输入网站名称"></el-input>
        </el-form-item>
        <el-form-item label="网址：">
          <el-input class="popupinput" v-model="problemDetail.url" placeholder="请输入网址"></el-input>
        </el-form-item>
        <el-form-item label="网站类型：">
          <el-select v-model="problemDetail.level" placeholder="请选择" @change="changeTable">
            <el-option
              v-for="item in pictureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顺序：">
          <el-input class="popupinput" v-model="problemDetail.orderNo" placeholder="请输入顺序"></el-input>
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
    name: "Link",
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
          name:'',
          url:'',
          level:'',
          orderNo:'',
          type:'',
        },
        copyproblemDetail:{
          name:'',
          url:'',
          level:'',
          orderNo:'',
          type:'',
        },
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
        aaa:''
      }
    },
    created() {
      this.getFilter(this);
      this.getListData(this)
    },
    methods: {
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
        if(self.problemDetail.name == ''){
          alert('请输入网址名称');
          return;
        }
        if(self.problemDetail.url == ''){
          alert('请输入网址');
          return;
        }
        if(self.problemDetail.level == ''){
          alert('请选择网站类型');
          return;
        }
        if(self.problemDetail.orderNo == ''){
          alert('请输入顺序');
          return;
        }else{
          self.$axios({
            url: 'public/addlink',
            type: 'post',
            data: {
              name:self.problemDetail.name,
              url:self.problemDetail.url,
              level:self.problemDetail.level,
              orderNo:self.problemDetail.orderNo
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
        if(self.problemDetail.name == ''){
          alert('请输入网址名称');
          return;
        }
        if(self.problemDetail.url == ''){
          alert('请输入网址');
          return;
        }
        if(self.problemDetail.level == ''){
          alert('请选择网站类型');
          return;
        }
        if(self.problemDetail.orderNo == ''){
          alert('请输入顺序');
          return;
        }else {
          self.$axios({
            url: 'public/updatelink',
            type: 'post',
            data: {
              name: self.problemDetail.name,
              url: self.problemDetail.url,
              level: self.problemDetail.level,
              orderNo: self.problemDetail.orderNo,
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
        self.title = '新增网站链接';
        self.problemDetail.name = '';
        self.problemDetail.url = '';
        self.problemDetail.level = '';
        self.problemDetail.orderNo = '';
        self.dialogFormVisible = true;
        self.popupType = '0';
      },
      //修改弹窗
      editPicture(){
        let self = this;
        if(self.currentId == ''){
          alert("请选择要修改的链接")
        }else{
          self.title = '修改网站链接';
          self.problemDetail.name = self.copyproblemDetail.name;
          self.problemDetail.url = self.copyproblemDetail.url;
          self.problemDetail.level = self.copyproblemDetail.level;
          self.problemDetail.orderNo = self.copyproblemDetail.orderNo;
          self.popupType = '1';
          self.dialogFormVisible = true
        }
      },
      //删除弹窗
      deletePicture(){
        let self = this;
        if(self.currentId == ''){
          alert("请选择要删除的链接")
        }else{
          self.deleteVisible = true;
        }
      },
      //删除
      deleteThis(){
        let self = this;
        self.$axios({
          url: 'public/removelink',
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
        this.problemDetail.name = val.name;
        this.problemDetail.url = val.url;
        this.problemDetail.level = val.level;
        this.problemDetail.orderNo = val.orderNo;
        this.copyproblemDetail.name = val.name;
        this.copyproblemDetail.url = val.url;
        this.copyproblemDetail.level = val.level;
        this.copyproblemDetail.orderNo = val.orderNo;
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
          url: 'public/friend',
          type: 'get',
          data: {
            level:currentTyle,
            name: self.search,
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
      //获取链接类型
      getFilter(){
        let self = this;
        self.$axios({
          url: 'problem/select',
          type: 'get',
          data: {
            typeCode:'level'
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
