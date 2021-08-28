const { Schema, model } = require('mongoose');

const userRolesEnum = require('../configs/user-roler.enum');

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
  },
  role: {
    type: String,
    default: userRolesEnum.USER,
    enum: Object.values(userRolesEnum)
  }
}, { timestamps: true });

module.exports = model('user', userSchema);
