<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import '@/assets/style/pages.scss'
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0)
    })
  },
  created () {

  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },
  }
}
</script>
