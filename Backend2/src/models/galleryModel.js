
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  type: { type: String, enum: ['Photo', 'Video'], required: true },
  numberOfPeople: { type: Number, required: true },
  numberOfDays: { type: Number, required: true },
  estimatedPhotosMin: { type: Number },
  estimatedPhotosMax: { type: Number },
  estimatedAmountMin: { type: Number },
  estimatedAmountMax: { type: Number },
  videoLength: { type: Number },
  mediaUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gallery', gallerySchema);
