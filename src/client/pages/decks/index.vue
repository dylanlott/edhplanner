<template>
    <v-layout>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex>
                    <h1 class="display-2">Decks</h1>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex>
                    <v-card :key="index" v-for="(deck, index) in decks">
                        {{ deck }}
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
