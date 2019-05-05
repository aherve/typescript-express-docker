import * as controller from './view.controller'
import { Router } from 'express'

const router = Router()

router.get('/visit', controller.visit)

export default router
