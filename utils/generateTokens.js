import jwt from 'jsonwebtoken'

export const memoryToken = (uid) => {
  const expiresIn = 60 * 15 // 15 minutes

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn }
  } catch (error) {
    console.log(error)
  }
}

// response is needed
export const cookieToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30 * 1000

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn
    })

    // creating a cookie with token info
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === 'development'),
      expires: new Date(Date.now() + expiresIn)
    })
  } catch (error) {
    console.log(error)
  }
}
