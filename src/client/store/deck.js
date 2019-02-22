import axios from '~/plugins/axios'

export const state = () => {
    return {
        details: {},
        loading: false,
        error: '',
    }
}

export const mutations = {
    CREATE_DECK_REQUEST (state) {
        console.log('creating deck...')
    },

    CREATE_DECK_SUCCESS (state, data) {
        console.log('created deck', data)
    },

    CREATE_DECK_FAILURE (state, err) {
        state.loading = false
        state.error = err
        console.error(err.response.data)
    },

    GET_DECK_REQUEST (state) {
        state.loading = true
    },
    GET_DECK_SUCCESS (state, data) {
        state.loading = false
        state.details = data 
    },
    GET_DECK_FAILURE (state, err) {
        state.error = err
        state.loading = false
    } 
}

export const actions = {
    async createDeck ({ commit }, payload) {
        try {
            commit('CREATE_DECK_REQUEST')
            let { data } = await axios.post('/decks', payload)
            commit('CREATE_DECK_SUCCESS', data)
            commit('notification/SUCCESS', 'Created Deck', { root: true })
        } catch (err) {
            commit('CREATE_DECK_FAILURE', err)
            commit('notification/FAILURE', error.response.data, { root: true })
        }
    },

    async getDeckDetails ({ commit }, id) {
        try {
            commit('GET_DECK_REQUEST')
            let { data } = await axios.get(`/decks/${id}`)
            commit('GET_DECK_SUCCESS', data)
        } catch (err) {
            commit('GET_DECK_FAILURE', err)
            commit('notification/FAILURE', 'Unable to load deck.', { root: true })
        }
    }
}