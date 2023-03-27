import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
  },
  state: {
    token: localStorage.getItem('auth') || ''
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('auth', token);
      state.token = token;
    },
    clearToken(state) {
      localStorage.removeItem('auth')
      state.token = null
    }
  },
})

export default store
