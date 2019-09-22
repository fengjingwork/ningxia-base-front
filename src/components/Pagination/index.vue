<template>
  <div class="pagination">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import '@/assets/style/pagination.scss'
export default {
  name: "el-table-pagination",
  props: {
    total: {
      type: Number,
      default: ()=> 0
    },
    currentPage: {
      type: Number,
      default: ()=> 1
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('getPageList', val)
    }
  }
}
</script>
