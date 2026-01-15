// backend/src/server.spec.ts

import Chai from 'chai'
import 'mocha'
import statusCode from './config/statusCode'
import app from './server'
import chaiHttp = require('chai-http')


Chai.use(chaiHttp)
const expect = Chai.expect

describe('API Alive Request', () => {
    it('should return "My API is Alive!..." on call', () => {
        return Chai.request(app).get('/')
            .then(res => {
                expect(res.text).to.eql('My API is Alive!...')
                expect(res.status).to.equal(statusCode.OK)
            })
    })
})
