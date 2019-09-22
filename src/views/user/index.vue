<template>
  <div class="user">
    <div class="con-box">
      <div class="user-side">
        <el-side-menu />
      </div>

      <div class="user-main">
        <router-view :userInfo="userInfo"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.getUrl();
  },
  methods: {
    getUrl() {
      if(this.$route.path == '/user' || this.$route.path == '/user/') {
        this.$router.push({path: '/user/centerSubscribe'});
      }
    }
  },
  watch: {
    $router() {
      this.getUrl();
    }
  }
}
</script>
