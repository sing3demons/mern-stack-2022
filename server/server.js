import express from 'express'
import cors from 'cors'
import ConnectDB from './db.js'
import Transaction from './models/transaction.js'

const PORT = 4000
const app = express()

ConnectDB()

app.use(express.json({}))
app.use(express.urlencoded())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/transaction', async (req, res) => {
  const { amount, description, date } = req.body
  const transaction = new Transaction({
    amount,
    description,
    date,
  })

  await transaction.save()
  // console.log(req.body)
  res.status(201).json({ message: 'Success' })
})

app.listen(PORT, () =>
  console.log(`Server is running as  http://127.0.0.1:${PORT}`)
)
