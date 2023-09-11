const Employe = require('../models/employe.model');
const { body, check, validationResult } = require('express-validator');
const { parse, format } = require('date-fns');
const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');

//const { validationResult } = require('express-validator/check');

exports.createEmployee = (req, res, next) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }
        const currentDate = new Date();
        const employe = new Employe({
            name: req.body.name,
            firstName: req.body.firstname,
            dateCreated: currentDate,
            department: req.body.department
        });

        employe
            .save()
            .then(result => {
                res.status(201).json({
                    message: 'Employee created successfully!',
                    employe: result,
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    } catch (error) {
        throw error;
    }
}

exports.getEmployee = (req, res, next) => {
    try {
        let employeesRes;

        Employe
            .find()
            .then(items => {
                if (!items) {
                    res.json({
                        message: 'No employees retrieved.',
                    });
                }
                if (items.isEmpty) {
                    res.json({
                        message: 'No employees.',
                    });
                }
                employeesRes = items;
                res.status(200).json({
                    message: 'Fetched employees successfully.',
                    employees: employeesRes,
                });

            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } catch (error) {
        throw error;
    }
}

exports.getEmployeeFiltre = (req, res, next) => {
    try {
        console.log(req.body.date);
        const parsedDate = parse(req.body.date, 'dd/MM/yy', new Date());
        const formattedDate = format(parsedDate, 'yyyy-MM-dd\'T00:00:00.000Z\'');
        
        console.log(formattedDate);
        let employeesRes;
        const startOfDay = new Date(formattedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(formattedDate);
        endOfDay.setHours(23, 59, 59, 999);

        Employe
            .find({
                dateCreated: {
                    $gte: startOfDay, // Greater than or equal to the start of the target date
                    $lte: endOfDay,   // Less than or equal to the end of the target date
                },
            })
            .then(items => {
                if (!items) {
                    res.json({
                        message: 'No employees retrieved.',
                    });
                }
                employeesRes = items;
                res.status(200).json({
                    message: 'Fetched employees successfully.',
                    employees: employeesRes,
                });

            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } catch (error) {
        throw error;
    }

}