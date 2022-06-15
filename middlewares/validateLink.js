import { body, validationResult } from 'express-validator'
import axios from 'axios'

const validateResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

export const validateLink = [
  body('original', 'Invalid url format')
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith('https://')) {
          value = 'https://' + value
        }
        await axios.get(value)
        return value
      } catch (error) {
        throw new Error('404: URL not found')
      }
    }),
  validateResult
]
