const fs = require('fs')
const mongojs = require('mongojs')
var db = mongojs('edhplanner', ['cards'])
let rawdata = fs.readFileSync('cards/AllCards.json')
let cards = JSON.parse(rawdata)

Object.keys(cards).forEach(key => {
  // console.log(key, cards[key])
  const card = cards[key]
  db.cards.save(card, (err, c) => {
    if (err) {
      console.error('error adding card: ', err)
    }
    console.log('added: ', c)
  })
})
