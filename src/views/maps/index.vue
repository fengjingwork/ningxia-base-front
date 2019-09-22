<template>
  <div class="maps channel">
    <el-crumbs :crumbData="crumbData" />

    <div class="channel-main">
      <div class="con-box">
        <div class="channel-screen channel-part">
          <el-screen :filterShow="{search: false, year: false, level: false, system: false, theme: true, app: false, enterprise: false}" @getFilterList="getFilterList" />
        </div>

        <div class="maps-list">
          <ul>
            <li v-for="(item, index) in listData">
              <!--<span class="date">{{item.releaseDateStr}}</span>-->
              <span class="date">点击量：{{item.clickNum}}</span>
              <span class="num">{{index + 1}}</span>
              <router-link :to="{ path: artPath, query: {id: item.id} }" target="_blank" v-if="item.policyType != 4">{{item.title}}</router-link>
              <router-link :to="{ path: artPath, query: {id: item.id, read: '1'}}" target="_blank" v-else>{{item.title}}</router-link>
            </li>
          </ul>

          <div class="noData" v-if="listData.length == 0">暂无数据</div>
        </div>
      </div>
    </div>

    <div class="statistics part">
      <div class="con-box">
        <div class="statistics-box float-l">
          <!--<el-list-title :listTitle="{name:'政策文件阅读量', path:'/'}" :moreShow="false"/>-->
          <div id="echartRead" class="echarts-con" style="height: 400px;"></div>
        </div>
        <div class="statistics-box float-r">
          <!--<el-list-title :listTitle="{name:'政策文件统计', path:'/'}" :moreShow="false"/>-->
          <div id="echartPolicy" class="echarts-con" style="height: 400px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'maps',
  data () {
    return {
      artPath: '',
      crumbData: [
        {
          channel: 'maps',
          name: '政策图谱',
          path: '/maps'
        }
      ],
      listData: [],
      echartRead: '',
      echartPolicy: '',
      tableParam: {},
      echartPolicyTheme: [],
      echartPolicyNum: [],
      echartReadYear: [],
      echartReadTheme: [],
      echartReadNum: [],
      echartPolicyTotal: 0
    }
  },
  created() {
    this.$store.dispatch('addData', {key: 'crumbs', storage: 'local', data: this.crumbData});
    this.artPath = '/' + this.crumbData[0].channel + '/detail';
    this.tableParam = {page: 1, rows: 10};
    this.getFilterList();
    this.getEchartPolicy(this);
    this.getEchartRead(this);
  },
  mounted () {
    this.initEchartRead(this);
    this.initEchartPolicy(this);
  },
  methods: {
    getFilterList(data) {
      if(data){
        let tableParam = {};
        tableParam.policyTheme = data.policyTheme;

        this.tableParam = Object.assign(this.tableParam, tableParam);
      }

      this.getRecommendList(this, this.tableParam);
    },
    getRecommendList(self, param){
      self.$axios({
        url: 'public/recommendList',
        type: 'get',
        data: param,
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self.listData = res.data.items || [];
          }
        },
        error: function (err) {
          self.listData = [];
        }
      })
    },

    initEchartRead(self) {
      // 基于准备好的dom，初始化echarts实例
      self.echartRead = echarts.init(document.getElementById('echartRead'));
      // 绘制图表
      var option = {
        title: {
          text: '政策文件阅读量'
        },
        tooltip: {},
        grid:{
          top:'80',
          // left: '99',
          // right: '10',
          bottom: '60',
          //containLabel: true
        },
        legend: {
          right: 10,
          data: self.echartReadYear
        },
        xAxis: {
          axisLabel:{
            rotate: 40,
            interval: 0,
          },
          axisTick:{},
          axisLine:{},
          splitLine:{//刻度表格线
            show:false,
          },
          data: /*["综合类", "创业扶持", "市场/行业准入", "企业减负", "公共服务", "技术创新", "知识产权", "技术改造", "数字化转型", "投融资", "信用担保", "人才建设", "产业发展", "其他"]*/
          self.echartReadTheme
        },
        yAxis: {
          axisTick:{},
          axisLine:{},
          splitLine:{
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel:{},
          //splitNumber:20
        },
        color: ["rgb(196, 46, 58)", "rgb(230, 182, 0)"],
        series: [{
          name: self.echartReadYear[0],
          type: "scatter",
          data: self.echartReadNum[0],
          symbolSize: function (data) {
            return Math.sqrt(data) * 3;
          },
        }, {
          name: self.echartReadYear[1],
          type: "scatter",
          data: self.echartReadNum[1],
          symbolSize: function (data) {
            return Math.sqrt(data) * 3;
          },
        }]
      };
      self.echartRead.setOption(option);
    },
    initEchartPolicy(self) {
      // 基于准备好的dom，初始化echarts实例
      self.echartPolicy = echarts.init(document.getElementById('echartPolicy'));
      // 绘制图表
      var option = {
        title: {
          text: '政策文件统计'
        },
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
            //return name + ' ' + num + '（' + ratio + '）';
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
            radius : [0, 150],
            center : ['35%', '50%'],
            //roseType : 'radius',
            //minAngle: 20,
            data: self.echartPolicyNum
          }
        ]
      };
      self.echartPolicy.setOption(option);
    },

    getEchartRead(self) {
      self.$axios({
        url: 'echarts/readNum',
        type: 'get',
        data: {},
        success: function (res) {
          if(res.code == '2000' && res.data.length != 0){
            for(let i = 0; i<res.data.length; i++) {
              let themeArr = [];
              let numArr = [];
              self.echartReadYear.push(res.data[i].title);
              for(let x in res.data[i]) {
                if(x != 'title') {
                  themeArr.push(x);
                  numArr.push(res.data[i][x]);
                }
              }

              self.echartReadTheme = themeArr;
              self.echartReadNum.push(numArr);
            }

            self.initEchartRead(self);
          }
        },
        error: function (err) {
          self.echartReadYear = [];
          self.echartReadTheme = [];
          self.echartReadNum = [];
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
    }
  }
}
</script>
