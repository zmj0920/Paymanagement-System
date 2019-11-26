import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const user = {
  state: {
    token: '',
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    // 登录
    Login ({ commit }, data) {
      const result = data.data
      Vue.ls.set(ACCESS_TOKEN, result.jwt, 7 * 24 * 60 * 60 * 1000)
      commit('SET_TOKEN', result.jwt)
      commit('SET_INFO', result.user)
    },

    // 登出
    Logout ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_INFO', [])
      Vue.ls.remove(ACCESS_TOKEN)
    }
  }
}
export default user
