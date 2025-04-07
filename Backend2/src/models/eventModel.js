const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  basePrice: { type: Number, default: 20000 },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);