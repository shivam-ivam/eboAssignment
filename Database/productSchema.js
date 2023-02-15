const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    itemName:String,
    cost: Number
  });

const Products = mongoose.model('Product', productSchema);


module.exports = Products;