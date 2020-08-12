const express = require('express')
const { validateUser, validateUserID } = require('../middleware/user')
const { validatePost } = require('../middleware/post')

const router = express.Router()

router.post('/', validateUser(), (req, res) => {
  // do your magic!
})

router.post('/:id/posts', validateUserID(), (req, res) => {
  // do your magic!
})

router.get('/', (req, res) => {
  // do your magic!
})

router.get('/:id', validateUserID(), (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', validateUserID(), (req, res) => {
  // do your magic!
})

router.delete('/:id', validateUserID(), (req, res) => {
  // do your magic!
})

router.put('/:id', validateUserID(), (req, res) => {
  // do your magic!
})

module.exports = router
