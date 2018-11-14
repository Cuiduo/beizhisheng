import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    hospitalId: '',
    hospitalName: '',
    hospitalData: [],
    roles: '',
    userId: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.useId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_HOSPITALID: (state, hospitalId) => {
      state.hospitalId = hospitalId
    },
    SET_HOSPITALNAME: (state, hospitalName) => {
      state.hospitalName = hospitalName
    },
    SET_HOSPITALDATA: (state, hospitalData) => {
      state.hospitalData = hospitalData
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          setToken(response.token)
          commit('SET_TOKEN', response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_ROLES', data.authority)
          commit('SET_NAME', data.userName)
          commit('SET_HOSPITALID', data.hospitalId)
          commit('SET_HOSPITALDATA', data.hospitalTestTimes)
          commit('SET_HOSPITALNAME', data.hospitalName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_USERID', data.userId)
          Cookies.set('hospitalId', data.hospitalId)
          Cookies.set('userId', data.userId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
