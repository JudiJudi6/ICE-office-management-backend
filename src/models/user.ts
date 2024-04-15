import mongoose from 'mongoose';

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

const userModel = mongoose.model('User', userSchema); 

export default userModel; 