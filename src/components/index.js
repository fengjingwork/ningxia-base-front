const config = {
  header: require('@/components/Header'),
  footer: require('@/components/Footer'),
  nav: require('@/components/Nav'),
  slide: require('@/components/Slide'),
  list: require('@/components/List'),
  listTitle: require('@/components/List/title'),
  policyType: require('@/views/home/components/PolicyType'),
  crumbs: require('@/components/Crumbs'),
  sideList: require('@/components/Side/SideList.vue'),
  sideSet: require('@/components/Side/SideSet.vue'),
  table: require('@/components/Table'),
  screen: require('@/components/Screen'),
  pagination: require('@/components/Pagination'),
  sideMenu: require('@/components/sideMenu'),
  top: require('@/components/top'),
}

const Tools = {
  install: (Vue) => {
    for (let i in config) {
      if (config[i].name) {
        Vue.component(config[i].name, config[i]);
      } else {
        Vue.component(config[i].default.name, config[i].default);
      }
    }
  }
}

export default Tools
