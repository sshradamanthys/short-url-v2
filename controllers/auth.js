import { User } from '../models/User.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email }) // exists ?
    if (user) throw new Error('email already exists in the db')

    user = new User({ email, password }) // create a new user
    await user.save()

    // jwt
    return res.status(201).json({ msg: 'user saved' })
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

    // jwt
    return res.status(200).json({ msg: 'user logged in' })
  } catch (error) {
    console.log(error.message)
    res.status(403).json({ error: error.message })
  }
}
