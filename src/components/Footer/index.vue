<template>
  <footer>
    <div class="footer">
      <div class="con-box">
        <div class="foot-item">
          <router-link :to="{path: '/'}">网站声明</router-link> |
          <router-link :to="{path: '/'}">关于我们</router-link> |
          <router-link :to="{path: '/'}">网站地图</router-link>
        </div>
        <div class="foot-item">主办单位：宁夏回族自治区工业与信息化厅  技术支持：联合信用征信股份有限公司</div>
        <div class="foot-item">联系地址：银川市金凤区宁安大街490号ibi育成中心六号楼</div>
      </div>
    </div>
  </footer>
</template>

<script>
import '@/assets/style/footer.scss'
export default {
  name: 'el-footer'
}
</script>
