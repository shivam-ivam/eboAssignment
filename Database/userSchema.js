const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  
userSchema.pre('save', async function (next){
      console.log("pre")
      if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password, 12);
      }
      next();
  });
const User = mongoose.model('User', userSchema);


module.exports = User;