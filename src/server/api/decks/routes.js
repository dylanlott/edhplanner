import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { index, detail } from './controllers'

const router = Router()

router.route('/')
    .all(authenticate())
    .post(index.create)
    .get(index.get)

router.route('/:id')
    .all(authenticate())
    .get(detail.get)

export default router