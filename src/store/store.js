import Vue from "vue"
import Vuex from "vuex"
import todoApp from './modules/todoApp'

Vue.use(Vuex)

// 앱이 비대해져서 1개의 store로는 관리가 힘들어질 때를 대비해서
// modules 속성 사용
export const store = new Vuex.Store({
  modules: {
    todoApp
  }
})
