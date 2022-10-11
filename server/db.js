import mongoose from 'mongoose'

const mongoConn = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
  user: process.env.MONGO_USER || 'root',
  pass: process.env.MONGO_PASS || 'passw0rd',
  dbName: process.env.MONGO_DB_NAME || 'mernfullstack',
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(mongoConn.uri, {
      useNewUrlParser: true,
      user: mongoConn.user,
      pass: mongoConn.pass,
      dbName: mongoConn.dbName,
    })
    console.log('MongoDB connection is successful')
  } catch (err) {
    console.log(`error connecting to the database: ${err}`)
  }
}

export default ConnectDB
