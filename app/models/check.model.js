const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkSchema = new Schema({
    employeeID: {
        type: String,
        required: true,
    },
    dateIn: {
        type: Date,
        required: true,
    },
    dateOut: {
        type: Date,
        default: null
    },
    commentIn: {
        type: String,
        default: null

    },
    commentOut: {
        type: String,
        default: null

    },
    stayDuration:{
        type: Number,
        default: null
    }

});
module.exports = mongoose.model('Check', checkSchema);
