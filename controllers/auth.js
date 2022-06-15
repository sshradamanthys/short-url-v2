import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import { memoryToken, cookieToken } from '../utils/generateToken.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email }) // exists ?
    if (user) throw new Error('email already exists in the db')

    user = new User({ email, password }) // create a new user
    await user.save()

    // token & expire time
    const { token, expiresIn } = memoryToken(user.id)

    cookieToken(user.id, res)

    return res.status(201).json({ token, expiresIn })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email }) // exists ?
    if (!user) throw new Error('email does not exist in the db')

    const match = await user.comparePassword(password)
    if (!match) throw new Error('incorrect credentials')

    // token & expire time
    const { token, expiresIn } = memoryToken(user.id)

    cookieToken(user.id, res)

    return res.json({ token, expiresIn })
  } catch (error) {
    console.log(error.message)
    res.status(403).json({ error: error.message })
  }
}

export const test = async (req, res) => {
  try {
    const user = await User.findById(req.uid)
    return res.json({ email: user.email })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

export const refresh = (req, res) => {
  try {
    const { token, expiresIn } = memoryToken(req.uid)
    return res.json({ token, expiresIn })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

export const logout = (req, res) => {
  res.clearCookie('cookieToken')
  return res.json({ msg: 'log out' })
}
