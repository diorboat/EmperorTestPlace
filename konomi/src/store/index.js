import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user:'蛤蛤蛤蛤蛤蛤蛤蛤蛤',
    map:[],
  },
  mutations: {
    edit(state,msg){
      state[msg.name] = msg.value
    }
  },
  actions: {
  },
  getters:{
    user:state=>state.user +'先生祝你福如东海寿比南山财源广进',
    nmsl(state){
      return state.user +'先生nmsl'
    },
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
