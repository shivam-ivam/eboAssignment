const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    user: String,
    item: String,
    cost: Number,
    paymentStatus: String,
    shipmentStatus: String
  });

const Orders = mongoose.model('Order', orderSchema);


module.exports = Orders;