const Check = require('../models/check.model');
const Employee = require('../models/employe.model');

exports.checkIn = async (empID, commentIn, cb) => {

    // check if employee exists
    const dateIn = new Date();

    //check if already checked in and never checked out
    const checkin_verif = await Check
        .findOne({
            employeeID: empID,
        })
        .sort({
            dateIn: -1
        });
    if (checkin_verif && !checkin_verif.dateOut) {
        cb({ res: null, message: "Already checked in and never checked out. Check out before you can check in again." });
    } else {
        const newCheckin = new Check({
            employeeID: empID,
            dateIn: dateIn,
            commentIn: commentIn
        })
        cb({ res: newCheckin, message: "ok" });
    }
}

exports.checkout = async (empID, commentout, cb) => {

    //check if employee exists
    const dateOut = new Date();

    //check if already checked out 
    const checkout_verif = await Check
        .findOne({
            employeeID: empID,
        })
        .sort({
            dateIn: -1
        });
    if (checkout_verif) {
        if (checkout_verif.dateOut) {
            cb({ res: null, message: "Already checked out." });
        } else {
            checkout_verif.dateOut = dateOut,
            checkout_verif.commentOut = commentout,
            checkout_verif.stayDuration = (checkout_verif.dateOut - checkout_verif.dateIn) /6000;
            cb({ res: checkout_verif, message: "ok" });
        }
    }else{
        cb({ res: null, message: "Aucun check de cet utilisateur." });
    }
}