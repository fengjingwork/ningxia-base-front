<template>
  <div class="list">
    <el-list-title :listTitle="listTitle" :showTitle="showTitle" />
    <ul>
      <li v-for="(item, index) in listData">
        <span class="date">{{item.releaseDateStr}}</span>
        <router-link :to="{ path: artPath, query: {id: item.id} }" target="_blank" v-if="listTitle.name != '政策解读'">{{item.title}}</router-link>
        <router-link :to="{ path: artPath, query: {id: item.id, read: '1'} }" target="_blank" v-else>{{item.title}}</router-link>
        <i v-if="item.ifNew == '1' && showTitle == false"><img src="@/assets/images/list-new.png"/></i>
      </li>
    </ul>
  </div>
</template>

<script>
import '@/assets/style/list.scss'
export default {
  name: 'el-list',
  props: {
    listData: {
      type: Array,
      default: ()=> []
    },
    listTitle: {
      type: [Object, String],
      default: ()=> ''
    },
    showTitle: {
      type: Boolean,
      default: ()=> true
    },
  },
  data () {
    return {
      artPath: this.listTitle.path + '/detail'
    }
  },
}
</script>
