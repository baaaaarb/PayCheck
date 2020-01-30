import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email:'',
    idoflogged:''

  },
  getters:{
    
  },
  mutations: {
    emailLogin(state, status) {
      state.email = status;
    },
    idofLogged(state, status) {
      state.idoflogged = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
