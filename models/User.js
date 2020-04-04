const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  words_count: { type: Number, required: true, default: 0 },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
