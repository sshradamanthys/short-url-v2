import jwt from 'jsonwebtoken'

export const memoryToken = (req, res, next) => {
  try {
    let token = req.headers.authorization

    if (!token) throw new Error('bearer token required')

    token = token.split(' ')[1]
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)

    req.uid = uid
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ error: error.message })
  }
}

export const cookieToken = (req, res, next) => {
  try {
    const cookieToken = req.cookies.cookieToken
    if (!cookieToken) throw new Error('cookie token is required')

    const { uid } = jwt.verify(cookieToken, process.env.JWT_REFRESH)

    req.uid = uid
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ error: error.message })
  }
}
