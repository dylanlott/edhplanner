<template>
<v-layout>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex>
              <h1>Create</h1>
            </v-flex>
            <v-flex>
                <v-form v-model="valid" ref="createForm">
                    <v-text-field 
                       v-model="deck.name" 
                       label="Name Your Deck"
                       :rules="[v => !!v]"
                    ></v-text-field>
                    <v-text-field
                        v-model="search"
                        label="Pick A Commander"
                    ></v-text-field> 

                    <code>
                        {{ deck }}
                    </code>

                    <v-list dense>
                        <v-list-tile 
                        :key="index" 
                        @click="choose(commander)"
                        v-for="(commander, index) in commanders">
                            {{ commander }}
                        </v-list-tile>
                    </v-list>
                    <v-btn
                        @click="submit(deck)" 
                        color="primary"
                    >Submit</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</v-layout>
</template>

<script>
export default {
    name: 'create-deck',
    data () {
        return {
            valid: false,
            deck: {
                name: '',
                commander: '',
            },
            loading: false,
            items: [],
            search: null,
            select: null,
            commanders: [
                'Selesnya'
            ]
        }
    },
    watch: {
        search (val) {
            console.log('value: ', val)
            val && val !== this.select && this.querySelections(val)
        }
    },
    methods: {
        querySelections (v) {
            // axios.get('/cards/search', { params: { name: this.search }})
            // .then((results) => {
            //     console.log('results', results)
            // })
            this.items = this.commanders.filter(e => {
                return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })
            console.log(this.items)
            this.loading = false
        },
        choose (commander) {
            console.log(commander)
            this.deck.commander = commander
        },
        submit (deck) {
            this.$store.dispatch('deck/createDeck', deck)
            window.location.href("/decks")
        }
    }
}
</script>
<style>

</style>
