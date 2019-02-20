import mongoose from 'mongoose'

const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 250,
        required: true,
    },
    cards: [{
        type: mongoose.Schema.Types.Mixed
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    public: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }],
    commander: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
})

const Deck = mongoose.model('Deck', deckSchema)

export default Deck