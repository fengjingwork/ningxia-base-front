import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {    //函数集合
    add(state, data) {
      if (data.child) {
        if (!typeof state[data.key] == 'object') {
          state[data.key] = {};
        }
        state[data.key][data.child] = data.data;
      } else {
        state[data.key] = data.data;
      }
    },
    del(state, data) {
      if (data.child) {
        delete state[data.key][data.child];
      } else {
        delete state[data.key];
      }
    },
    read(state, key) {
      state[key] = JSON.parse(sessionStorage.getItem(key));
    }
  },
  actions: {
    addData({commit}, data) {
      commit('add', data);
      if(data.storage == 'session') {
        sessionStorage.setItem(data.key, JSON.stringify(this.state[data.key]));
      } else if(data.storage == 'local') {
        localStorage.setItem(data.key, JSON.stringify(this.state[data.key]));
      }
    },
    delData({commit}, data) {
      commit('del', data);
    },
    readData({commit}, key) {
      commit('read', key);
    }
  }
})

export default store
