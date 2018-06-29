import mongoose from 'mongoose';
import IUserDocument from './IUserDocument';
export default interface ITagDocument extends mongoose.Document {
    name: string
    user: mongoose.Schema.Types.ObjectId
}