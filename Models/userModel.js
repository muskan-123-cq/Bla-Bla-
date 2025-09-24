const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Pass: { type: String, required: true },
    role: { type: String, required: true, enum: ['passenger', 'driver'] }
});

module.exports = mongoose.model('User', userSchema);