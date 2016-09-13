import {Router} from 'express'
import * as controller from './ping.controller'

const router = new Router()

console.log('ping = ', controller.ping)
router.get('/', controller.ping)

export default router
