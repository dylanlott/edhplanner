<template>
    <v-layout>
        <v-container fluid>
            <v-layout row wrap justify-space-around>
                <v-flex>
                    <h1 class="display-2">Decks</h1>
                </v-flex>
                <v-flex>
                    <v-btn to="/decks/create/">
                       <v-icon>add</v-icon> New
                    </v-btn>
                </v-flex>
                <v-flex xs12 sm6 lg4>
                    <v-card :to="{name: 'decks-id', params: {id: deck._id}}" :key="index" v-for="(deck, index) in decks">
                        <v-card-title class="display-1">{{ deck.name }}</v-card-title>
                        <v-card-text>{{ deck.commander }}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'decks',
    computed: mapState({
        decks: state => state.lists.decks
    }),
    created() {
        this.$store.dispatch('fetchAllDecks')
    }
}
</script>
