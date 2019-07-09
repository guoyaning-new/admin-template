import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import app from './modules/app';
import getters from './getters';
import tagsView from './modules/tagsView';

Vue.use(Vuex);

//公用状态部分
const state = {
  isLoading: false,
  networkState: true
};
const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  updateNetworkState(state, payload) {
    state.networkState = payload.networkState;
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    app,
    tagsView
  },
  getters,
  plugins: [createPersistedState()]
});

export default store;
