const express = require("express");
const app = express();
const env = require("dotenv");
const bodyParser = require("body-parser");
env.config({ path: "./config.env" });
app.use(bodyParser.json());
require("./Database/dbConnection");
const User = require("./Database/userSchema");
const Orders = require("./Database/orderSchema");
const Products = require("./Database/productSchema");

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    return res.status(201).json("User saved successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.post("/addProduct", async (req, res) => {
  const { itemName, cost } = req.body;
  if (!itemName || !cost) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    const product = new Products({
      itemName,
      cost,
    });
    await product.save();
    return res.status(201).json("Product saved successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.post("/orders", async (req, res) => {
  const { email, item, paymentStatus, shipmentStatus } = req.body;
  if (!email || !item || !paymentStatus || !shipmentStatus) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    itemDetail = await Products.findOne({ itemName: item });
    userDetail = await User.findOne({ email: email });
    if (!itemDetail) {
      return res.status(401).json({ error: "item is not available" });
    }
    if (!userDetail) {
      return res.status(401).json({ error: "user is not available" });
    }
    const order = new Orders({
      user: userDetail._id,
      item: itemDetail._id,
      cost: itemDetail.cost,
      paymentStatus,
      shipmentStatus,
    });
    await order.save();
    return res.status(201).json("Order status saved successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is runnign on port ${process.env.PORT}`);
});
