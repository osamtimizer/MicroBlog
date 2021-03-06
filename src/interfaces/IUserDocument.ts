import mongoose from 'mongoose'

export default interface IUserDocument extends mongoose.Document {
    userId: String
    firstName: String
    lastName: String
    email: String
    password: String
    created_at: Date
    updated_at: Date
}
