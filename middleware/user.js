const users = require('../users/userDb')

function validateUser() {
  return (req, res, next) => {
    const { name } = req.body
    if (!req.body) {
      res.status(400).json({ message: 'Missing user data' })
    } else if (!name) {
      res.status(400).json({ message: 'Missing required name field' })
    } else {
      next()
    }
  }
}

function validateUserID() {
  return (req, res, next) => {
    const { id } = req.params
    users
      .getById(id)
      .then((user) => {
        if (user) {
          req.user = user

          next()
        } else {
          res.status(400).json({ message: 'Invalid user ID' })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ errorMessage: 'Error validating user' })
      })
  }
}

module.exports = {
  validateUser,
  validateUserID,
}
