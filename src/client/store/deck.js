import axios from '~/plugins/axios'

export const state = () => {
    return {
        name: '',
        cards: [],
        tags: [],

        loading: false,
        error: '',
    }
}

export const mutations = {
    CREATE_DECK_REQUEST (state) {
        console.log('creating deck...')
    },

    CREATE_DECK_SUCCESS (state, deck) {
        console.log('created deck', deck)
    },

    CREATE_DECK_FAILURE (state, err) {
        state.loading = false
        state.error = err
        console.error(err.response.data)
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
}