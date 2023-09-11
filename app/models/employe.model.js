const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeSchema = new Schema({
    name: {
        type: String,
        required: true
        
    },
    firstName: {
        type: String,
        default: null
    },
    dateCreated: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employe', employeSchema);
