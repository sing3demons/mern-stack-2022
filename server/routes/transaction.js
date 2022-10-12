import { Router } from 'express'
import Transaction from '../models/transaction.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 })

    res.status(200).json({ data: transaction })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { amount, description, date } = req.body
  const transaction = new Transaction({
    amount,
    description,
    date,
  })

  await transaction.save()

  res.status(201).json({ message: 'Success' })
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    await Transaction.findByIdAndRemove(id)

    res.status(200).json({ message: 'success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default router
