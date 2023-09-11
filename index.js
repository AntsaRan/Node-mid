require('dotenv').config();
const express = require('express');
const dbcon = require('./app/utils/databaseCon');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

const admin_route= require('./app/routes/admin.route');
const employee_route = require('./app/routes/employee.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin',admin_route);
app.use('/employee',employee_route);

dbcon.connectDb().then(res => {
        const server = app.listen(port);
}).catch(err => {
    console.log(err);
});

module.exports = app;