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

module.exports = { validatePost }
