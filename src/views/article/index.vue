<template>
  <div class="article">
    <el-crumbs :crumbData="crumbData" />

    <div class="art-main">
      <div class="con-box">
        <div class="art-con float-l">
          <div class="art-tab art-part" v-if="artObj.hasAnalysis == 1 && artObj.hasOriginal == 1">
            <el-radio-group v-model="hasAnalysis" @change="">
              <el-radio-button label="">政策原文</el-radio-button>
              <el-radio-button label="1">政策解读</el-radio-button>
            </el-radio-group>
          </div>

          <div class="art-info art-part">
            <div class="art-original" v-if="hasAnalysis == ''">
              <div class="art-tit">
                <span class="art-collect">
                  <el-button
                    type="primary"
                    :icon="artObj.ifCollect === '0' ? 'el-icon-star-off' : 'el-icon-star-on'"
                    size="mini"
                    :plain="artObj.ifCollect === '1' ? false : true"
                    @click="collectAddOrDel('artObj')">
                    {{artObj.collect}}
                  </el-button>
                </span>
                {{artObj.title}}
              </div>
              <div class="art-att">
                <div class="att-item">政策级别：{{artObj.policyClassificationNewStr || '--'}}</div>
                <div class="att-item">发布来源：{{artObj.websiteSourceNewStr || '--'}}</div>
                <div class="att-item">发文系统：{{artObj.sendingSystemStr || '--'}}</div>
                <div class="att-item">政策主题：{{artObj.policyThemeStr || '--'}}</div>
                <div class="att-item">应用类型：{{artObj.applicableRangeStr || '--'}}</div>
                <div class="att-item">适用企业：{{artObj.applicableEnterpriseStr || '--'}}</div>
                <div class="att-item">原文链接：<a :href="artObj.crawlingURL" target="_blank" v-if="artObj.crawlingURL">点击跳转</a> <span v-else>--</span></div>
                <div class="att-item">发文日期：{{artObj.releaseDateStr || '--'}}</div>
                <div class="att-item">截止日期：{{artObj.endDateStr || '--'}}</div>
              </div>
              <div class="art-txt" v-html="artObj.content"></div>
              <span v-if="artObj.annexName">下载附件：</span>
              <a v-if="artObj.annexFullUrl" :href="'/api/policyNewsController/web_downLoad.form?id=' + artObj.id" style="line-height:40px;">
                {{artObj.annexName}}<span v-if="artObj.annexName">.</span>{{artObj.annexSuffix}}
              </a>
            </div>

            <div class="art-read" v-if="hasAnalysis == 1">
              <div class="art-tit">
                <span class="art-collect">
                  <el-button
                    type="primary"
                    :icon="artReadObj.ifCollect === '0' ? 'el-icon-star-off' : 'el-icon-star-on'"
                    size="mini"
                    :plain="artReadObj.ifCollect === '1' ? false : true"
                    @click="collectAddOrDel('artReadObj')">
                    {{artReadObj.collect}}
                  </el-button>
                </span>
                {{artReadObj.title}}
              </div>
              <div class="art-att">
                <div class="att-item">政策级别：{{artReadObj.policyClassificationNewStr || '--'}}</div>
                <div class="att-item">发布来源：{{artReadObj.websiteSourceNewStr || '--'}}</div>
                <div class="att-item">发文系统：{{artReadObj.sendingSystemStr || '--'}}</div>
                <div class="att-item">政策主题：{{artReadObj.policyThemeStr || '--'}}</div>
                <div class="att-item">应用类型：{{artReadObj.applicableRangeStr || '--'}}</div>
                <div class="att-item">适用企业：{{artReadObj.applicableEnterpriseStr || '--'}}</div>
                <div class="att-item">原文链接：<a :href="artReadObj.crawlingURL" target="_blank">点击跳转</a></div>
                <div class="att-item">发文日期：{{artReadObj.releaseDateStr || '--'}}</div>
                <div class="att-item">截止日期：{{artReadObj.endDateStr || '--'}}</div>
              </div>
              <div class="art-txt" v-html="artReadObj.content"></div>
              <span v-if="artReadObj.annexName">下载附件：</span>
              <a v-if="artReadObj.annexFullUrl" :href="'/api/policyNewsController/web_downLoad.form?id=' + artReadObj.id" style="line-height:40px;">
                {{artReadObj.annexName}}<span v-if="artReadObj.annexName">.</span>{{artReadObj.annexSuffix}}
              </a>
            </div>
          </div>
        </div>

        <div class="art-side float-r">
          <div class="side-box">
            <el-side-list :listData="sideListData" :crumbData="crumbData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      crumbData: [],
      artId: '',
      hasAnalysis: '',
      artObj: {},
      artReadObj: {},
      sideListData: [],
    }
  },
  created () {
    //this.crumbData = JSON.parse(localStorage.getItem('crumbs'));
    this.crumbData = this.$store.state.crumbs;
    //this.crumbData.push({channel: 'detail', name: '详情',});
    if(this.$route.query.read) {
      this.hasAnalysis = this.$route.query.read;
    }
    this.artId = this.$route.query.id;
    if(this.$route.query.type == 4 || this.hasAnalysis == '1') {
      this.getArticle(this, this.artId, 'artReadObj');
    } else {
      this.getArticle(this, this.artId, 'artObj');
    }
  },
  methods: {
    /*获取政策原文和解读内容*/
    getArticle(self, id, obj) {
      if(self[obj] != null && self[obj].title == undefined)  {
        self.$axios({
          url: 'public/article',
          type: 'get',
          data: {
            id: id,
            userId: self.userInfo.id
          },
          success: function (res) {
            if(res.code == '2000' && res.data) {
              self[obj] = res.data;
              if(self[obj].ifCollect === '0') {
                self[obj].collect = '收藏';
              } else {
                self[obj].collect = '取消收藏';
              }
            } else {
              self[obj] = null;
            }

            if(obj == 'artObj') {
              self.getArticle(self, res.data.analysisId, 'artReadObj');
              self.getRecommendList(self, self[obj]);
            } else if(obj == 'artReadObj' && res.data.hasOriginal == 1) {
              self.getArticle(self, res.data.originalId, 'artObj');
              //self.getRecommendList(self, self[obj]);
            }
          },
          error: function (err) {
            self[obj] = null;
          }
        })
      }
    },

    /*获取政策推荐列表内容*/
    getRecommendList(self, param){
      self.$axios({
        url: 'public/recommendList',
        type: 'get',
        data: {
          //SendingSystem: param.sendingSystem,
          applicableEnterprise: param.applicableEnterprise,
          applicableRange: param.applicableRange,
          policyTheme: param.policyTheme,
          //policyType: param.policyType,
          page: 1,
          rows: 8,
        },
        success: function (res) {
          if(res.code == '2000' && res.data.items.length != 0) {
            self.sideListData = res.data.items || [];
          }

        },
        error: function (err) {
          self.sideListData = [];
        }
      })
    },

    /*判断是否收藏过*/
    collectAddOrDel(obj) {
      let self = this;
      if(self.userInfo.userShow !== true) {
        self.$router.push({path: '/login'});
      } else {
        if(self[obj].ifCollect === '0') {
          self.addCollect(self, obj);
        } else {
          self.delCollect(self, obj);
        }
      }
    },
    /*收藏操作请求*/
    addCollect(self,obj) {
      self.$axios({
        url: 'collect/add',
        type: 'post',
        data: {
          newsId: self[obj].id,
          userId: self.userInfo.id
        },
        success: function (res) {
          if(res.code == '2000') {
            self[obj].ifCollect = '1';
            self[obj].collect = '取消收藏';
          }
        },
        error: function (err) {}
      })
    },
    /*取消收藏操作请求*/
    delCollect(self,obj) {
      self.$axios({
        url: 'collect/delete',
        type: 'post',
        data: {
          newsId: self[obj].id,
          userId: self.userInfo.id
        },
        success: function (res) {
          if(res.code == '2000') {
            self[obj].ifCollect = '0';
            self[obj].collect = '收藏';
          }
        },
        error: function (err) {}
      })
    }
  }
}
</script>

