const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  event: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  cameraEquipment: { type: String },
  teamCount: { type: Number },
  peopleToShoot: { type: Number },
  price: { type: Number, required: true },
  isCustom: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', serviceSchema);