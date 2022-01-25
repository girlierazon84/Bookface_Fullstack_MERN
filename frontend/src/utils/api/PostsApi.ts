import Axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL
const serverPort = process.env.REACT_APP_SERVER_PORT

const url = `${ serverUrl }:${ serverPort }`

const PostsApi = Axios.create({
    baseURL: url
})

export default PostsApi