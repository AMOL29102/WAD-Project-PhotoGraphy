
const PhotoRate = require('../models/photoRateModel');

const createPhotoRate = async (req, res) => {
  try {
    const rate = await PhotoRate.create(req.body);
    res.status(201).json(rate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPhotoRates = async (req, res) => {
  try {
    const rates = await PhotoRate.find();
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePhotoRate = async (req, res) => {
  try {
    const rate = await PhotoRate.findByIdAndDelete(req.params.id);
    if (!rate) {
      return res.status(404).json({ message: 'Rate not found' });
    }
    res.status(200).json({ message: 'Rate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPhotoRate, getPhotoRates, deletePhotoRate };
