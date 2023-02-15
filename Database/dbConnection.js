const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("dataBase connection successful");
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err);
  });
