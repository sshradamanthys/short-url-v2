import { Router } from 'express'
import { redirectLink } from '../controllers/redirect.js'

const router = Router()

// example for Backend Redirect
router.get('/:short', redirectLink)

export default router
