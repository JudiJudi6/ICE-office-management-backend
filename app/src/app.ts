import express from "express"

import loginRouter from './routes/loginRouter'
import officeRouter from "./routes/officeRouter"
//const singUpRouter = require('./routes/singUpRouter')

const app = express()

app.use(express.json())

app.use('/api/v1/login', loginRouter)
app.use('/api/v1/office', officeRouter)
//app.use('/api/v1/sing-up', singUpRouter)

export default app