<template>
  <div class="user">
  <div class="release detail user-box">
    <div class="con-box">
      <div class="user-box-title">
        <span><i class="el-icon-menu"></i> {{title}}</span>
      </div>

      <div class="detail-main">
        <div class="detail-form">
          <el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="120px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="detailForm.title"></el-input>
            </el-form-item>
            <el-form-item label="抓取网站" prop="dataSources">
              <el-col :span="8">
                <el-input v-model="detailForm.dataSources"></el-input>
              </el-col>
              <el-col :span="8">
                <el-form-item label="抓取日期" prop="storageTimeStr">
                  <el-date-picker
                    v-model="detailForm.storageTimeStr"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    placeholder="选择日期"
                    class="">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="政策级别" prop="policyClassificationNew">
                  <el-select v-model="detailForm.policyClassificationNew" placeholder="" class="" @change="getPolicyType">
                    <el-option v-for="item in levelOptions" :key="item.detailCode" :label="item.detailName" :value="item.detailCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="原文链接" prop="crawlingURL">
              <el-input v-model="detailForm.crawlingURL"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="digest">
              <el-input v-model="detailForm.digest"></el-input>
            </el-form-item>
            <!--<el-form-item label="文件附件" prop="file">
              <el-input v-model="detailForm.file"></el-input>
            </el-form-item>-->
            <el-form-item label="正文" prop="content">
              <quill-editor
                ref="quillEditor"
                :options="editorOption"
                v-model="detailForm.content"
                class="ql-editor"
                style="padding:0;margin-top:-10px;"
              />
              <!--<el-input type="textarea" v-model="detailForm.content" rows="20" resize="none"></el-input>-->
            </el-form-item>
            <el-form-item label="附件上传">
              <input type="file" v-on:change="getappendix" style="position: relative;top:8px; width:230px;overflow: hidden;float: left;"/>
              <el-button @click="updatefiles" type="primary" style="float: left;">上 传</el-button>
              <span style="float: left;">
                <span style="float: left;padding:0 10px;">已上传文件</span>
                <span :title="detailForm.annexName+'.'+detailForm.annexSuffix" style="display:inline-block;width:450px;height:38px;border:1px solid #67c23a;padding:0 20px 0 10px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                  <span style="color:#ccc;" v-if="!detailForm.annexName">暂未上传文件！</span>
                  {{detailForm.annexName}}
                  <span v-if="detailForm.annexName">.</span>
                  {{detailForm.annexSuffix}}
                </span>
              </span>
              <el-button type="primary" @click="clearupdata" style="margin-left:50px;">清空</el-button>
            </el-form-item>
            <el-form-item label="政策类型" prop="policyType">
              <el-select v-model="detailForm.policyType" placeholder="请选择" class="" @change="">
                <el-option label="请选择" :value="0"></el-option>
                <el-option v-for="item in typeOptions" :key="item.detailCode" :label="item.detailName" :value="item.detailCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政策原文" prop="originalId" v-if="detailForm.policyType === 4">
              <el-input v-model="detailForm.originalTitle">
                <el-button slot="append" @click="showDetails">选择</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="发布来源" prop="websiteSources" class="checkRadio">
              <el-checkbox-group v-model="detailForm.websiteSources" @change="getIndustry">
                <el-checkbox :label="item.detailCode" v-for="item in sourceList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="行业名称" prop="" class="checkRadio">
              <el-checkbox-group v-model="detailForm.industryTypes" @change="">
                <el-checkbox :label="item.detailCode" v-for="item in indList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适用企业" prop="applicableEnterprises" class="checkRadio">
              <el-checkbox-group v-model="detailForm.applicableEnterprises" @change="">
                <el-checkbox :label="item.detailCode" v-for="item in enterpriseList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="政策主题" prop="policyTheme" class="checkRadio">
              <el-radio-group v-model="detailForm.policyTheme">
                <el-radio :label="item.detailCode" v-for="item in themeList" :key="item.detailCode">{{item.detailName}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="应用类型" prop="applicableRange" class="checkRadio">
              <el-radio-group v-model="detailForm.applicableRange">
                <el-radio :label="item.detailCode" v-for="item in appList" :key="item.detailCode">{{item.detailName}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发布日期" prop="releaseDateStr">
              <el-date-picker
                v-model="detailForm.releaseDateStr"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期"
                class="">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期" prop="endDateStr">
              <el-date-picker
                v-model="detailForm.endDateStr"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期"
                class="">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <div class="detail-btn">
          <el-button type="primary" @click="submitDetail('detailForm')">保 存</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="选择原文" class="dialog" :visible.sync="dialogVisible" width="880px">
      <div class="dialog-con">
        <div class="user-tab">
          <el-button type="primary" @click="resetSearch" class="float-r">重置</el-button>
          <div class="user-search">
            <el-input placeholder="" v-model="search" class="">
              <el-button slot="append" icon="el-icon-search" type="primary" @click="getFilterList"></el-button>
            </el-input>
          </div>
          <el-radio-group v-model="policyType" @change="getPolicyType2">
            <el-radio-button label="1">国家政策</el-radio-button>
            <el-radio-button label="2">宁夏政策</el-radio-button>
          </el-radio-group>
        </div>

        <div class="user-screen">
          <div class="screen">
            <div class="screen-box">
              <span class="screen-name">发布来源：</span>
              <el-radio-group v-model="source" size="small" @change="getFilterList" style="float: left; width: 750px;">
                <el-radio-button label="0">全部</el-radio-button>
                <el-radio-button :label="item.detailCode" v-for="item in sourceList2" :key="item.detailCode">{{item.detailName}}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="user-table table">
          <el-table :data="tableListData" stripe style="width: 100%" header-row-class-name="thead">
            <el-table-column width="50" header-align="center" align="center" label="">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row.id" @change="getRadio(scope.row)"></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="" header-align="center" align="left" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <router-link :to="{ path: artPath, query: {id: scope.row.id} }" target="_blank">{{scope.row.title}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="releaseDateStr" label="发布日期" width="120" header-align="center" align="center"></el-table-column>
          </el-table>

          <div class="dialog-pag">
            <el-button type="primary" class="float-l" @click="getOriginal">确定</el-button>
            <el-table-pagination :total="total" :currentPage="currentPage" @getPageList="getPageList" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: "ReleaseDetail",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    quillEditor
  },
  data () {
    var selectZero = (rule, value, callback) => {
      if (value === 0) {
        return callback(new Error(''));
      } else {
        callback();
      }
    };
    return {
      title:'',
      detailId:'',
      getfile:{
        file:'',
        image_url:'',
      },
      updatefile:'',
      levelOptions: [],
      typeOptions: [],
      sourceList: [],
      themeList: [],
      appList: [],
      enterpriseList: [],
      indList: [],
      detailForm: {
        annexName:'', //附件名称
        annexSuffix:'',//附件后缀
        annexUrl:'',//附件地址
        title: '',
        dataSources: '',
        crawlingURL: '',
        digest: '',
        file: '',
        content: '',
        policyType: 0,
        websiteSources: [],
        industryTypes: [],
        applicableEnterprises: [],
        policyTheme: 0,
        applicableRange: 0,
        releaseDateStr: '',
        endDateStr: '',
        originalTitle: '',
        originalId: ''
      },
      rules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'},
        ],
        dataSources: [
          {required: true, message: '抓取网站不能为空', trigger: 'blur'},
        ],
        crawlingURL: [
          {required: true, message: '原文链接不能为空', trigger: 'blur'},
        ],
        /*digest: [
          {required: true, message: '摘要不能为空', trigger: 'blur'},
        ],*/
        /*file: [
          {required: true, message: '文件附件不能为空', trigger: 'blur'},
        ],*/
        content: [
          {required: true, message: '正文不能为空', trigger: 'blur'},
        ],
        storageTimeStr: [
          {required: true, message: '抓取日期不能为空', trigger: 'blur'},
        ],
        policyClassificationNew: [
          {required: true, message: '政策级别不能为空', trigger: 'change'},
        ],
        policyType: [
          //{type: 'number', required: true, message: '政策类型不能为空', trigger: 'change'},
          {validator: selectZero, required: true,  message: '政策类型不能为空', trigger: 'change'},
        ],
        websiteSources: [
          { type: 'array', required: true, message: '请至少选择一项发布来源', trigger: 'change' }
        ],
        applicableEnterprises: [
          { type: 'array', required: true, message: '请至少选择一项适用企业', trigger: 'change' }
        ],
        policyTheme: [
          //{required: true, message: '政策主题不能为空', trigger: 'change' },
          {validator: selectZero, required: true, message: '政策主题不能为空', trigger: 'change' }
        ],
        applicableRange: [
          //{required: true, message: '应用类型不能为空', trigger: 'change' },
          {validator: selectZero, required: true, message: '应用类型不能为空', trigger: 'change' }
        ],
        releaseDateStr: [
          {required: true, message: '发布日期不能为空', trigger: 'change'},
        ],
      },
      dialogVisible: false,
      artPath: '/file/detail',
      search: '',
      policyType: 1,
      typeCode: 'websiteSource1',
      source: 0,
      sourceList2: [],
      tableListData: [],
      total: 0,
      currentPage: 1,
      tableRadio: '',
      radioTitle: '',

      editorOption: {
        modules:{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            // ['blockquote', 'code-block'],
            // // custom button values
            // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction
            //
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            //
            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            // [{ 'font': [] }],
            // [{ 'align': [] }],
            // ['clean']
          ]
        },
        //placeholder: '',
      },
    }
  },
  created() {
    if(this.$route.query.id == undefined || this.$route.query.id == 'undefined'){
      //发布来源默认是国家政策
      this.title = '政策发布';
      let code;
      this.detailForm.websiteSources = [];
      this.detailForm.industryTypes = [];
      code = 'websiteSource1';
      this.getSource(this, code);
      //默认选择国家政策
      this.detailForm.policyClassificationNew = 1;
      //提交按钮应该是新建
      this.detailId = 'add'
    }else{
      this.title = '政策处理';
      this.getDetail(this);
      //提交按钮应该是修改
      this.detailId = 'edit'
    }
    this.getFilter(this, 'policyClassification', 'levelOptions');
    this.getFilter(this, 'policyType', 'typeOptions');
    this.getFilter(this, 'policyTheme', 'themeList');
    this.getFilter(this, 'applicableRange', 'appList');
    this.getFilter(this, 'applicableEnterprise', 'enterpriseList');
    this.getFilter(this, 'industryType', 'indList');
  },
  methods: {
    // 获取本地的文件
    getappendix(data){
      this.getfile.file = data.target.files[0];
      console.log(this.getfile.file)
    },
    // 点击上传
    updatefiles(){
      let self = this;
      console.log(self.getfile)
      if (!self.getfile.file){
        return
      }
      self.$axios({
        url: 'release/updatefile',
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
            self.detailForm.annexName=res.data.fileName; //附件名称
            self.detailForm.annexSuffix=res.data.fileExt; //附件后缀
            self.detailForm.annexUrl=res.data.fileUrl; //附件后缀
          }
        },
        error: function (err) {}
      })
    },
    // 清除上传的附件
    clearupdata(){
      this.detailForm.annexName=''; //附件名称
      this.detailForm.annexSuffix=''; //附件后缀
      this.detailForm.annexUrl=''; //附件后缀
    },
    getDetail(self) {
      self.$axios({
        url: 'release/details',
        type: 'get',
        data: {
          id: self.$route.query.id,
          userId: self.userInfo.id
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            let formObj = res.data;
            for(let x in res.data) {
              if(x == 'websiteSources' || x == 'industryTypes' || x == 'applicableEnterprises') {
                if(formObj[x] != null) {
                  formObj[x] = formObj[x].split(',').map(Number);
                } else if(formObj[x] == null) {
                  formObj[x] = [];
                }
              } else if(x == 'content') {
                //formObj[x] = formObj[x].replace(/<[^>]+>/g,"").replace(/&nbsp;/ig, "");
              }
            }
            self.detailForm = formObj;

            let sourceCode = '';
            if(self.detailForm.policyClassificationNew == 1) {
              sourceCode = 'websiteSource1';
            } else if(self.detailForm.policyClassificationNew == 2) {
              sourceCode = 'websiteSource2';
            }
            self.getSource(self, sourceCode);
          }
        },
        error: function (err) {}
      })
    },
    getFilter(self, type, arr) {
      self.$axios({
        url: 'public/filter',
        type: 'get',
        data: {
          typeCode: type
        },
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self[arr] = res.data.items || [];
          } else {
            self[arr]= [];
          }
        },
        error: function (err) {
          self[arr]= [];
        }
      })
    },
    getSource(self, code) {
      self.$axios({
        url: 'public/filter',
        type: 'get',
        data: {
          typeCode: code
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.sourceList = res.data.items || [];
          }
        },
        error: function (err) {}
      })
    },
    getPolicyType(val) {
      let code;
      this.detailForm.websiteSources = [];
      this.detailForm.industryTypes = [];
      if(val == 1){
        code = 'websiteSource1';
      } else if(val == 2) {
        code = 'websiteSource2';
      }

      this.getSource(this, code);
    },
    getIndustry() {
      let self = this;
      let sourcesStr = self.detailForm.websiteSources.toString();
      self.$axios({
        url: 'release/industry',
        type: 'get',
        data: {
          policyClassification: self.detailForm.policyClassificationNew,
          websiteSources: sourcesStr
        },
        success: function (res) {
          if(res.code == '2000' && res.data != null) {
            self.detailForm.industryTypes = res.data.split(',').map(Number);
          }
        },
        error: function (err) {}
      })
    },
    submitDetail(form) {
      let self = this;
      self.$refs[form].validate((valid) => {
        if (valid) {
          console.log(self.detailForm.content);
          for(let x in self.detailForm) {
            if(x == 'websiteSources' || x == 'industryTypes' || x == 'applicableEnterprises') {
              self.detailForm[x] = self.detailForm[x].toString();
            }
            if(self.detailForm[x] == null) {
              self.detailForm[x] = '';
            }
          }
          if (self.detailId == 'add') {
            self.$axios({
              url: 'release/add',
              type: 'post',
              data: {
                annexName:self.detailForm.annexName,
                annexSuffix:self.detailForm.annexSuffix,
                annexUrl:self.detailForm.annexUrl,
                // id: self.detailForm.id,
                title: self.detailForm.title,
                content: self.detailForm.content,
                dataSources: self.detailForm.dataSources,
                crawlingURL: self.detailForm.crawlingURL,
                digest: self.detailForm.digest,
                file: self.detailForm.file,
                policyClassificationNew: self.detailForm.policyClassificationNew,
                policyType: self.detailForm.policyType,
                policyTheme: self.detailForm.policyTheme,
                websiteSources: self.detailForm.websiteSources,
                industryTypes: self.detailForm.industryTypes,
                applicableEnterprises: self.detailForm.applicableEnterprises,
                applicableRange: self.detailForm.applicableRange,
                storageTimeStr: self.detailForm.storageTimeStr,
                releaseDateStr: self.detailForm.releaseDateStr,
                endDateStr: self.detailForm.endDateStr,
                dataStatus: self.detailForm.dataStatus,
                originalId: self.detailForm.originalId,
              },
              success: function (res) {
                if(res.code == '2000') {
                  //self.getDetail(self);
                  window.parent.opener.location.reload();
                  window.close();
                } else {
                  self.message('error', res.msg);
                }
              },
              error: function (err) {
                self.message('error', err);
              }
            })
          }else{
            self.$axios({
              url: 'release/edit',
              type: 'post',
              data: {
                annexName:self.detailForm.annexName,
                annexSuffix:self.detailForm.annexSuffix,
                annexUrl:self.detailForm.annexUrl,
                id: self.detailForm.id,
                title: self.detailForm.title,
                content: self.detailForm.content,
                dataSources: self.detailForm.dataSources,
                crawlingURL: self.detailForm.crawlingURL,
                digest: self.detailForm.digest,
                file: self.detailForm.file,
                policyClassificationNew: self.detailForm.policyClassificationNew,
                policyType: self.detailForm.policyType,
                policyTheme: self.detailForm.policyTheme,
                websiteSources: self.detailForm.websiteSources,
                industryTypes: self.detailForm.industryTypes,
                applicableEnterprises: self.detailForm.applicableEnterprises,
                applicableRange: self.detailForm.applicableRange,
                storageTimeStr: self.detailForm.storageTimeStr,
                releaseDateStr: self.detailForm.releaseDateStr,
                endDateStr: self.detailForm.endDateStr,
                dataStatus: self.detailForm.dataStatus,
                originalId: self.detailForm.originalId,
              },
              success: function (res) {
                if(res.code == '2000') {
                  //self.getDetail(self);
                  window.parent.opener.location.reload();
                  window.close();
                } else {
                  self.message('error', res.msg);
                }
              },
              error: function (err) {
                self.message('error', err);
              }
            })
          }
        }
      })
    },

    showDetails() {
      this.search = '';
      this.policyType = 1;
      this.source = 0;
      this.typeCode = 'websiteSource1';
      this.sourceList2 = [];
      this.tableListData = [];
      this.currentPage = 1;
      this.total = 0;
      this.tableRadio = '';
      this.dialogVisible = true;

      this.getSourceFilter(this);
      this.getListData(this);
    },
    getPolicyType2(val) {
      if(val == 1){
        this.typeCode = 'websiteSource1';
      } else if(val == 2) {
        this.typeCode = 'websiteSource2';
      }
      this.source = 0;
      //this.artPath = '/' + type + '/detail';
      this.getSourceFilter(this);
      this.getListData(this);
    },
    resetSearch() {
      this.search = '';
      this.getListData(this);
    },
    getSourceFilter(self) {
      self.$axios({
        url: 'public/filter',
        type: 'get',
        data: {
          typeCode: self.typeCode
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.sourceList2 = res.data.items || [];
          }
        },
        error: function (err) {}
      })
    },
    getFilterList(val) {
      this.getListData(this);
    },
    getListData(self, page) {
      self.currentPage = page == undefined ? 1 : page;
      self.$axios({
        url: 'public/list',
        type: 'get',
        data: {
          policyType: 1,
          policyClassificationNew: self.policyType,
          websiteSourceNew: self.source,
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
    getPageList(page) {
      this.getListData(this, page);
    },
    getRadio(row) {
      this.radioTitle = row.title;
    },
    getOriginal() {
      this.detailForm.originalTitle = this.radioTitle;
      this.detailForm.originalId = this.tableRadio;
      this.dialogVisible = false;
    },

    message(type, msg) {
      let self = this;
      self.$message({
        showClose: true,
        center: true,
        message: msg,
        type: type
      });
    }
  },
  watch: {
    /*detailForm:{
      handler: function(val, oldval){
        val.websiteSources = val.split(',').map(Number);
      },

      deep:true//对象内部的属性监听，也叫深度监听
    },*/
    /*'detailForm.websiteSources'(val) {
      let arrData = val.split(',').map(Number);
      this.detailForm.websiteSources = arrData;
    }*/
  },
  filters: {
    filterHtml:function(val){//val就是以获取的msg的值
      console.log(val);
      //return val.replace(/<[^>]+>/g);//去除文字的<...></...>标签
    },
  }
}
</script>
