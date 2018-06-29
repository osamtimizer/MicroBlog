import mongoose from 'mongoose';
import hash from '../modules/hash';
import IUserDocument from '../interfaces/IUserDocument'

const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        min:2,
        max: 255
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },

    email: {
        type: String,
        required: true,
        unique: true,
        min: 2,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    created_at: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
        required: true
    }
});

schema.pre<IUserDocument>('save', function (next) {
    console.log('pre process');
    this.updated_at = new Date();
    if (!this.created_at) this.created_at = new Date();
    const hashed = hash(String(this.password), 'secret')
    this.password = hashed;
    next();
})

const User = <mongoose.Model<IUserDocument>>mongoose.model("User", schema);

export default User