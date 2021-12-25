import { Schema, model } from 'mongoose'
import { CreateNewUser } from '../utils/interfaces/Users'

const dbCollection = process.env.MONGODB_COLLECTION

const schema = new Schema<CreateNewUser>({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
)

const UserModel = model<CreateNewUser>(dbCollection, schema)

export default UserModel