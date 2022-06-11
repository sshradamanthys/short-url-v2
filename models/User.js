import mongoose from 'mongoose'
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

export const User = model('User', UserSchema)
