import { Link } from '../models/Link.js'

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid })
    res.json({ links })
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}
