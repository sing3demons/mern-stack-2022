import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import ConnectDB from './db.js'
import transactionRouter from './routes/transaction.js'

const PORT = 4000
const app = express()
await ConnectDB()

app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/transaction', transactionRouter)

app.listen(PORT, () =>
  console.log(`Server is running as  http://127.0.0.1:${PORT}`)
)
