import { Schema, model } from 'mongoose'
import { CreateNewUser } from '../utils/interfaces/Users'

const dbCollection = process.env.MONGODB_COLLECTION

const newUserSchema = new Schema<CreateNewUser>({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
)

const UserModel = model<CreateNewUser>(dbCollection, newUserSchema)

export default UserModel