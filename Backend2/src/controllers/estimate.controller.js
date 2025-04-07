// estimationController.js
import Service from '../models/serviceModel'
const estimatePrice = async (req, res) => {
    try {
      const service = await Service.findById(req.params.serviceId);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      const { peopleCount } = req.body;
      const basePeople = service.peopleToShoot || 100; // Default to 100 if not set
      const basePrice = service.price;
  
      // Calculate price multiplier based on people count
      const peopleMultiplier = Math.ceil(peopleCount / basePeople);
      const estimatedPrice = basePrice * peopleMultiplier;
  
      res.status(200).json({ 
        estimatedPrice,
        basePeople,
        basePrice,
        peopleMultiplier 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = estimatePrice