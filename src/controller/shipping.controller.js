const Shipping = require ('../models/shipping.model');
const errUtil = require ('../utils/error.util');
// Create a new shipping
module.exports.createOne = async (req, res) => {
  try {
    const {shippingId, address, trackingNumber} = req.body;
    const shipping = new Shipping ({shippingId, address, trackingNumber});
    await shipping.save ();
    res.status (201).json (shipping);
  } catch (error) {
    res.status (500).json ({message: 'Failed to create shipping.'});
  }
};

// Get all shippings
module.exports.getAll = async (req, res) => {
  try {
    const shippings = await Shipping.find ();
    res.json (shippings);
  } catch (error) {
    res.status (500).json ({message: 'Failed to fetch shippings.'});
  }
};

// Get a shipping by ID
module.exports.getOne = async (req, res) => {
  try {
    const shipping = await Shipping.findById (req.params.id);
    if (!shipping) {
      throw errUtil ('Shipping not found.', 404, false);
    }
    res.json (shipping);
  } catch (error) {
    res.status (500).json ({message: 'Failed to fetch the shipping.'});
  }
};

// Update a shipping by ID
module.exports.updateOne = async (req, res) => {
  try {
    const {shippingId, address, trackingNumber} = req.body;
    const shipping = await Shipping.findByIdAndUpdate (
      req.params.id,
      {shippingId, address, trackingNumber},
      {new: true}
    );
    if (!shipping) {
      throw errUtil ('Shipping not found.', 404, false);
    }
    res.json (shipping);
  } catch (error) {
    res.status (500).json ({message: 'Failed to update the shipping.'});
  }
};

// Delete a shipping by ID
module.exports.deleteOne = async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndDelete (req.params.id);
    if (!shipping) {
      throw errUtil ('Shipping not found.', 404, false);
    }
    res.status (204).json ({message: 'Successfully deleted'});
  } catch (error) {
    res.status (500).json ({error: 'Failed to delete the shipping.'});
  }
};
