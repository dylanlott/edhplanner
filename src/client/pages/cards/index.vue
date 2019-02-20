<template>
    <v-layout>
        <v-container>
            <v-layout row wrap>
                <v-flex><h1>Card Browser</h1></v-flex>
            </v-layout>
        </v-container>
    </v-layout>    
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'cards',
    computed: mapState({
        cards: state => state.lists.cards
    })
}
</script>

<style>

</style>

