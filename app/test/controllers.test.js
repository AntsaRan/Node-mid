const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const Employe = require('../models/employe.model');
const empCtrl = require('../controllers/admin_controller');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI_TEST;
const token = process.env.TOKEN;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should(); // Initialize Chai's "should" assertion style

const app = require('../../index');

describe('Admin controller', function () {
    before(function (done) {
        // Connect to the database only once before running the tests
        if (mongoose.connection.readyState === 0) {
            mongoose
                .connect(
                    mongoURI
                )
                .then(() => {
                    console.log("Connected to the database");
                    done();
                })
                .catch(err => {
                    console.error(err);
                    done(err);
                });
        } else {
            console.log("Database already connected");
            done();
        }

    });

    it('should add an employee', async function () {
        this.timeout(10000);
        const currentDate = new Date();
        const employee = {
            name: "Nathalie",
            firstName: "Jean",
            dateCreated: currentDate,
            department: "Français"
        };

        try {
            const response = await chai
                .request(app)
                .post('/admin/createEmploye')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjRmZjNhZTczMjYxYTFlNGQ3MDgyYWJhIiwiaWF0IjoxNjk0NDQ4NTMyLCJleHAiOjE3MjU5ODQ1MzJ9.TBBu2Jry57ht9GDxRKsxN1z8k2HvrtgwmR9UgRk-uLI`)
                .send(employee);
            console.log(response.body);
            response.should.have.status(201);
            response.body.should.be.an('object');
            response.body.should.have.property('message').eql('Employee created successfully!');
            response.body.should.have.property('employe');

        } catch (error) {
            // Handle any errors here and pass them to done if needed
            throw error;
        }
    });
})

