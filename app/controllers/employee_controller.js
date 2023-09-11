const Check = require('../models/check.model');
const Employee = require('../models/employe.model');
const { body, check, validationResult } = require('express-validator');
const { parse, format } = require('date-fns');
const employee_serv = require('../services/check.service');

exports.checkin = async (req, res, next) => {
    try {

        const dateIn = new Date();
        const commentIn = req.body.commentIn;
        let empID = req.body.id;

        const employee = await Employee.findById(empID);
        if (!employee) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        employee_serv.checkIn(empID, commentIn, data => {

            if (!data.res) {
                return res.json({
                    message: data.message,
                });
            } else {
                data.res
                    .save()
                    .then(checkinNew => {
                        res.status(201).json({
                            message: 'Checked in successfully!',
                            check: checkinNew,
                            date: dateIn
                        });
                    })
                    .catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            }

        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.checkout = async (req, res, next) => {
    try {

        const dateIn = new Date();
        const commentOut = req.body.commentOut;
        let empID = req.body.id;
        console.log(empID);
        const employee = await Employee.findById(empID);
        if (!employee) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        employee_serv.checkout(empID, commentOut, data => {

            if (!data.res) {
                return res.json({
                    message: data.message,
                });
            } else {
                data.res
                    .save()
                    .then(checkupdate => {
                        res.status(201).json({
                            message: 'Checked out successfully!',
                            check: checkupdate,
                            date: dateIn
                        });
                    })
                    .catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            }
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getChecks =  (req, res, next) => {
    try {
        Check.find()
            .then(data => {
                res.status(201).json({
                    message: 'All check in and check out',
                    check: data,
                });
            });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}