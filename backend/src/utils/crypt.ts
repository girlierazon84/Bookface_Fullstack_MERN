import bcrypt from 'bcrypt'
import Logger from './Logger'

const saltRounds: number = 10

const createPassword = (plaintextPassword: string) => {
    bcrypt.hash(plaintextPassword, saltRounds)
        .then(hashedPassword => {
            return hashedPassword
        })
        .catch(error => {
            Logger.error(error)
        })
}



export default {
    createPassword
}