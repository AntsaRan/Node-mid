const express = require('express');
const router = express.Router();
const employee_ctrl = require('../controllers/employee_controller');

router.post('/checkIn', employee_ctrl.checkin);
router.put('/checkout', employee_ctrl.checkout);
router.get('/getAllChecks',employee_ctrl.getChecks);
module.exports = router;