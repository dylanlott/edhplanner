import Deck from './models'
import User from '../users/models'

export const index = {
    async get (req, res) {
        try {
            let user = await User.findOne({ email: req.user.email })
            let decks = await Deck.find({ user: user._id })
            return res.json(decks)
        } catch (err) {
            return res.handleServerError(err)
        }
    },

    create (req, res) {
        if (!req.body) {
            return res.status(400).send('No data to save.', err)
        }
     
        User.findOne({ email: req.user.email })
        .then((user) => {
            const deck = new Deck(req.body)
            deck.user = user._id

            deck.save(function(err, saved) {
                if (err) {
                    return res.handleServerError(err)
                }
                return res.status(201).json(saved)
            })
        })        
        .catch((err) => {
            return res.handleServerError(err)
        })

    }
}

export const detail = {
    get (req, res) {
        Deck.findOne({
            _id: req.params.id
        })
        .then((deck) => {
            if (!deck) return res.status(404).send('No decks with that ID')
            return res.json(deck)
        })
        .catch((err) => res.handleServerError(err))
    },

    update (req, res) {
        Deck.findByIdAndUpdate(req.params.id, req.body, function (err, updated) {
            console.log('update error: ', err, ', updated: ', updated)
            if (err) return res.handleServerError(err)

            console.log('updated deck:', updated)
            return res.status(204).json(updated)
        })
    }
}