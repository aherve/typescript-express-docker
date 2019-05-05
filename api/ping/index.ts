import * as controller from './ping.controller'
import { Router } from 'express'

const router = Router()

router.get('/', controller.ping)
router.get('/fail', controller.fail)

export default router
