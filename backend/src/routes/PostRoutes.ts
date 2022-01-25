import { Express } from 'express'
import PostController from '../controllers/PostController'

const postUrl: string = '/posts'
const postUrlWithId: string = `${postUrl}/:postId`

const routes = (app: Express) => {
    app.post(postUrl, PostController.createPost)
    app.get(postUrl, PostController.getAllPosts)
    app.get(postUrlWithId, PostController.getPostById)
    app.put(postUrlWithId, PostController.updatePost)
    app.delete(postUrlWithId, PostController.deletePost)
}

export default {
    routes
}