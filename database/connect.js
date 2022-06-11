import mongoose from 'mongoose'

try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('db connected 👍')
} catch (error) {
  console.log('something wrong connecting the db: ' + error)
}
