import { Router } from 'express'
import { login, register, refresh, logout } from '../controllers/auth.js'

import { validateForm } from '../middlewares/validateForm.js'
import { cookieToken, memoryToken } from '../middlewares/requireToken.js'

const router = Router()

router.post('/register', validateForm, register)

router.post('/login', validateForm, login)

router.get('/refresh', cookieToken, refresh)

router.get('/logout', logout)

export default router
