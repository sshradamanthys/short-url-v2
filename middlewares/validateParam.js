import { param, validationResult } from 'express-validator'

const validateResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

export const validateParam = [
  param('id').trim().notEmpty().escape(),
  validateResult
]
