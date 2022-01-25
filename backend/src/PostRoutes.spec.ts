import Chai from 'chai'
import 'mocha'
import StatusCode from './configurations/StatusCode'
import app from './Server'
import chaiHttp from 'chai-http'
import { CreateNewPost } from './utils/interfaces/Posts'

Chai.use(chaiHttp)
const expect = Chai.expect

const randomString = Math.random().toString(36).substring(7)
let postId: string = '61f003637edcde522526518a'
const post: CreateNewPost = {
    author: randomString,
    title: randomString,
    content: randomString,
}
const updatedPost: CreateNewPost = {
    author: randomString + randomString,
    title: randomString + randomString,
    content: randomString + randomString,
}

const postRoute = '/posts'

const testingNonExistingRoute = () => {
    describe('Test a route that does not exist', () => {
        it('Expecting 404 not found', () => {
            return Chai.request(app).get(`/${ randomString }`)
                .then((response) => {
                    expect(response.status).to.equal(StatusCode.NOT_FOUND)
                })
        })
    })
}

const createPost = () => {
    describe('Testing CREATE(POST) method for a post entity', () => {
        it('Expecting a post to be created', (done) => {
            Chai.request(app)
                .post(postRoute)
                .send(post)
                .end((error, response) => {
                    expect(response.status).to.equal(StatusCode.CREATED)
                    expect(response.body).be.a('object')
                    postId = response.body._id
                    expect(response.body).have.property('author').eq(post.author)
                    expect(response.body).have.property('title').eq(post.title)
                    expect(response.body).have.property('content').eq(post.content)
                    done()
                })
        })
    })
}

const getAllPosts = () => {
    describe('Testing READ(GET) method for all posts entity', () => {
        it('Expecting a array with all posts', (done) => {
            Chai.request(app)
                .get(postRoute)
                .end((error, response) => {
                    expect(response.status).to.equal(StatusCode.OK)
                    expect(response.body).be.a('array')
                    expect(response.body.length).be.eq(response.body.length)
                    done()
                })
        })
    })
}

const updatePost = () => {
    describe('Testing UPDATE(PUT) a post in database', () => {
        it('Expecting a post to be updated', (done) => {
            Chai.request(app)
                .put(`${postRoute}/${ postId }`)
                .send(updatedPost)
                .end((error, response) => {
                    expect(response.status).to.equal(StatusCode.OK)
                    expect(response.body).be.a('object')
                    expect(response.body).have.property('_id').eq(postId)
                    expect(response.body).have.property('author').eq(updatedPost.author)
                    expect(response.body).have.property('title').eq(updatedPost.title)
                    expect(response.body).have.property('content').eq(updatedPost.content)
                    done()
                })
        })
    })
}

const deletePost = () => {
    describe('Testing DELETING(DELETE) a post in database', () => {
        it('Expecting a post to be deleted', (done) => {
            Chai.request(app)
                .delete(`${postRoute}/${ postId }`)
                .end((error, response) => {
                    expect(response.status).to.equal(StatusCode.OK)
                    done()
                })
        })
    })
}

describe('TESTING THE POST_API ROUTE', () => {
    testingNonExistingRoute()
    createPost()
    getAllPosts()
    updatePost()
    deletePost()
})