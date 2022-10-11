import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const PORT = 4000
const app = express()

const mongoConn = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
  user: process.env.MONGO_USER || 'root',
  pass: process.env.MONGO_PASS || 'passw0rd',
  dbName: process.env.MONGO_DB_NAME || 'mernfullstack',
}

mongoose
  .connect(mongoConn.uri, {
    useNewUrlParser: true,
    user: mongoConn.user,
    pass: mongoConn.pass,
    dbName: mongoConn.dbName,
  })
  .then(() => console.log('MongoDB connection is successful'))
  .catch((err) => console.log(`error connecting to the database: ${err}`))

app.use(express.json({}))
app.use(express.urlencoded())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/transaction', (req, res) => {
  console.log(req.body)
  res.json('Hello World')
})

app.listen(PORT, () =>
  console.log(`Server is running as  http://127.0.0.1:${PORT}`)
)
