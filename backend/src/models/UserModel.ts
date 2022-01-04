import { Schema, model } from 'mongoose'
import { CreateNewUser } from '../utils/interfaces/Users'

const dbCollection = process.env.MONGODB_COLLECTION

const newUserSchema = new Schema<CreateNewUser>({
        firstname: {
            type: String,
            trim: true,
            required: true
        },
        lastname: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
)

const UserModel = model<CreateNewUser>(dbCollection, newUserSchema)

export default UserModel