import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
const { Schema, model } = mongoose

const UserSchema = new Schema({
  email: {
    index: { unique: true },
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(user.password, salt)
    next()
  } catch (error) {
    console.log(error)
    throw new Error('Error: hashing password')
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password)
}

export const User = model('User', UserSchema)
