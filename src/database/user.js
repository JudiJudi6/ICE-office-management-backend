const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User must have a password']
    }
});

const User = mongoose.model('User', userSchema); // Poprawienie eksportu modelu

module.exports = User; // Eksport modelu użytkownika