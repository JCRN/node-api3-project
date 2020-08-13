const express = require('express')
const users = require('./userDb')
const { validateUser, validateUserID } = require('../middleware/user')

const router = express.Router()

router.post('/', validateUser(), (req, res) => {
  const user = req.body
  users
    .insert(user)
    .then(() => {
      res.status(201).json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        errorMessage:
          'There was an error while saving the user to the database',
      })
    })
})

router.post('/:id/posts', validateUserID(), (req, res) => {
  // do your magic!
})

router.get('/', (req, res) => {
  users
    .get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ errorMessage: 'The users information could not be retrieved' })
    })
})

router.get('/:id', validateUserID(), (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', validateUserID(), (req, res) => {
  const { id } = req.user
  users
    .getUserPosts(id)
    .then((posts) => {
      if (posts.length > 0) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({
          message: 'Posts for the user with the specified ID do not exist',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ errorMessage: 'The posts information could not be retrieved' })
    })
})

router.delete('/:id', validateUserID(), (req, res) => {
  const { id } = req.user
  users
    .remove(id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ errorMessage: 'The user could not be removed' })
    })
})

router.put('/:id', validateUserID(), (req, res) => {
  const { id } = req.user
  const changes = req.body
  users
    .update(id, changes)
    .then(() => {
      res.status(200).json(changes)
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be modified' })
    })
})

module.exports = router
