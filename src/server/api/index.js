import { Router } from 'express'
import mongoose from 'mongoose'
import usersRoutes from './users/routes'
import adminRoutes from './admin/routes'
import deckRoutes from './decks/routes'
import cardRoutes from './cards/routes'
import listEndpoints from 'express-list-endpoints'
import authenticate from '~/middleware/authenticate'
import { handleServerErrors } from 'express-server-error'

const router = Router()

router.use('/', handleServerErrors())
router.use('/users', usersRoutes)
router.use('/decks', deckRoutes)
router.use('/admin', authenticate(), adminRoutes)
router.use('/cards', cardRoutes)

router.get('/', (req, res) => {
  return res.json({
    endpoints: listEndpoints(router),
    mongo: mongoose.connection.readyState
  })
})

export default router
