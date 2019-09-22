<template>
  <div class="set-subscribe user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 订阅设置</span>
    </div>

    <div class="user-screen">
      <el-screen :ifSet="true" :filterCheckObj="filterCheckObj" :filterShow="{level: true, system: true, theme: true, app: true, enterprise: true}" :init="{}" @getFilterList="getFilterList" :key="filter" />
    </div>

    <div class="submit">
      <el-button type="primary" @click="submitFilterList">提 交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SetSubscribe",
    props: {
      userInfo: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        filter: '',
        filterCheckObj: {
          policyClassifications: [],
          sendingSystems: [],
          policyThemes: [],
          applicableRanges: [],
          applicableEnterprises: [],
        },
        filterCheckStr: {}
      }
    },
    created() {
      this.echoFilterList(this);
      this.getFilterList();
    },
    methods: {
      echoFilterList(self) {
        self.$axios({
          url: 'subscribe/echo',
          type: 'post',
          data: {
            userId: self.userInfo.id
          },
          success: function (res) {
            if(res.code == '2000') {
              for(let x in self.filterCheckObj) {
                if(res.data[x] != '' && res.data[x] != null) {
                  self.filterCheckObj[x] = res.data[x].split(',');
                  for(let i = 0; i<self.filterCheckObj[x].length; i++) {
                    self.filterCheckObj[x][i] = Number(self.filterCheckObj[x][i]);
                  }
                }
              }
            }
          },
          error: function (err) {

          }
        })
      },
      getFilterList(data) {
        let self = this;
        if(data){
          for(let x in data) {
            self.filterCheckStr[x] = data[x].toString();
          }
        }
      },
      submitFilterList() {
        let self = this;
        self.$axios({
          url: 'subscribe/submit',
          type: 'post',
          data: {
            userId: self.userInfo.id,
            policyClassifications: self.filterCheckStr.policyClassifications,
            SendingSystems: self.filterCheckStr.sendingSystems,
            policyThemes: self.filterCheckStr.policyThemes,
            applicableRanges: self.filterCheckStr.applicableRanges,
            applicableEnterprises: self.filterCheckStr.applicableEnterprises,
          },
          success: function (res) {
            if(res.code == '2000') {
              self.message('success', '设置成功');
            } else {
              self.message('error', res.msg);
            }
          },
          error: function (err) {
            self.message('error', err);
          }
        })
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
      filterCheckObj() {
        this.filter = Math.random();
      }
    }
  }
</script>
