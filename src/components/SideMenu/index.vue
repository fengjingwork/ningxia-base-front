<template>
  <div class="side-menu">
    <div class="side-menu-title">功能菜单</div>
    <div class="side-menu-list">
      <el-menu
        class="side-menu-plug"
        :default-active="getActive"
        :unique-opened="true"
        :router="true"
        @select="">
        <el-submenu index="1" v-if="this.userInfo.menus.政策中心 == '1'">
          <template slot="title">
            <span>政策中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/centerSubscribe" v-if="this.userInfo.menus.订阅政策 == '1'">订阅政策</el-menu-item>
            <el-menu-item index="/user/centerCollect" v-if="this.userInfo.menus.收藏政策 == '1'">收藏政策</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" v-if="this.userInfo.menus.设置 == '1'">
          <template slot="title">
            <span>设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/setInfo" v-if="this.userInfo.menus.用户信息 == '1'">用户信息</el-menu-item>
            <el-menu-item index="/user/setPassword" v-if="this.userInfo.menus.修改密码 == '1'">修改密码</el-menu-item>
            <el-menu-item index="/user/setSubscribe" v-if="this.userInfo.menus.订阅设置 == '1'">订阅设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="this.userInfo.menus.政策发布设置 == '1'">
          <template slot="title">
            <span>政策发布设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/releaseNew" v-if="this.userInfo.menus.发布政策 == '1'">发布政策</el-menu-item>
            <el-menu-item index="/user/releaseWait" v-if="this.userInfo.menus.待处理政策 == '1'">待处理政策</el-menu-item>
            <el-menu-item index="/user/releaseAlready" v-if="this.userInfo.menus.已处理政策 == '1'">已处理政策</el-menu-item>
            <el-menu-item index="/user/releaseNo" v-if="this.userInfo.menus.不处理政策 == '1'">不处理政策</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" v-if="this.userInfo.menus.网站问题汇总 == '1'">
          <template slot="title">
            <span index="/user/releaseNew" >网站问题汇总</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/problem" v-if="this.userInfo.menus.网站问题汇总 == '1'">网站问题汇总</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-if="this.userInfo.menus.系统管理 == '1'">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/AdminUser" v-if="this.userInfo.menus.用户管理 == '1'">用户管理</el-menu-item>
            <el-menu-item index="/user/AdminType" v-if="this.userInfo.menus.字典类型 == '1'">字典类型</el-menu-item>
            <el-menu-item index="/user/AdminDictionaries" v-if="this.userInfo.menus.数据字典 == '1'">数据字典</el-menu-item>
            <el-menu-item index="/user/AdminRole" v-if="this.userInfo.menus.角色管理 == '1'">角色管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" v-if="this.userInfo.menus.系统配置 == '1'">
          <template slot="title">
            <span>系统配置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/picture" v-if="this.userInfo.menus.首页图片 == '1'">首页图片</el-menu-item>
            <el-menu-item index="/user/link" v-if="this.userInfo.menus.友情链接 == '1'">友情链接</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7" v-if="this.userInfo.menus.登录日志 == '1'">
          <template slot="title">
            <span>登录日志</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/journal" v-if="this.userInfo.menus.登录日志 == '1'">登录日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import '@/assets/style/sideMenu.scss'
export default {
  name: "el-side-menu",
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if(localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
  },
  methods: {

  },
  computed: {
    getActive() {
      let path = this.$route.path;
      if(path == '/user/centerSubscribe'){
        return '/user/centerSubscribe';
      } else if(path == '/user/centerCollect') {
        return '/user/centerCollect';
      } else if(path == '/user/setInfo') {
        return '/user/setInfo';
      } else if(path == '/user/setPassword') {
        return '/user/setPassword';
      } else if(path == '/user/setSubscribe') {
        return '/user/setSubscribe';
      } else if(path == '/user/releaseWait') {
        return '/user/releaseWait';
      } else if(path == '/user/releaseAlready') {
        return '/user/releaseAlready';
      } else if(path == '/user/releaseNo') {
        return '/user/releaseNo';
      }else if(path == '/user/releaseNew') {
        return '/user/releaseNew';
      }else if(path == '/user/problem') {
        return '/user/problem';
      }else if(path == '/user/picture') {
        return '/user/picture';
      }else if(path == '/user/link') {
        return '/user/link';
      }else if(path == '/user/journal') {
        return '/user/journal';
      }else if(path == '/user/adminUser') {
        return '/user/adminUser';
      }else if(path == '/user/adminType') {
        return '/user/adminType';
      }else if(path == '/user/adminDictionaries') {
        return '/user/adminDictionaries';
      }else if(path == '/user/adminRole') {
        return '/user/adminRole';
      }
    }
  }
}
</script>

