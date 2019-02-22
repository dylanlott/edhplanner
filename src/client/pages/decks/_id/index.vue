<template>
    <v-layout column justify-center>
        <v-card width="100%">
            <v-card-title class="display-1">{{ deck.name }}</v-card-title>
            <v-card-text>
                <v-chip>{{ deck.commander }}</v-chip>
                <v-chip>{{ deck.cards.length }} cards</v-chip>

                <!-- Card List -->
                <v-list>
                    <v-list-tile :key="index" v-for="(card, index) in deck.cards"></v-list-tile>
                    <v-list-tile v-if="deck.cards.length === 0">This deck doesn't have any cards in it yet.</v-list-tile>
                    <v-subheader>Commander</v-subheader>
                    <v-subheader>Creatures</v-subheader>
                    <v-subheader>Planeswalkers</v-subheader>
                    <v-subheader>Enchantments</v-subheader>
                    <v-subheader>Instants, Spells, Sorcerys, etc...</v-subheader>
                    <v-subheader>Artifacts</v-subheader>
                    <v-subheader>Non Basic Lands</v-subheader>
                    <v-subheader>Lands</v-subheader>
                </v-list>

                <!-- Deck Composition --> 
                <v-layout row wrap justify-space-around>

                <v-card
                class="mx-auto"
                color="orange darken-2"
                dark
                max-width="400">
                <v-card-title>Number of Cards</v-card-title>
                    <v-card-text>
                        {{ deck.cards.length }}
                    </v-card-text> 
                </v-card>

                <v-card 
                class="mx-auto"
                max-width="400" 
                dark
                color="cyan darken-1">
                    <v-card-title>Deck Colors</v-card-title>
                    <v-card-text></v-card-text>
                </v-card>

                </v-layout>

            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'deck-details',
    computed: mapState({
        deck: state => state.deck.details
    }),
    created () {
        this.$store.dispatch('deck/getDeckDetails', this.$route.params.id)
    }
}
</script>

<style>

</style>
