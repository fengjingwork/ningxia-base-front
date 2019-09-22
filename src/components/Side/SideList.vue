<template>
  <div class="side-list">
    <div class="side-tit">
      <div class="tit">政策推荐</div>
      <div class="arrow"></div>
    </div>
    <ul>
      <li v-for="(item, index) in listData" :title="item.title">
        <router-link :to="{path: artPath, query: {id: item.id}}" target="_blank" v-if="item.policyType != 4">{{item.title}}</router-link>
        <router-link :to="{path: artPath, query: {id: item.id, read: '1'}}" target="_blank" v-else>{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import '@/assets/style/side.scss'
export default {
  name: 'el-side-list',
  props: {
    listData: {
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
    //console.log(this.$route.params);
  },
}
</script>
