const { Schema, model } = require('mongoose');
const { USER, OAUTH } = require('../entities/dataBaseTables.enum');

const OAuthSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  [USER]: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  },
}, { timestamps: true });

module.exports = model(OAUTH, OAuthSchema);
