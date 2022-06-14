import { body, validationResult } from 'express-validator'

const validateResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

export const validateForm = [
  body('email', 'Invalid email format').trim().isEmail().normalizeEmail(),
  body('password', 'Min 6 characters').trim().isLength({ min: 6 }),
  validateResult
]
