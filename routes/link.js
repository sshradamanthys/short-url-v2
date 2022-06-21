import { Router } from 'express'
import { memoryToken } from '../middlewares/requireToken.js'
import { validateLink } from '../middlewares/validateLink.js'
import { validateParam } from '../middlewares/validateParam.js'
import {
  createLink,
  getLink,
  getLinks,
  updateLink,
  deleteLink
} from '../controllers/link.js'

const router = Router()

// create one link
router.post('/', memoryToken, validateLink, createLink)

// get one link by short url
router.get('/:short', getLink)

// getAll links
router.get('/', memoryToken, getLinks)

// update one link
router.patch('/:id', memoryToken, validateParam, validateLink, updateLink)

// delete one link
router.delete('/:id', memoryToken, validateParam, deleteLink)

export default router
