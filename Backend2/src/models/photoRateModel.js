
const mongoose = require('mongoose');

const photoRateSchema = new mongoose.Schema({
  minPhotos: { type: Number, required: true },
  maxPhotos: { type: Number, required: true },
  pricePerPhoto: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PhotoRate', photoRateSchema);
