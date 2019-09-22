<template>
  <div class="side-set">
    <div class="item"><router-link :to="{path: '/match'}"><img src="@/assets/images/zcpp.jpg"></router-link></div>
    <div class="item"><router-link :to="{path: '/user'}"><img src="@/assets/images/zcdy.jpg"></router-link></div>
  </div>
</template>

<script>
import '@/assets/style/side.scss'
export default {
  name: 'el-side-set',
}
</script>
