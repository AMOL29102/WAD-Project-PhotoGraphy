
// const Event = require('../models/eventModel');

// const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createEvent = async (req, res) => {
//   try {
//     const event = await Event.create(req.body);
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!event) return res.status(404).json({ message: 'Event not found' });
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { getAllEvents, createEvent, updateEvent };
const Event = require('../models/eventModel');
const Service = require('../models/serviceModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createEvent = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);

    let imageUrl = null;
    if (req.files && req.files.image) {
      console.log('Uploading file to Cloudinary:', req.files.image);

      // Convert buffer to a base64 string for Cloudinary upload
      const base64Image = req.files.image.data.toString('base64');
      const dataUri = `data:${req.files.image.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'events',
      });
      imageUrl = result.secure_url;
    } else {
      console.log('No image file provided');
    }

    const event = new Event({
      name,
      description,
      imageUrl,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error('Error in createEvent:', error);
    res.status(400).json({ message: error.message });
  }
};

// Other functions remain unchanged
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEventServices = async (req, res) => {
  try {
    const services = await Service.find({ event: req.params.eventId }).populate('event');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      event: req.params.eventId,
    });
    await Event.findByIdAndUpdate(req.params.eventId, { $push: { services: service._id } });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await Service.deleteMany({ event: req.params.id });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await Event.findByIdAndUpdate(req.params.eventId, {
      $pull: { services: req.params.serviceId },
    });
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  getEventServices,
  createService,
  deleteEvent,
  deleteService,
};