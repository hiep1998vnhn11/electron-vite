import { createStore } from 'vuex'
import getters from './getters'
import modules from './modules'
import state from './state'
import mutations from './mutations'

export default createStore({
  modules,
  getters,
  state,
  mutations,
})
