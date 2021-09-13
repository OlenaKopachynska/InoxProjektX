const { Schema, model } = require('mongoose');
const { ACTION_TOKEN, USER } = require('../entities/dataBaseTables.enum');

const actionTokenSchema = new Schema({
  action_token: {
    type: String,
    required: true
  },
  [USER]: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, { timestamps: true });

module.exports = model(ACTION_TOKEN, actionTokenSchema);
