// models/User.js
const mongoose = require('../db.js');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  email: String,
  dob: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
