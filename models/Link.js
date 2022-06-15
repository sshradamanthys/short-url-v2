import mongoose from 'mongoose'

const { Schema, model } = mongoose

const LinkSchema = new Schema({
  original: {
    type: String,
    trim: true,
    required: true
  },

  short: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export const Link = model('Link', LinkSchema)
