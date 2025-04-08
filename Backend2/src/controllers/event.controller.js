
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
const path = require('path');


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

    const event = new Event({
      name,
      description,
      imageUrl,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      event: req.params.eventId
    });
    // Update the event's services array
    await Event.findByIdAndUpdate(
      req.params.eventId,
      { $push: { services: service._id } }
    );
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  getAllEvents, 
  createEvent, 
  updateEvent, 
  getEventServices, 
  createService 
};