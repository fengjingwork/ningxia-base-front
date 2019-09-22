<template>
  <div class="screen" v-if="!ifSet">
    <div class="screen-box" v-if="filterShow.search == true || filterShow.search == undefined">
      <span class="screen-name">搜索条件：</span>
      <el-select v-model="filterObj.year" placeholder="发布时间" size="mini" class="screen-select" @change="selectFilter" v-if="filterShow.year == true">
        <el-option key="全部" label="全部" :value="''"></el-option>
        <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="filterObj.policyClassificationNew" placeholder="政策级别" size="mini" class="screen-select" @change="selectFilter" v-if="filterShow.level == true">
        <el-option key="全部" label="全部" :value="''"></el-option>
        <el-option v-for="item in levelOptions" :key="item.detailCode" :label="item.detailName" :value="item.detailCode"></el-option>
      </el-select>
    </div>
    <div class="screen-box" v-if="filterShow.system == true && systemList.length != 0">
      <span class="screen-name">发文系统：</span>
      <el-radio-group v-model="filterObj.SendingSystem" size="small" @change="selectFilter">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button :label="item.detailCode" v-for="item in systemList" :key="item.detailCode">{{item.detailName}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="screen-box" v-if="filterShow.theme == true && themeList.length != 0">
      <span class="screen-name">政策主题：</span>
      <el-radio-group v-model="filterObj.policyTheme" size="small" @change="selectFilter">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button :label="item.detailCode" v-for="item in themeList" :key="item.detailCode">{{item.detailName}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="screen-box" v-if="filterShow.app == true && appList.length != 0">
      <span class="screen-name">应用类型：</span>
      <el-radio-group v-model="filterObj.applicableRange" size="small" @change="selectFilter">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button :label="item.detailCode" v-for="item in appList" :key="item.detailCode">{{item.detailName}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="screen-box" v-if="filterShow.enterprise == true && enterpriseList.length != 0">
      <span class="screen-name">适用企业：</span>
      <el-radio-group v-model="filterObj.applicableEnterprise" size="small" @change="selectFilter">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button :label="item.detailCode" v-for="item in enterpriseList" :key="item.detailCode">{{item.detailName}}</el-radio-button>
      </el-radio-group>
    </div>
  </div>

  <div class="screen" v-else-if="ifSet">
    <div class="screen-box" v-if="filterShow.search == true || filterShow.search == undefined">
      <span class="screen-name">政策级别：</span>
      <el-checkbox class="check-all" v-model="checkAll.policyClassifications.all" :indeterminate="checkAll.policyClassifications.isIndeterminate" label="0" @change="checkFilterAll($event, 'policyClassifications')">全部</el-checkbox>
      <el-checkbox-group v-model="filterCheckObj.policyClassifications" @change="checkFilter($event, 'policyClassifications')">
        <!--<el-checkbox label="0" @change="checkFilterAll">全部</el-checkbox>-->
        <el-checkbox :label="item.detailCode" v-for="item in levelOptions" :key="item.detailCode">{{item.detailName}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="screen-box" v-if="filterShow.system == true">
      <span class="screen-name">发文系统：</span>
      <el-checkbox class="check-all" v-model="checkAll.sendingSystems.all" :indeterminate="checkAll.sendingSystems.isIndeterminate" label="0" @change="checkFilterAll($event, 'sendingSystems')">全部</el-checkbox>
      <el-checkbox-group v-model="filterCheckObj.sendingSystems" @change="checkFilter($event, 'sendingSystems')">
        <!--<el-checkbox label="0">全部</el-checkbox>-->
        <el-checkbox :label="item.detailCode" v-for="item in systemList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="screen-box" v-if="filterShow.theme == true">
      <span class="screen-name">政策主题：</span>
      <el-checkbox class="check-all" v-model="checkAll.policyThemes.all" :indeterminate="checkAll.policyThemes.isIndeterminate" label="0" @change="checkFilterAll($event, 'policyThemes')">全部</el-checkbox>
      <el-checkbox-group v-model="filterCheckObj.policyThemes" @change="checkFilter($event, 'policyThemes')">
        <!--<el-checkbox label="0">全部</el-checkbox>-->
        <el-checkbox :label="item.detailCode" v-for="item in themeList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="screen-box" v-if="filterShow.app == true">
      <span class="screen-name">应用类型：</span>
      <el-checkbox class="check-all" v-model="checkAll.applicableRanges.all" :indeterminate="checkAll.applicableRanges.isIndeterminate" label="0" @change="checkFilterAll($event, 'applicableRanges')">全部</el-checkbox>
      <el-checkbox-group v-model="filterCheckObj.applicableRanges" @change="checkFilter($event, 'applicableRanges')">
        <!--<el-checkbox label="0">全部</el-checkbox>-->
        <el-checkbox :label="item.detailCode" v-for="item in appList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="screen-box" v-if="filterShow.enterprise == true">
      <span class="screen-name">适用企业：</span>
      <el-checkbox class="check-all" v-model="checkAll.applicableEnterprises.all" :indeterminate="checkAll.applicableEnterprises.isIndeterminate" label="0" @change="checkFilterAll($event, 'applicableEnterprises')">全部</el-checkbox>
      <el-checkbox-group v-model="filterCheckObj.applicableEnterprises" @change="checkFilter($event, 'applicableEnterprises')">
        <!--<el-checkbox label="0">全部</el-checkbox>-->
        <el-checkbox :label="item.detailCode" v-for="item in enterpriseList" :key="item.detailCode">{{item.detailName}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import '@/assets/style/screen.scss'
export default {
  name: "el-screen",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    ifSet: {
      type: Boolean,
      default: ()=> false
    },
    filterShow: {
      type: Object,
      default: ()=> {}
    },
    init: {
      type: Object,
      default: ()=> {}
    },
    ifSubscribe: {
      type: Boolean,
      default: ()=> false
    },
    filterCheckObj: {
      type: Object,
      default: ()=> {}
    }
  },
  data () {
    return {
      yearOptions: [],
      levelOptions: [],
      systemList: [],
      themeList: [],
      appList: [],
      enterpriseList: [],
      filterObj: {
        year: '',
        policyClassificationNew: '',
        SendingSystem: 0,
        policyTheme: 0,
        applicableRange: 0,
        applicableEnterprise: 0,
      },
      checkAll: {
        policyClassifications: {
          all: false,
          isIndeterminate: true,
          options: [],
        },
        sendingSystems: {
          all: false,
          isIndeterminate: true,
          options: [],
        },
        policyThemes: {
          all: false,
          isIndeterminate: true,
          options: [],
        },
        applicableRanges: {
          all: false,
          isIndeterminate: true,
          options: [],
        },
        applicableEnterprises: {
          all: false,
          isIndeterminate: true,
          options: [],
        },
      },

      /*filterCheckObj: {
        policyClassificationNew: [],
        SendingSystem: [],
        policyTheme: [],
        applicableRange: [],
        applicableEnterprise: [],
      }*/
    }
  },
  created() {
    this.getInit(this.init);
    this.getYear(this);

    if(this.ifSubscribe) {
      this.getFilter2(this, 'policyClassification', 'levelOptions');
      this.getFilter2(this, 'SendingSystem', 'systemList');
      this.getFilter2(this, 'policyTheme', 'themeList');
      this.getFilter2(this, 'applicableRange', 'appList');
      this.getFilter2(this, 'applicableEnterprise', 'enterpriseList');
    } else {
      this.getFilter(this, 'policyClassification', 'levelOptions');
      this.getFilter(this, 'SendingSystem', 'systemList');
      this.getFilter(this, 'policyTheme', 'themeList');
      this.getFilter(this, 'applicableRange', 'appList');
      this.getFilter(this, 'applicableEnterprise', 'enterpriseList');
    }
  },
  methods: {
    ifCheckAll(type) {
      //let x;
      if(type == 'themeList') {
        //x = 'policyThemes';
        let checkedCount = this.themeList.length;
        this.checkAll.policyThemes.all = checkedCount === this.filterCheckObj.policyThemes.length;
      }

      // let checkedCount = this.themeList.length;
      // this.checkAll.policyThemes.all = checkedCount === this.filterCheckObj.policyThemes.length;
      //this.checkAll[x].isIndeterminate = checkedCount > 0 && checkedCount < this.checkAll[x].options.length;
      //this.$emit('getFilterList', this.filterCheckObj);

      /*if(self.filterCheckObj[x].length == self.themeList.length) {
        self.checkAll[x].options = self.filterCheckObj[x];
        self.checkAll[x].all = true;
      } else {
        self.checkAll[x].all = false;
      }*/
    },
    getInit(init) {
      if(init) {
        this.filterObj[init.type] = init.code;
      }
    },
    getYear(self) {
      self.$axios({
        url: 'public/filterYear',
        type: 'get',
        data: {},
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self.yearOptions = res.data.items;
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
          if(res.code == '2000' && res.data) {
            self[arr] = res.data.items || [];
            //self.ifCheckAll(arr);
          }
        },
        error: function (err) {}
      })
    },
    getFilter2(self, type, arr) {
      self.$axios({
        url: 'subscribe/filter',
        type: 'get',
        data: {
          typeCode: type,
          userId: self.userInfo.id
        },
        success: function (res) {
          if(res.code == '2000' && res.data) {
            self[arr] = res.data.items || [];
          }
        },
        error: function (err) {}
      })
    },

    selectFilter(val) {
      this.$emit('getFilterList', this.filterObj);
    },
    checkFilterAll(val, type) {
      let all = [];
      let options;
      if(type == 'policyClassifications'){
        options = this.levelOptions;
      } else if(type == 'sendingSystems') {
        options = this.systemList;
      } else if(type == 'policyThemes') {
        options = this.themeList;
      } else if(type == 'applicableRanges') {
        options = this.appList;
      } else if(type == 'applicableEnterprises') {
        options = this.enterpriseList;
      }
      for(let i = 0; i<options.length; i++) {
        all.push(options[i].detailCode);
      }
      this.checkAll[type].options = all;
      this.filterCheckObj[type] = val ? all : [];
      this.checkAll[type].isIndeterminate = false;
      this.$emit('getFilterList', this.filterCheckObj);
    },
    checkFilter(val, type) {
      let checkedCount = val.length;
      this.checkAll[type].all = checkedCount === this.checkAll[type].options.length;
      this.checkAll[type].isIndeterminate = checkedCount > 0 && checkedCount < this.checkAll[type].options.length;
      this.$emit('getFilterList', this.filterCheckObj);
    }
  }
}
</script>
