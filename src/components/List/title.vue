<template>
  <div class="list-title" v-if="showTitle">
    <div class="tit"><i><img src="@/assets/images/icon-tit1.png"/></i>{{listTitle.name}}</div>
    <router-link :to="{ path: listTitle.path, query: {type: listTitle.type, code: listTitle.code}}" class="more" v-if="moreShow">更多>></router-link>
  </div>
</template>

<script>
export default {
  name: 'el-list-title',
  props: {
    listTitle: {
      type: [Object, String],
      default: ()=> '我是标题'
    },
    showTitle: {
      type: Boolean,
      default: ()=> true
    },
    moreShow: {
      type: Boolean,
      default: ()=> true
    },
  },
  created () {

  }
}
</script>
