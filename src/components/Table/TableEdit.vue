<template>
  <div class="table">
    <el-table :data="tableData" stripe style="width: 100%" header-row-class-name="thead">
      <el-table-column type="index" label="序列" width="50" header-align="center" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="" header-align="center" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <router-link :to="{ path: artPath, query: {id: scope.row.id} }" target="_blank">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="releaseDateStr" label="发文日期" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="" label="状态" width="180" header-align="center" align="center" v-if="crumbData[0].channel == 'file'">
        <template slot-scope="scope">
          <span class="read-btn" @click="jumpRead(scope.row)" v-if="scope.row.hasAnalysis == 1"><img src="@/assets/images/icon-read-yes.png"/></span>
          <span class="read-btn read-no" @click="" v-if="scope.row.hasAnalysis == 0"><img src="@/assets/images/icon-read-no.png"/></span>
          <el-tag type="success" v-if="scope.row.effectiveDay === '即将生效'">{{scope.row.effectiveDay}}</el-tag>
          <el-tag type="warning" v-if="scope.row.effectiveDay === '生效中'">{{scope.row.effectiveDay}}</el-tag>
          <el-tag type="info" v-if="scope.row.effectiveDay === '已截止'">{{scope.row.effectiveDay}}</el-tag>
          <el-tag type="danger" v-if="scope.row.effectiveDay.indexOf('倒计时') !== -1">{{scope.row.effectiveDay}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import '@/assets/style/table.scss'
export default {
  name: 'el-table-list2',
  props: {
    tableData: {
      type: Array,
      default: ()=> []
    },
    crumbData: {
      type: Array,
      default: ()=> []
    }
  },
  data () {
    return {
      artPath: '/' + this.crumbData[0].channel + '/detail'
    }
  },
  created() {
    /*for(let i = 0; i<this.tableData.length; i++) {
      if(this.tableData[i].hasAnalysis == '1'){
        this.tableData[i].readImg = require('@/assets/images/icon-read-yes.png');
      } else {
        this.tableData[i].readImg = require('@/assets/images/icon-read-no.png');
      }
    }*/
  },
  methods: {
    jumpRead(item) {
      //this.$store.dispatch('addData', {key: 'read', storage: 'local', data: '1'});
      let open = this.$router.resolve({path: this.artPath, query: {id: item.id, read: '1'}});
      window.open(open.href, '_blank');
      //this.$router.push({path: this.artPath, query: {id: item.id}});
    }
  }
}
</script>
