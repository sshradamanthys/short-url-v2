import { Link } from '../models/Link.js'

export const redirectLink = async (req, res) => {
  try {
    const { short } = req.params
    const link = await Link.findOne({ short })
    if (!link)
      return res
        .status(404)
        .json({ error: 'this link does not exist in the db' })

    return res.redirect(link.original)
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: 'Server error' })
  }
}
