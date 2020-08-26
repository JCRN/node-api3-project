const app = require('./server')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})
