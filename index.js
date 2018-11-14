const express = require('express')
const bodyParser = require('body-parser')
const customersRouter = require('./customers/routes')
const companiesRouter = require('./companies/routes')
const usersRouter = require('./users/routes')
const loginRouter = require('./auth/routes')
const authMiddleware = require('./auth/middleware')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(usersRouter)
  .use(loginRouter)
  .use(authMiddleware)
  .use(customersRouter)
  .use(companiesRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
