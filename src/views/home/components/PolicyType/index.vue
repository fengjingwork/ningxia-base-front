<template>
  <div class="type-list">
    <ul>
      <li v-for="(item, index) in listData" @click="jumpTheme(item)">
        <div class="dt">
        <img :src="item.img" width="108" height="60">
        <span>{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'policy-type',
  props: {
    listData: {
      type: Array,
      default: ()=> []
    },
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    jumpTheme(item) {
      this.$router.push({path: '/file', query: {type: 'policyTheme', code: item.code}});
    }
  }
}
</script>
