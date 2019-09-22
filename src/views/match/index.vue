<template>
  <div class="match">
    <el-crumbs :crumbData="crumbData" />

    <div class="match-main">
      <div class="con-box">
        <el-form :inline="true" :model="matchForm" :rules="rules" ref="matchForm" label-width="120px" class="">
        <div class="match-form">
          <div class="match-form-tit">
            <div class="float-l"><i class="el-icon-d-arrow-right"></i>常规信息</div>
            <div class="float-r">
              <span class="prompt">提示：请尽量完善匹配信息，以便匹配更精准！</span>
              <!--<span class="date">2019-01-30</span>-->
            </div>
          </div>
          <div class="match-form-box">
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input v-model="matchForm.enterpriseName"></el-input>
              </el-form-item>
              <el-form-item label="企业联系人" prop="enterpriseContacts">
                <el-input v-model="matchForm.enterpriseContacts"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phoneNum">
                <el-input v-model="matchForm.phoneNum"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="matchForm.email"></el-input>
              </el-form-item>
              <!--<el-form-item label="所在地区" prop="region">
                <el-cascader
                  v-model="matchForm.region"
                  :options="options"
                  @active-item-change="handleItemChange"
                  :props="props"
                ></el-cascader>
              </el-form-item>-->
          </div>
        </div>

        <div class="match-form">
          <div class="match-form-tit">
            <div class="float-l"><i class="el-icon-d-arrow-right"></i>基本信息</div>
          </div>
          <div class="match-form-box">
              <el-form-item label="从业人数" prop="employedPopulation">
                <el-input v-model.number="matchForm.employedPopulation"><template slot="append">人</template></el-input>
              </el-form-item>
              <el-form-item label="资产总额" prop="assetsTotal">
                <el-input v-model.number="matchForm.assetsTotal"><template slot="append">万元</template></el-input>
              </el-form-item>
              <el-form-item label="营业收入" prop="businessIncome">
                <el-input v-model.number="matchForm.businessIncome"><template slot="append">万元</template></el-input>
              </el-form-item>
              <el-form-item label="负债总额" prop="totalLiabilities">
                <el-input v-model.number="matchForm.totalLiabilities"><template slot="append">万元</template></el-input>
              </el-form-item>
              <el-form-item label="行业" prop="industry">
                <el-select v-model="matchForm.industry" placeholder="请选择">
                  <el-option v-for="(item, index) in industryOptions" :label="item.detailName" :value="item.detailCode" :key="item.detailCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业盈亏情况" prop="profitStatus">
                <el-radio-group v-model="matchForm.profitStatus">
                  <el-radio label="0">盈利</el-radio>
                  <el-radio label="1">亏损</el-radio>
                </el-radio-group>
                <el-button type="primary" size="mini" plain @click="resetRadio" style="margin-left: 30px">取消</el-button>
              </el-form-item>
          </div>
        </div>

        <div class="match-validate" style="text-align: center;">
            <el-form-item label="验证码" prop="code">
              <el-col :span="16">
                <el-input v-model="matchForm.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="8" align="right">
                <img :src="codeImg" alt="" class="codeImg" @click="getCode">
              </el-col>
              <div class="code-error el-form-item__error" v-if="codeError">{{codeErrorMsg}}</div>
            </el-form-item>
        </div>
        </el-form>
        <div class="match-btn">
          <el-button type="warning" @click="resetForm('matchForm')">重 置</el-button>
          <el-button type="success" @click="submitForm('matchForm', 'save')">保 存</el-button>
          <el-button type="primary" @click="submitForm('matchForm', 'submit')">提 交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "match",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        this.codeError = false;
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    return {
      crumbData: [
        {
          channel: 'match',
          name: '政策匹配',
          path: '/match'
        }
      ],
      industryOptions: [],
      matchForm: {
        enterpriseName: '',
        enterpriseContacts: '',
        phoneNum: '',
        email: '',
        region: [],
        employedPopulation: '',
        assetsTotal: '',
        businessIncome: '',
        totalLiabilities: '',
        industry: '',
        profitStatus: '',
        code: ''
      },
      options: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      codeImg: '',
      codeError: '',
      codeErrorMsg: '',
      rules: {
        enterpriseName: [
          {required: true, message: '请输入企业名称', trigger: 'blur'},
        ],
        enterpriseContacts: [
          {required: true, message: '请输入企业联系人', trigger: 'blur'},
        ],
        phoneNum: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '请输入11位有效的手机号码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
        ],
        /*region: [
          {required: true, message: '请选择地区', trigger: 'change'},
        ],*/
        employedPopulation: [
          {required: true, message: '请输入从业人数', trigger: 'blur'},
          {type: 'number', message: '从业人数必须为数字值', trigger: 'blur'}
        ],
        assetsTotal: [
          {required: true, message: '请输入资产总额', trigger: 'blur'},
          {type: 'number', message: '资产总额必须为数字值', trigger: 'blur'}
        ],
        businessIncome: [
          {required: true, message: '请输入营业收入', trigger: 'blur'},
          {type: 'number', message: '营业收入必须为数字值', trigger: 'blur'}
        ],
        totalLiabilities: [
          {required: true, message: '请输入负债总额', trigger: 'blur'},
          {type: 'number', message: '负债总额必须为数字值', trigger: 'blur'}
        ],
        industry: [
          {required: true, message: '请选择行业', trigger: 'blur'}
        ],
        /*profitStatus: [
          { required: true, message: '请选择企业盈亏情况', trigger: 'change' }
        ],*/
        code: [
          {required: true, validator: validateCode, trigger: 'blur'}
        ],
      }
    }
  },
  created () {
    this.getCode();
    this.getIndustry(this);
    this.getMatchData(this);
  },
  methods: {
    handleItemChange(val) {
      console.log('active item:', val);
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.options[0].cities.length) {
          this.options[0].cities = [{
            label: '南京'
          }];
        } else if (val.indexOf('浙江') > -1 && !this.options[1].cities.length) {
          this.options[1].cities = [{
            label: '杭州'
          }];
        }
      }, 300);
    },

    getCode() {
      this.codeImg = '/api/web_verifyCodeFrontController/web_getImage.form' + "?=" + Math.random();
    },
    getIndustry(self) {
      self.$axios({
        url: 'public/industry',
        type: 'get',
        data: {},
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self.industryOptions = res.data.items || [];
          } else {
            self.industryOptions = [];
          }
        },
        error: function (err) {
          self.industryOptions = [];
        }
      })
    },
    getMatchData(self) {
      self.$axios({
        url: 'match/echo',
        type: 'get',
        data: {
          userId: self.userInfo.id,
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.matchForm.enterpriseName = res.data.enterpriseName;
            self.matchForm.enterpriseContacts = res.data.enterpriseContacts;
            self.matchForm.phoneNum = res.data.phoneNum;
            self.matchForm.email= res.data.email;
            self.matchForm.employedPopulation= res.data.employedPopulation;
            self.matchForm.assetsTotal= res.data.assetsTotal;
            self.matchForm.businessIncome= res.data.businessIncome;
            self.matchForm.totalLiabilities= res.data.totalLiabilities;
            self.matchForm.industry= res.data.industry;
            self.matchForm.profitStatus= res.data.profitStatus;
          }
        },
        error: function (err) {}
      })
    },

    resetRadio() {
      this.matchForm.profitStatus = '';
    },

    submitForm(formName, type) {
      let self = this;
      self.codeError = false;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.validate(self, type);
        }
      })
    },

    validate(self, type) {
      self.$axios({
        url: 'public/validate',
        type: 'get',
        data: {
          code: self.matchForm.code
        },
        success: function (res) {
          if(res.code == '2000') {
            if(type == 'save'){
              self.saveFormData(self);
            } else if(type == 'submit') {
              self.submitFormData(self);
            }
          }
        },
        error: function (err) {
          self.message('error', err);
        }
      })
    },
    submitFormData(self) {
      self.$axios({
        url: 'match/submit',
        type: 'get',
        data: {
          userId: self.userInfo.id,
          enterpriseName: self.matchForm.enterpriseName,
          enterpriseContacts: self.matchForm.enterpriseContacts,
          phoneNum: self.matchForm.phoneNum,
          email: self.matchForm.email,
          province: '',
          area: '',
          city: '',
          employedPopulation: self.matchForm.employedPopulation,
          assetsTotal: self.matchForm.assetsTotal,
          businessIncome: self.matchForm.businessIncome,
          totalLiabilities: self.matchForm.totalLiabilities,
          industry: self.matchForm.industry,
          profitStatus: self.matchForm.profitStatus,
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.$store.dispatch('addData', {key: 'match', storage: 'local', data: res.data});
            self.$router.push({path: '/match/result'});
            self.message('success', res.msg);
          } else {
            self.message('error', res.msg);
          }
        },
        error: function (err) {
          self.message('error', err);
        }
      })
    },
    saveFormData(self) {
      self.$axios({
        url: 'match/save',
        type: 'get',
        data: {
          userId: self.userInfo.id,
          enterpriseName: self.matchForm.enterpriseName,
          enterpriseContacts: self.matchForm.enterpriseContacts,
          phoneNum: self.matchForm.phoneNum,
          email: self.matchForm.email,
          province: '',
          area: '',
          city: '',
          employedPopulation: self.matchForm.employedPopulation,
          assetsTotal: self.matchForm.assetsTotal,
          businessIncome: self.matchForm.businessIncome,
          totalLiabilities: self.matchForm.totalLiabilities,
          industry: self.matchForm.industry,
          profitStatus: self.matchForm.profitStatus,
        },
        success: function (res) {
          if(res.code == '2000') {
            self.message('success', '保存成功');
          } else {
            self.message('error', res.msg);
          }
        },
        error: function (err) {
          self.message('error', err);
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  }
}
</script>
