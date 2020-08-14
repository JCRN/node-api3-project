const express = require('express')
const posts = require('./postDb')

const router = express.Router()

const { validatePostID } = require('../middleware/post')

router.get('/', (req, res) => {
  posts
    .get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: 'The posts information could not be retrieved' })
    })
})

router.get('/:id', validatePostID(), (req, res) => {
  res.status(200).json(req.post)
})

router.delete('/:id', validatePostID(), (req, res) => {
  const { id } = req.post
  posts
    .remove(id)
    .then(() => {
      res.status(200).json({ message: 'The post has been removed' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ errorMessage: 'The post could not be removed' })
    })
})

router.put('/:id', validatePostID(), (req, res) => {
  const { id } = req.post
  const changes = req.body
  posts
    .update(id, changes)
    .then(() => {
      res.status(200).json(changes)
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ errorMessage: 'The post information could not be modified' })
    })
})

module.exports = router
