const posts = require('../posts/postDb')

function validatePost() {
  return (req, res, next) => {
    const { text } = req.body
    if (!req.body) {
      res.status(400).json({ message: 'Missing post data' })
    } else if (!text) {
      res.status(400).json({ message: 'Missing required text field' })
    } else {
      next()
    }
  }
}

function validatePostID() {
  return (req, res, next) => {
    const { id } = req.params
    posts
      .getById(id)
      .then((post) => {
        if (post) {
          req.post = post

          next()
        } else {
          res.status(400).json({ message: 'Invalid post ID' })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ errorMessage: 'Error validating post' })
      })
  }
}

module.exports = { validatePost, validatePost }
