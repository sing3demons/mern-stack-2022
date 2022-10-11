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

app.get('/transaction', async (req, res) => {
  try {
    const transaction = await Transaction.find({})

    res.status(200).json({ data: transaction })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

app.post('/transaction', async (req, res) => {
  const { amount, description, date } = req.body
  const transaction = new Transaction({
    amount,
    description,
    date,
  })

  await transaction.save()

  res.status(201).json({ message: 'Success' })
})

app.listen(PORT, () =>
  console.log(`Server is running as  http://127.0.0.1:${PORT}`)
)
