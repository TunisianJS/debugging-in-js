const { expect } = require('chai')
var chai = require('chai'),
    http = require('chai-http'),
    app = require('../server')

chai.use(http)
chai.should()
chai.expect()

describe("Validate API", () => {
    describe("GET /validate/5425233430109903", () => {
        it("should be valid", (done) => {
            chai.request(app)
                .get('/validate/5425233430109903')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.valid.should.be.a('boolean')
                    res.body.type.should.be.a('string')
                    expect(res.body.valid).to.equal(true)
                    expect(res.body.type).to.equal("Mastercard")
                    done()
                })
        })
    })

    describe("GET /validate/1012888888881881", () => {
        it("should be invalid", (done) => {
            chai.request(app)
                .get('/validate/1012888888881881')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.valid.should.be.a('boolean')
                    expect(res.body.valid).to.equal(false)
                    done()
                })
        })
    })
})