<template>
  <div class="crumbs">
    <div class="con-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in crumbData" :key="item.channel" :to="{ path: item.path }" v-if="index !== crumbData.length-1">{{item.name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in crumbData" :key="item.channel" v-if="index == crumbData.length-1">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import '@/assets/style/crumbs.scss'
export default {
  name: 'el-crumbs',
  props: {
    crumbData: {
      type: Array,
      default: ()=> []
    }
  },
  data () {
    return {
      //crumbData: this.$store.state.crumbInfo
    }
  }
}
</script>
