import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//导出四个对象,让外部可以引用
export default new Vuex.Store({
  state:{
    count:22,
	demolist:"",
	demolist2:"",
  },
  getters:{
    evenOrOdd(state){
        return state.count % 2===0 ? "偶数" : "奇数"
    }
  },
  actions:{
    increment({commit}){
      commit('Aincrement')
    },
  },
  mutations:{
    Aincrement(state){
      state.count++
    },
    Bincrement(state){
      state.count--
    }
  }
})
