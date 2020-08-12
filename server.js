const { json } = require('express')
const express = require('express')
const userRouter = require('./users/userRouter')
const logger = require('./middleware/logger')

const server = express()

server.use(express.json())
server.use(logger())

server.use(userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
