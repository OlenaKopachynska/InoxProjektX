const { Schema, model } = require('mongoose');

const userRolesEnum = require('../entities/user-roler.enum');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    // select: false
  },
  role: {
    type: String,
    default: userRolesEnum.USER
  }
}, { timestamps: true });

module.exports = model('user', userSchema);
