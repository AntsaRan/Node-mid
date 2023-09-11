const jwt = require('jsonwebtoken');

const Admin = require('../models/admin.model');

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = admin;
      const isEqual = password===admin.password;
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          adminId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '365d' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      return;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
      return err;
    }
  };