const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  hashedPassword: String,
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.hashedPassword;
    // return ret;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;