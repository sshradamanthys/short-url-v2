import { User } from '../models/User.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email }) // exists ?
    if (user) throw new Error('email already exists in the db')

    user = new User({ email, password }) // create a new user
    await user.save()

    // jwt
    return res.status(201)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message })
  }
}
export const login = (req, res) => res.json({ msg: 'logged in' })
