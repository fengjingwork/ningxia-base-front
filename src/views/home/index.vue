<template>
  <div class="home">
    <div class="head-info part">
      <div class="con-box">
        <div class="head-slide">
          <el-slide />
        </div>

        <div class="head-list">
          <div class="list-tit">
            <div class="tit">最新政策<span></span></div>
            <router-link :to="{ path: '/file' }" href="#" class="more">更多>></router-link>
          </div>
          <el-list :listData="listDataNew" :listTitle="{name:'最新政策', path:'/file'}" :showTitle="false" />
        </div>
      </div>
    </div>

    <div class="part">
      <div class="con-box">
        <div class="part-main">
          <div class="part-list">
            <el-list :listData="listDataSbtz" :listTitle="{name:'项目申报', path:'/declare'}" />
          </div>
          <div class="part-list">
            <el-list :listData="listDataZcjd" :listTitle="{name:'政策解读', path:'/read'}" />
          </div>
        </div>
        <div class="part-side">
          <div class="register side-box">
            <div class="user-head"><img :src="userInfo.userHead" width="60" height="60"></div>
            <div class="user-name"><span v-if="userInfo.userShow">{{userInfo.userName}}, 您好</span><span v-if="!userInfo.userShow">Hi, 您好</span></div>
            <div class="register-btn">
              <router-link :to="{path: userInfo.userTypePath}" @click="" v-if="userInfo.userShow" class="user-btn">{{userInfo.userTypeStr}}</router-link>
              <span @click="logout" v-if="userInfo.userShow">退出</span>
              <router-link :to="{path: '/login'}" v-if="!userInfo.userShow">登录</router-link>
              <a href="https://www.smenx.gov.cn/mfzc/index.shtml" v-if="!userInfo.userShow" target="_blank">注册</a>
            </div>
          </div>
          <div class="side-box"><router-link :to="{path: '/match'}"><img src="@/assets/images/zcpp.jpg"></router-link></div>
          <div class="side-box" @click="quickspot" style="cursor:pointer"><img src="@/assets/images/zhaocha.jpg"></div>
        </div>
      </div>
    </div>
    <el-dialog title="请您" :visible.sync="reVisible" width="600px" @close="cancle">
      <div class="tips" v-if="tips">
        <p>欢迎进入“请您找茬”模块，不管是您在宁夏中小企业政策信息发布平台浏览中遇到了问题，或是灵感迸发有了好的建议，都请不吝向我们提出来。</p>
        <p>您的每一个问题，都会得到及时的处理和答复；您的每一条建议，我们都将认真对待。</p>
        <p>请您在提交意见后妥善保存好查询码，以便及时查询我们给您的反馈结果。</p>
      </div>
      <el-form :model="questionDetail" label-position="right" label-width="110px" v-if="zhaochaform">
        <el-form-item label="问题类型：">
          <el-select v-model="questionDetail.questionType" placeholder="请选择">
            <el-option
              v-for="item in questionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称：" >
          <el-input class="popupinput" v-model="questionDetail.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input class="popupinput" v-model="questionDetail.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input class="popupinput" v-model="questionDetail.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="内容描述：">
          <textarea class="popuptextarea" v-model="questionDetail.questionDesc" maxlength=100 placeholder="请详细描述具体内容，不要超过100字"></textarea>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input class="popupinput" v-model="questionDetail.code" placeholder="请输入验证码" style="width:150px;display:inline-block;vertical-align:middle"></el-input>
          <img v-bind:src="codeImg" alt="" class="codeImg" @click="getCode" style="display:inline-block;vertical-align:middle">
        </el-form-item>
        <el-form-item>
          <div class="login-msg">{{msgText}}</div>
        </el-form-item>
        <el-form-item style="padding-left:90px;">
          <el-button @click="zhaocharesult">提交</el-button>
          <el-button @click="backtip">返回</el-button>
        </el-form-item>
      </el-form>
      <div v-if="zcresult" class="zcresult">
        <p>提交成功！</p>
        <p>您的查询单号为：<span>{{result1.code}}</span></p>
        <p>请牢记您的查询单号，可用来查询反馈信息</p>
        <div>
          <el-button @click="backtip">返回</el-button>
        </div>
      </div>
      <el-form :model="resultDetail" label-position="right" label-width="110px" v-if="chaxunform">
        <el-form-item label="输入查询码：" >
          <el-input class="popupinput" v-model="resultDetail.resultCode" placeholder="请输入16位查询码"></el-input>
        </el-form-item>
        <el-form-item style="padding-left:90px;">
          <el-button @click="chaxunresult">提交</el-button>
          <el-button @click="backtip">返回</el-button>
        </el-form-item>
      </el-form>
      <div v-if="cxresult" class="cxresult">
        <p><span>查询码：</span><span>{{result2.indentCode}}</span></p>
        <p><span>昵称：</span><span>{{result2.nickName}}</span></p>
        <p><span>提问时间：</span><span>{{result2.addTimeStr}}</span></p>
        <p><span>提问内容：</span><span>{{result2.questionDesc}}</span></p>
        <p><span>回复时间：</span><span>{{result2.replyTimeStr}}</span></p>
        <p><span>回复内容：</span><span>{{result2.reply}}</span></p>
        <div><el-button @click="backtip">返回</el-button></div>
      </div>
      <div class="tipsbutton" v-if="tips">
        <el-button @click="zhaocha"><i class="el-icon-search"></i>我要找茬</el-button>
        <el-button @click="replace"><i class="el-icon-menu"></i>查询回复</el-button>
      </div>
    </el-dialog>
    <div class="policy-info part">
      <div class="con-box">
        <div class="policy-num">
          <div class="policy-item">资金支持政策：{{policyNum.资金支持类}}项</div>
          <div class="policy-item">税收减免政策：{{policyNum.税费减免类}}项</div>
          <div class="policy-item">资质认定政策：{{policyNum.资质认定类}}项</div>
        </div>
      </div>
    </div>
    <div class="part">
      <div class="con-box">
        <div class="part-main">
          <div class="part-list">
            <el-list :listData="listDataZjsb" :listTitle="{name:'资金支持', path:'/file', type: 'applicableRange', code: 2}" />
          </div>
          <div class="part-list">
            <el-list :listData="listDataSsjm" :listTitle="{name:'税收减免', path:'/file', type: 'applicableRange', code: 4}" />
          </div>
          <div class="part-list">
            <el-list :listData="listDataZzrd" :listTitle="{name:'资质认定', path:'/file', type: 'applicableRange', code: 8}" />
          </div>
          <div class="part-list">
            <el-list :listData="listDataQtzc" :listTitle="{name:'其他政策', path:'/file', type: 'applicableRange', code: 32}" />
          </div>
        </div>

        <div class="part-side">
          <el-list-title :listTitle="{name:'政策主题', path:'/file'}"/>

          <div class="policy-type">
            <policy-type :listData="policyTypeData" />
          </div>
        </div>
      </div>
    </div>
    <div class="statistics part">
      <div class="con-box">
        <div class="statistics-box float-l">
          <el-list-title :listTitle="{name:'企业数量统计', path:'/'}" :moreShow="false"/>
          <div id="echartEnterprise" class="echarts-con"></div>
        </div>
        <div class="statistics-box float-r">
          <el-list-title :listTitle="{name:'政策文件统计', path:'/'}" :moreShow="false"/>
          <div id="echartPolicy" class="echarts-con"></div>
        </div>
      </div>
    </div>
    <div class="friend part">
      <div class="con-box">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-select v-model="friendVal1" placeholder="--国务院各部门网站--" @change="jumpFriend">
              <el-option
                v-for="item in friendList1"
                :key="item.id"
                :label="item.name"
                :value="item.url">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="friendVal2" placeholder="--自治区政府部门网站--" @change="jumpFriend">
              <el-option
                v-for="item in friendList2"
                :key="item.id"
                :label="item.name"
                :value="item.url">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="friendVal3" placeholder="--新闻媒体网站--" @change="jumpFriend">
              <el-option
                v-for="item in friendList3"
                :key="item.id"
                :label="item.name"
                :value="item.url">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'home',
  inject: ['reload'],
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      msgText:'',
      result1:{
        code:'',
      },
      result2:{
        indentCode:'',
        nickName:'',
        addTimeStr:'',
        questionDesc:'',
        replyTimeStr:'',
        reply:''
      },
      codeImg:'/api/web_verifyCodeController/web_getImage.form',
      //弹窗
      reVisible:false,
      //文本
      tips:true,
      //找茬
      zhaochaform:false,
      questionDetail:{
        questionType:'',
        nickName:'',
        phone:'',
        mail:'',
        questionDesc:'',
        code:''
      },
      //找茬结果
      zcresult:false,
      //查询
      chaxunform:false,
      resultDetail:{
        resultCode:''
      },
      //查询结果
      cxresult:false,
      // userShow: false,
      // userInfo: {},
      //userHead: this.userInfo.userHead || require('@/assets/images/user-head.png'),
      listTitle: {
        title: '我是标题',
        pic: ''
      },
      /*listData: [
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
        {title: '【国家】国家税务总局关于简化小型微利企业所得税', date: '2019-03-13'},
      ],*/
      listDataNew: [],
      listDataSbtz: [],
      listDataZcjd: [],
      listDataZjsb: [],
      listDataSsjm: [],
      listDataZzrd: [],
      listDataQtzc: [],
      policyNum: {
        // zjsb: 1200,
        // ssjm: 1200,
        // zzrd: 1200,
      },
      policyTypeData: [
        {
          name: '创业扶持',
          type: '',
          code: 2,
          img: require('@/assets/images/theme-1.jpg')
        },
        {
          name: '市场/行业准入',
          type: '',
          code: 4,
          img: require('@/assets/images/theme-2.png')
        },
        {
          name: '企业减负',
          type: '',
          code: 8,
          img: require('@/assets/images/theme-3.jpg')
        },
        {
          name: '技术创新',
          type: '',
          code: 32,
          img: require('@/assets/images/theme-4.png')
        },
        {
          name: '知识产权',
          type: '',
          code: 64,
          img: require('@/assets/images/theme-5.jpg')
        },
        {
          name: '人才建设',
          type: '',
          code: 2048,
          img: require('@/assets/images/theme-6.jpg')
        },
        {
          name: '产业发展',
          type: '',
          code: 4096,
          img: require('@/assets/images/theme-7.jpg')
        }
      ],
      echartEnterprise: '',
      echartEnterpriseYear: [],
      echartEnterpriseNum: [],
      echartEnterpriseRate: [],
      echartPolicy: '',
      echartPolicyTheme: [],
      echartPolicyNum: [],

      friendVal1: '',
      friendVal2: '',
      friendVal3: '',
      friendList1: [],
      friendList2: [],
      friendList3: [],
      echartPolicyTotal: 0
    }
  },
  created () {
    // if(localStorage.getItem('userInfo')) {
    //   this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //   this.getUserInfo(this);
    // }
    this.getList(this, '', 'listDataNew');
    this.getList(this, 'sbtz', 'listDataSbtz');
    this.getList(this, 'zcjd', 'listDataZcjd');
    this.getList(this, 'zjsb', 'listDataZjsb');
    this.getList(this, 'ssjm', 'listDataSsjm');
    this.getList(this, 'zzrd', 'listDataZzrd');
    this.getList(this, 'qtzc', 'listDataQtzc');
    this.getTypeNum(this);
    this.getEchartEnterprise(this);
    this.getEchartPolicy(this);

    this.getFriend(this, '1');
    this.getFriend(this, '2');
    this.getFriend(this, '3');
    this.getQuestionType(this);
    this.getCode(this);
  },
  mounted () {
    this.initEchartEnterprise(this);
    this.initEchartPolicy(this);
  },
  methods: {
    getCode(){//获取验证码图片流
      this.codeImg = '/api/web_verifyCodeFrontController/web_getImage.form' + "?=" + Math.random();
    },
    //验证验证码
    loginSubmit() {
      let self = this;
      self.msgText = '';
      self.$axios({
        url: 'public/validate',
        type: 'post',
        data: {
          code: self.questionDetail.code,
        },
        success: function (res) {
          self.zhaochasubmit(self); //验证码通过后再提交
        },
        error: function (err) {
          self.msgText = err;
          self.getCode();
        }
      })
    },
    //打开弹窗
    quickspot(){
      this.reVisible = true;
    },
    //点击x按钮
    cancle(){
      this.reVisible = false;
      this.tips = true;
      this.zhaochaform = false;
      this.chaxunform = false;
      this.zcresult = false;
      this.cxresult = false;
      this.resultDetail.resultCode = '';
    },
    //点击我要找茬
    zhaocha(){
      this.tips = false;
      this.zhaochaform = true;
      this.questionDetail.questionType = '';
      this.questionDetail.nickName = '';
      this.questionDetail.phone = '';
      this.questionDetail.mail = '';
      this.questionDetail.questionDesc = '';
      this.questionDetail.code='';
    },
    //点击查询回复
    replace(){
      this.tips = false;
      this.chaxunform = true;
    },
    //返回第一级
    backtip(){
      this.chaxunform = false;
      this.zhaochaform = false;
      this.zcresult = false;
      this.cxresult = false;
      this.tips = true
    },
    //提交结果
    zhaocharesult(){
      let self = this;
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      let reg1 = new RegExp("^\\d{11}$");
      if(self.questionDetail.questionType == ''){
        alert('请选择问题类型');
        return;
      }
      if(self.questionDetail.nickName == ''){
        alert('请输入昵称');
        return;
      }
      if(self.questionDetail.phone == ''){
        alert('请输入手机号码');
        return;
      }
      if(!reg1.test(self.questionDetail.phone)){
        alert('请输入正确的手机号码');
        return;
      }
      if(self.questionDetail.mail == ''){
        alert('请输入邮箱');
        return;
      }
      if(!reg.test(self.questionDetail.mail)){
        alert('请输入正确的邮箱格式');
        return;
      }
      if(self.questionDetail.questionDesc == ''){
        alert('请输入问题描述');
        return;
      }else{
        self.loginSubmit();
      }
    },
    zhaochasubmit(self){
      self.$axios({
        url: 'public/zhaochaadd',
        type: 'post',
        data: {
          questionType:self.questionDetail.questionType,
          nickName:self.questionDetail.nickName,
          phone:self.questionDetail.phone,
          mail:self.questionDetail.mail,
          questionDesc:self.questionDetail.questionDesc
        },
        success: function (res) {
          self.result1.code = res.data;
          self.zhaochaform = false;
          self.zcresult = true;
          self.getCode();
        },
        error: function (err) {}
      });
    },
    //提交结果
    chaxunresult(){
      let self = this;
      if(self.resultDetail.resultCode == ''){
        alert("请输入订单号")
        return;
      }else{
        self.$axios({
          url: 'public/ddsearch',
          type: 'post',
          data: {
            indentCode:self.resultDetail.resultCode,
          },
          success: function (res) {
            self.result2.indentCode = res.data.indentCode;
            self.result2.nickName = res.data.nickName;
            self.result2.addTimeStr = res.data.addTimeStr;
            self.result2.questionDesc = res.data.questionDesc;
            self.result2.replyTimeStr = res.data.replyTimeStr;
            self.result2.reply = res.data.reply;
            self.chaxunform = false;
            self.cxresult = true;
          },
          error: function (err) {
            alert("查询无结果")
          }
        });
      }
    },
    //获取问题类型
    getQuestionType(self){
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
    /*getUserInfo(self) {
      self.userShow = true;
      self.userHead = 'data:image/jpeg;base64,' + self.userInfo.img;
      if(self.userInfo.userType == '1') {
        self.userInfo.userTypeStr = '企业用户';
        self.userInfo.userTypePath = '/user';
      } else if(self.userInfo.userType == '2') {
        self.userInfo.userTypeStr = '监管机构';
        self.userInfo.userTypePath = '/';
      } else if(self.userInfo.userType == '3') {
        self.userInfo.userTypeStr = '管理员';
        self.userInfo.userTypePath = '/user';
      }
    },*/
    getList(self, type, arr) {
      let param = {policyType: 1, page: 1, rows: 6};
      if(type === 'sbtz') {
        param.policyType = 2;
      } else if(type === 'zcjd') {
        param.policyType = 4;
      } else if(type === 'zjsb') {
        param.applicableRange = 2;
      } else if(type === 'ssjm') {
        param.applicableRange = 4;
      } else if(type === 'zzrd') {
        param.applicableRange = 8;
      } else if(type === 'qtzc') {
        param.applicableRange = 32;
      }
      self.getListData(self, param, arr);
    },
    getListData(self, param, arr) {
      self.$axios({
        url: 'public/list',
        type: 'get',
        data: param,
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self[arr] = res.data.items || [];
          }
        },
        error: function (err) {
          self[arr] = [];
        }
      })
    },
    getTypeNum(self) {
      self.$axios({
        url: 'home/typeNum',
        type: 'get',
        data: {},
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.policyNum = res.data || {};
          }
        },
        error: function (err) {}
      })
    },

    initEchartEnterprise(self) {
      // 基于准备好的dom，初始化echarts实例
      self.echartEnterprise = echarts.init(document.getElementById('echartEnterprise'));
      // 绘制图表
      var option = {
        title: {},
        legend: {
          data: ["企业数量(家)","增速(%)"],
          top: "bottom"
        },
        grid: {
          left: "12%",
          right: "5%"
        },
        tooltip:{
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          data: self.echartEnterpriseYear
        },
        yAxis: [{
          type: "value",
          name: "企业数量(家)",
          //max: yMax,
          min: 0,
          nameTextStyle: {
            color: "#666",
            fontSize: 10,
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },{
          type: "value",
          name: "增速(%)",
          //max: 100,
          min: 0,
          nameTextStyle: {
            color: "#666",
            fontSize: 10,
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }],
        color: ['#479fe8','#ee8138'],
        /*dataZoom: [
          {
            type:'slider',
            show: true,
            realtime: true,
            backgroundColor: '#f4f4f4',
            top: 265,
            y: 0,
            height: 10,
            start: 20,
            end: 80
          }
        ],*/
        series: [{
          name: '企业数量(家)',
          type: 'bar',
          data: self.echartEnterpriseNum,
          barWidth: 30,
          label: {
            show: false,
          }
        },{
          name: '增速(%)',
          type: "line",
          data: self.echartEnterpriseRate,
          yAxisIndex: 1,
          label: {
            show: false,
          }
        }]
      };
      self.echartEnterprise.setOption(option);
    },
    initEchartPolicy(self) {
      // 基于准备好的dom，初始化echarts实例
      self.echartPolicy = echarts.init(document.getElementById('echartPolicy'));
      // 绘制图表
      var option = {
        title: {},
        tooltip : {
          trigger: 'item',
          formatter: "{b} <br/>{c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: self.echartPolicyTheme,
          formatter: function (name) {
            let num, ratio;
            for(let i = 0; i < self.echartPolicyNum.length; i++) {
              if(name == self.echartPolicyNum[i].name) {
                num = self.echartPolicyNum[i].value;
                ratio = ((num/self.echartPolicyTotal) * 100).toFixed(2) + '%';
              }
            }
            return name + ' ' + num;
          }
        },
        color:['#c12e34','#e6b600','#ee5c42','#005eaa','#2b821d','#0098d9','#00bfff','#32a487','#339ca8','#00c5cd','#76eec6','#add8e6','#8db6cd','#aaaaaa'],
        //calculable : true,
        series : [
          {
            name:'',
            type:'pie',
            label: {
              show: false
            },
            radius : [0, 130],
            center : ['35%', '50%'],
            //roseType : 'radius',
            //minAngle: 20,
            data: self.echartPolicyNum
            /*[
              {value:10, name:'市场/行业准入'},
              {value:5, name:'数字化转型'},
              {value:15, name:'企业减负'},
              {value:25, name:'产业发展'},
              {value:20, name:'人才建设'},
              {value:35, name:'知识产权'},
              {value:30, name:'信用担保'}
            ]*/
          }
        ]
      };
      self.echartPolicy.setOption(option);
    },

    getEchartEnterprise(self) {
      self.$axios({
        url: 'echarts/enterpriseNum',
        type: 'post',
        data: {
          startYear: '2014',
          endYear: '2018'
        },
        success: function (res) {
          if(res.code == '2000' && res.data.length != 0){
            for(let i = 0; i<res.data.length; i++) {
              self.echartEnterpriseYear.push(res.data[i].years);
              self.echartEnterpriseNum.push(res.data[i].num);
              self.echartEnterpriseRate.push(res.data[i].rateOfIncrease);
            }

            self.initEchartEnterprise(self);
          }
        },
        error: function (err) {
          self.echartEnterpriseYear = [];
        }
      })
    },
    getEchartPolicy(self) {
      self.$axios({
        url: 'echarts/policyNum',
        type: 'get',
        data: {},
        success: function (res) {
          if(res.code == '2000' && res.data){
            for(let x in res.data) {
              self.echartPolicyTheme.push(x);
              let val = {value: res.data[x], name: x };
              self.echartPolicyNum.push(val);
              self.echartPolicyTotal += res.data[x];
            }

            self.initEchartPolicy(self);
          }
        },
        error: function (err) {
          self.echartPolicyTheme = [];
          self.echartPolicyNum = [];
        }
      })
    },

    logout() {
      localStorage.removeItem('userInfo');
      localStorage.clear();
      this.$router.push({path: '/'});
      this.reload();
    },

    getFriend(self, type) {
      self.$axios({
        url: 'public/friend',
        type: 'get',
        data: {
          level: type
        },
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0){
            self['friendList'+type] = res.data.items || [];
          }
        },
        error: function (err) {
          self['friendList'+type] = []
        }
      })
    },
    jumpFriend(val) {
      window.open(val);
    }
  }
}
</script>

<style scoped>
  .tips p{
    text-indent:2em;
    font-size:16px;line-height:24px;
    margin-bottom:10px;
  }
  .tipsbutton{
    text-align:center;
    margin-top:30px;
  }
  .tipsbutton>button{
    margin:0 20px;
  }
  .tipsbutton i{
    margin-right:10px;
  }
  .popupinput{
    width:300px;
  }
  .popuptextarea{
    width:400px;height:100px;
    resize:none;
    padding:10px;
    box-sizing:border-box;
    border-radius:4px;
    border-color:#ccc;
  }
  .cxresult>p,
  .zcresult>p{
    margin-bottom:20px;
  }
  .cxresult>p{
    display:flex;
    justify-content:space-between;
  }
  .zcresult>p{
    text-align:center;
  }
  .cxresult>div,
  .zcresult>div{
    text-align:center;
    margin-top:30px;
  }
  .cxresult>p>span{
    display:inline-block;
    vertical-align:middle;
    margin-right:10px;
    text-align:right;
    width:100px;
  }
  .zcresult span{
    color:red;
  }
  .cxresult>p{
    line-height:24px;
  }
  .cxresult>p>span:first-child{
    display:block;
    width:18%;
  }
  .cxresult>p>span:last-child{
    display:block;
    width:80%;
    text-align:left;
  }
</style>
