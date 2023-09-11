const express = require('express');
const {check, validationResult } = require('express-validator');
const isAuth =require ('../middleware/is-auth');
const router = express.Router();
const authController = require('../controllers/auth_controller');

const admin_controller= require('../controllers/admin_controller');
const createEmployeValidation = [
    check('name').notEmpty().withMessage('Name is required.'),
    check('department').notEmpty().withMessage('Department is required.'),
  ];

router.post('/createEmploye',isAuth,
createEmployeValidation,
admin_controller.createEmployee);

router.get('/listEmployees',isAuth,
createEmployeValidation,
admin_controller.getEmployee);

router.get('/listEmployeesDate',isAuth,
createEmployeValidation,
admin_controller.getEmployeeFiltre);

router.post('/login', authController.login);

module.exports = router;