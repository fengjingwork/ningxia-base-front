<template>
  <div class="slide">
    <el-carousel :interval="5000" height="330px" arrow="always">
      <el-carousel-item v-for="(item, index) in slideList" :key="item.id">
        <img :src="item.pictureUrl" class="img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'el-slide',
  data () {
    return {
      slideList: [],
    }
  },
  created () {
    this.getSlide(this);
  },
  methods: {
    getSlide(self) {
      /*for (let i=1; i<3; i++) {
        self.slideList.push(require('@/assets/images/slide-' + i + '.jpg'));
      }*/

      self.$axios({
        url: 'public/slide',
        type: 'get',
        data: {},
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0){
            self.slideList = res.data.items || [];
          }
        },
        error: function (err) {
          self.slideList = [];
        }
      })
    }
  }
}
</script>

<style scoped>
  .img{
    width:100%;
    height:330px;
    /*position:absolute;*/
    /*top:0;left:0;right:0;bottom:0;*/
    /*margin:auto;*/
  }
  .el-carousel{
    overflow:hidden
  }
</style>
