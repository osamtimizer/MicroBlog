import mongoose from 'mongoose'
import IUserRelationDocument from '../interfaces/IUserRelationDocument'

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const UserRelation = <mongoose.Model<IUserRelationDocument>>mongoose.model('UserRelation', schema);
export default UserRelation;