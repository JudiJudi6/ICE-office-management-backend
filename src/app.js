const express = require("express")

const loginRouter = require('./routes/loginRouter')
//const singUpRouter = require('./routes/singUpRouter')

const app = express()

app.use(express.json())

app.use('/api/v1/login', loginRouter)
//app.use('/api/v1/sing-up', singUpRouter)

module.exports = app