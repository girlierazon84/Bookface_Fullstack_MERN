import {
    CreatePostObject,
    PostDataObject
} from '../../interface/PostInterface'
import http from '../PostsApi'

const postUrl = '/posts'

const PostService = {
    createPost: (newPostPayload: CreatePostObject) => {
        return http.post(postUrl, newPostPayload)
    },

    getAllPosts: () => {
        return http.get<PostDataObject[]>(postUrl)
    },

    getPostById: (id: string) => {
        return http.get<PostDataObject>(`${ postUrl }/${ id }`)
    },

    updatePost: (id: string, payload: CreatePostObject) => {
        return http.put(`${ postUrl }/${ id }`, payload)
    },

    deletePostById: (id: string) => {
        return http.delete(`${ postUrl }/${ id }`)
    },

}

export default PostService