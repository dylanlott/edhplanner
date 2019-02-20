import axios from '~/plugins/axios'
import jwtDecode from 'jwt-decode'

export const state = () => {
  return {
    loading: false,
    lists: {
      users: [],
      decks: [],
      cards: []
    }
  }
}
export const mutations = {
  SET_USER (state, data) {
    state.user.token = data.token
    state.user.isAuthenticated = true
    state.user.username = data.user.username
    state.user.firstName = data.user.firstName
    state.user.lastName = data.user.lastName
    state.user.email = data.user.email
  },
  SET_USERS (state, payload) {
    state.lists.users = payload.users
  },
  FETCH_ALL_USERS_REQUEST () {
    console.log('Fetching all users...')
  },
  FETCH_ALL_USERS_SUCCESS (state, users) {
    state.lists.users = users
    console.log('Fetch all users success!')
  },
  FETCH_ALL_USERS_FAILURE (state, error) {
    state.loading = false
    console.error(error.response.data)
  },
  FETCH_DECKS_REQUEST (state) {
    state.loading = true
  },
  FETCH_DECKS_SUCCESS (state, decks) {
    state.loading = false
    state.lists.decks = decks
  },
  FETCH_DECKS_FAILURE (state) {
    console.error(error.response.data)
  },
  CLEAR_LISTS (state) {
    // set each list to an empty array
    Object.keys(state.lists).forEach(list => {
      state.lists[list] = []
    })
  }
}
export const actions = {
  nuxtServerInit ({ commit, state }, { req }) {
    if (req.cookies.token) {
      let token = req.cookies.token
      let user = jwtDecode(token)
      let data = { user, token }
      commit('SET_USER', data)
    }
  },
  async fetchAllUsers ({ commit, state }) {
    try {
      commit('FETCH_ALL_USERS_REQUEST')
      let { data } = await axios.get('/users')
      commit('FETCH_ALL_USERS_SUCCESS', data)
    } catch (error) {
      commit('FETCH_ALL_USERS_FAILURE', error)
    }
  },
  
  async fetchAllDecks ({ commit }) {
    try {
      commit('FETCH_DECKS_REQUEST')
      let { data } = await axios.get('/decks')
      commit('FETCH_DECKS_SUCCESS', data)
    } catch(err) {
      commit('FETCH_DECKS_FAILURE', err)
    }
  }
}
