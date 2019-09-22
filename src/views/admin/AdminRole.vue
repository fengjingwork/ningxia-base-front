<template>
  <div style="display:flex;justify-content:space-between">
    <div class="release user-box" style="width:30%">
      <div class="user-box-title" style="display:flex;justify-content: space-between">
        <span style="line-height:40px;"><i class="el-icon-menu"></i> 角色列表</span>
        <el-button type="warning" @click="addUser">增加角色</el-button>
      </div>
      <div class="screen-box screen-border" style="height:40px;width:100%;line-height:40px;border:none;" id="radio2">
        <el-radio-group v-model="source1" size="small" @change="getFilterList">
          <el-radio-button :label="item.id" v-for="item in sourceList1" :key="item.id" style="display:block;margin-right:0;">{{item.roleName}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="release user-box" style="width:60%">
      <div class="user-box-title">
        <span style="line-height:40px;"><i class="el-icon-menu"></i> 权限列表</span>
      </div>
      <div style="margin-top:20px;">
        <el-tree
          :data="data"
          ref="tree"
          show-checkbox
          node-key="id"
          :default-expanded-keys="defaultCheckedKeys"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div style="margin-top:20px;">
        <el-button type="warning" style="display:block;margin:0 auto;" @click="submitQX">确定</el-button>
      </div>
    </div>
    <!-- 新增弹窗-->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="640px" @close="cancle">
      <el-form :model="problemDetail" label-position="right" label-width="110px">
        <el-form-item label="角色名称：" >
          <el-input class="popupinput" v-model="problemDetail.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色代码：">
          <el-input class="popupinput" v-model="problemDetail.roleCode" placeholder="请输入角色代码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AdminRole",
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'child',
          label: 'menuName'
        },
        defaultCheckedKeys:[],
        //弹窗
        dialogFormVisible:false,
        problemDetail:{
          roleName:'',
          roleCode:''
        },
        source1: 0,
        sourceList1: [],
        soucon1:'',
      }
    },
    created() {
      this.getMenuList(this);
    },
    methods: {
      //确定
      submitQX(){
        let self = this;
        let menuIds = self.$refs.tree.getCheckedKeys();
        self.$axios({
          url: 'public/treeupdate',
          type: 'post',
          data: {
            roleId:self.source1,
            menuIds:menuIds
          },
          success: function (res) {
            // self.getTree(self)
            alert("修改成功")
          },
          error: function (err) {}
        })
      },
      //新增角色弹窗
      addUser(){
        this.dialogFormVisible = true;
      },
      //关闭弹窗
      cancle(){
        this.dialogFormVisible = false;
      },
      //点击左侧列表
      getFilterList(data){
        let self = this;
        self.soucon1 = data;
        if(data) {
          self.defaultCheckedKeys = [];
          // 更新右侧树
          self.getTree(self);
        }
      },
      //保存角色
      submit(){
        let self = this;
        if(self.problemDetail.roleName == ''){
          alert('请输入角色名称');
          return;
        }
        if(self.problemDetail.roleCode == ''){
          alert('请输入角色代码');
          return;
        }else{
          self.$axios({
            url: 'public/memberadd',
            type: 'post',
            data: {
              roleName:self.problemDetail.roleName,
              roleCode:self.problemDetail.roleCode
            },
            success: function (res) {
              self.dialogFormVisible = false;
              self.getMenuList(self)
            },
            error: function (err) {
              this.dialogFormVisible = false
            }
          })
        }
      },
      //获取左侧菜单
      getMenuList(self){
        self.$axios({
          url: 'public/userselect',
          type: 'get',
          success: function (res) {
            self.sourceList1 = res.data.items || [];
            self.source1 = res.data.items[0].id;
            self.getTree(self);
          },
          error: function (err) {}
        })
      },
      //获取右侧树
      getTree(self){
        self.$axios({
          url: 'public/treelist',
          type: 'get',
          success: function (res) {
            self.data = res.data.items;
            self.getValue(self);
          },
          error: function (err) {}
        })
      },
      //获得右侧选中的值
      getValue(self){
        self.$axios({
          url: 'public/treebacklist',
          type: 'get',
          data:{
            roleId:self.source1
          },
          success: function (res) {
            console.log(res.data.items)
            self.defaultCheckedKeys = res.data.items;
          },
          error: function (err) {}
        })
      },
    }
  }
</script>

<style>
  #radio2 .el-radio-button--small .el-radio-button__inner{
    font-size:16px!important;
  }
  #radio2 .el-radio-button__inner{
    display:block!important;
  }
</style>
