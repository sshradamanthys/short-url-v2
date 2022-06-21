import { Link } from '../models/Link.js'
import { nanoid } from 'nanoid'

export const createLink = async (req, res) => {
  try {
    let { original } = req.body
    if (!original.startsWith('https://')) {
      original = 'https://' + original
    }

    const link = await new Link({ original, short: nanoid(6), uid: req.uid })
    await link.save()
    res.status(201).json({ link })
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid })
    res.json({ links })
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}

export const getLink = async (req, res) => {
  try {
    const { short } = req.params
    const link = await Link.findOne({ short })

    if (!link)
      return res
        .status(404)
        .json({ error: 'this link does not exist in the db' })

    return res.json({ original: link.original })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: 'Server error' })
  }
}

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params
    let { original } = req.body
    if (!original.startsWith('https://')) {
      original = 'https://' + original
    }

    const link = await Link.findById(id)

    if (!link) {
      return res
        .status(404)
        .json({ error: 'this link does not exist in the db' })
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    link.original = original

    await link.save()

    return res.json({ msg: 'link updated' })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'id format incorrect' })
    return res.status(500).json({ error: 'Server error' })
  }
}

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)
    if (!link) {
      return res
        .status(404)
        .json({ error: 'this link does not exist in the db' })
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await link.remove()

    return res.json({ msg: 'link deleted' })
  } catch (error) {
    console.log(error.kind)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'id format incorrect' })
    return res.status(500).json({ error: 'Server error' })
  }
}
