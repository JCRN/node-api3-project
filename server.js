const { json } = require('express')
const express = require('express')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const logger = require('./middleware/logger')

const server = express()

server.use(express.json())
server.use(logger())

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: `Welcome ${process.env.COHORT}`,
      fact: `${process.env.FUN_FACT}`,
    })
})

module.exports = server
