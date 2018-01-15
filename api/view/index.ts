import * as controller from './view.controller'
import { Router } from 'express'

const router = Router()

router.get('/await', controller.awaitIndex)
router.get('/promise', controller.promiseIndex)

export default router
