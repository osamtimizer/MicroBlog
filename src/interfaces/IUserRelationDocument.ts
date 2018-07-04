import mongoose from 'mongoose'

export default interface IUserRelationDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId
    followUserId: mongoose.Schema.Types.ObjectId
}