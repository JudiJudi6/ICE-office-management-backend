import mongoose from 'mongoose';
import { OfficeModel } from './officeModel';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    offices: [{type: String}],
    authentication: {
        password: {type: String, required: true, select: false},
        repeatPassword: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    }
});

const userModel = mongoose.model('User', userSchema); 

export default userModel; 

export const getUsers = () => userModel.find();
export const getUserByEmail = (mail: string) => userModel.findOne({ mail });
export const getUserBySessionToken = (sesionToken: string) => userModel.findOne({
    'authentication.sessionToken': sesionToken,
});

export const getUserById = (id: string) => userModel.findById( id );
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>userModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id,values);