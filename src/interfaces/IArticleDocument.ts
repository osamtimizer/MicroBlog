import mongoose from 'mongoose';
import ITagDocument from './ITagDocument';
import IUserDocument from './IUserDocument';

export default interface IArticleDocument extends mongoose.Document {
    title: string
    user: mongoose.Schema.Types.ObjectId,
    content: string
    tags: Array<mongoose.Schema.Types.ObjectId>,
    created_at: Date
    updated_at: Date
}