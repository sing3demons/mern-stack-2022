import { model, Schema } from 'mongoose'

const transactionSchema = new Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: new Date() },
  createdAt: { type: Date, default: Date.now },
})

export default new model('transaction', transactionSchema)
