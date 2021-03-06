const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    trip_id: {
        type: Number,
        unique: true
    },
    price: {
        type: Number
    }
}, { timestamps: true });

module.exports = model('trip', tripSchema);
