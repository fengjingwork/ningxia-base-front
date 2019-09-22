<template>
  <nav>
    <div class="nav" v-if="ifUserShow">
      <div class="con-box">
        <ul>
          <li v-for="(item, index) in navList" :class="active == index ? 'active' : ''">
            <router-link :to="{ path: item.path }">{{item.name}}</router-link>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import '@/assets/style/nav.scss'
export default {
  name: 'el-nav',
  props: {
    ifUserShow: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      active: 0,
      //ifUserShow: true,
      navList: [],
      /*navList: [
        {
          name: '首页',
          type: 'index',
          path: '/'
        },
        {
          name: '政策文件',
          type: 'zcwj',
          path: '/zcwj'
        },
        {
          name: '申报通知',
          type: 'sbtz',
          path: '/sbtz'
        },
        {
          name: '政策解读',
          type: 'zcjd',
          path: '/zcjd'
        },
        {
          name: '政策图谱',
          type: 'zctp',
          path: '/zctp'
        }
      ]*/
    }
  },
  created () {
    //this.$store.dispatch('readData', 'nav');
    this.navList = this.$store.state.nav;
    this.getActive(this);
  },
  methods: {
    getActive(self) {
      let navNum = {};
      let path = self.$route.path;
      for(let i = 0; i < self.navList.length; i++) {
        if(path == self.navList[i].path) {
          self.active = self.navList[i].num;
          break;
        }
        //navNum[self.navList[i].type] = self.navList[i].num;
      }
    },
    getHeader() {
      let path = this.$route.path.indexOf('user');
      if(path === -1) {
        this.ifUserShow = true;
      } else {
        this.ifUserShow = false;
      }
    },
  },
  watch: {
    $route() {
      this.getActive(this);
      this.getHeader(this);
    }
  }
}
</script>
