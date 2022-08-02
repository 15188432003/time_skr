import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import common from './modules/common'
import route from './modules/route'
import shopCar from './modules/shopCar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {

    user,
    common,
    route,
    shopCar

  },
  getters
})
