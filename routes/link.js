import { Router } from 'express'
import { memoryToken } from '../middlewares/requireToken.js'
import { getLinks } from '../controllers/link.js'

const router = Router()

// getAll links
router.get('/', memoryToken, getLinks)

// get one link by ID
router.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  res.send({ msg: 'all links' })
})

// router.post('/', (req, res) => res.send({ msg: 'all links' }))
// router.patch('/:id', (req, res) => res.send({ msg: 'all links' }))
// router.delete('/', (req, res) => res.send({ msg: 'all links' }))

export default router
