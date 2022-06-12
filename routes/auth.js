import { Router } from 'express'
import { login, register, test } from '../controllers/auth.js'
import { body } from 'express-validator'
import { validateForm } from '../middlewares/validateForm.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = Router()

const email = body('email', 'Invalid email format')
  .trim()
  .isEmail()
  .normalizeEmail()
const password = body('password', 'Min 6 characters')
  .trim()
  .isLength({ min: 6 })

router.post('/register', email, password, validateForm, register)

router.post('/login', email, password, validateForm, login)

router.get('/test', requireToken, test)

export default router
