import mongojs from 'mongojs'

const db = mongojs(process.env.DB_URL)
const cards = db.collection('cards')

export const index = {
  async get (req, res) {
    try {
      cards.find({
        'legalities.commander': 'Legal'
      }, (err, values) => {
        if (err) {
          return res.status(500).send(err)
        }
        return res.status(200).json(values)
      })
    } catch (err) {
      console.error('error fetching cards: ', err)
      return res.status(500).send('error fetching cards: ', err)
    }
  },

  // async query (req, res) {
  //   cards.find(req.query, (err, values) => {
  //     if (err) {
  //       return res.handleServerError()
  //     }
  //     return res.status(200).json(values)
  //   })
  // },

  async query (req, res) {
    const skip = parseInt(req.query.skip) || 0
    const limit = parseInt(req.query.limit) || 50
    let count = 0

    const query = cards
      .find(req.query || {})
      .limit(limit)
      .skip(skip)

    cards.find(req.query).count((err, val) => {
      if (err) res.handleServerError()
      count = val
    })

    query.toArray((err, docs) => {
      if (err) {
        console.error('error getting cards: ', err)
        res.handleServerError()
      }

      return res.json(response(count, skip, limit, docs))
    })
  }
}

function response (count, skip, limit, data) {
  return {
    count: count,
    skip: skip,
    limit: limit,
    data: data
  }
}
