import {Request, Response} from 'express'
import StatusCode from '../configurations/StatusCode'
import PostModel from '../models/PostModel'
import Logger from '../utils/Logger'
import {CreateNewPost} from "../utils/interfaces/Posts";

const createPost = async (req: Request, res: Response) => {
    Logger.http(req.body)
    let {
        author,
        title,
        content
    }: CreateNewPost = req.body

    const post = new PostModel({
        author,
        title,
        content
    })
    Logger.debug(post)
    try {
        const response = await post.save()
        Logger.debug(response)
        res.status(StatusCode.CREATED).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({message: error.message})
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const response = await PostModel.find()
        Logger.debug(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({message: error.message})
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params
        Logger.http(`postId: ${postId}`)
        const response = await PostModel.findById(postId)
        Logger.debug(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to retrieve post with ID: ${req.params.postId}`,
                error: error.message
            })
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params
        Logger.http(`postId: ${postId}`)
        let {
            author,
            title,
            content
        } = req.body
        Logger.http(`req.body: ${req.body}`)
        if (!req.body) {
            res.status(StatusCode.BAD_REQUEST)
                .send({message: `Cant update with empty body`})
        }

        const response = await PostModel.findByIdAndUpdate(postId, {
            author,
            title,
            content
        }, {new: true})
        Logger.debug(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to update post with ID: ${req.params.postId}`,
                error: error.message
            })
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params
        const response = await PostModel.findByIdAndDelete(postId)
        res.status(StatusCode.OK).send({
            message: `Successfully deleted post with content: ${response.author} and ID: ${postId}`
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to delete post with ID: ${req.params.postId}`,
                error: error.message
            })
    }
}


export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
}