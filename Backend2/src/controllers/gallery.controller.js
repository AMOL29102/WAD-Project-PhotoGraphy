
const Gallery = require('../models/galleryModel');

const getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().populate('event');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGalleryByEvent = async (req, res) => {
  try {
    const items = await Gallery.find({ event: req.params.eventId }).populate('event');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllGalleryItems, createGalleryItem, getGalleryByEvent };
