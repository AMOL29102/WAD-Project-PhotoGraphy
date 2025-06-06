const User = require('../models/userModel');


const addToWishlist = async (req, res) => {
  // console.log("liijgoerrjgoerijg", req.user.id)

    try {
      const user = await User.findById(req.user.id);
      
      if (!user.wishlist.includes(req.params.serviceId)) {
        user.wishlist.push(req.params.serviceId);
        await user.save();
      }
      
      res.status(200).json({ message: 'Added to wishlist' });
    } catch (error) {
      // console.log(error)
      res.status(500).json({ message: error.message });
    }
  };
  
  const getWishlist = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('wishlist');
      res.status(200).json(user.wishlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { addToWishlist, getWishlist };
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(item => item.toString() !== req.params.serviceId);
    await user.save();
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
