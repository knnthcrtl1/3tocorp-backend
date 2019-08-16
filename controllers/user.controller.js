const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.user_create = async (req, res) => {

    const user = new userModel(req.body);

    try {
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }

}

exports.user_signin = async (req, res) => {

    const user = await userModel.find({ username: req.body.username });

    try {

        const validUsername = await user[Object.keys(user)[0]];

        bcrypt.compare((req.body.password && req.body.password), validUsername.password,  async (err, isValid) => {
    // res === true     

    if (isValid) {
        res.json(validUsername);
    } else {
        res.status(400).json('Wrong Credentials')
    }  

});     


    } catch (err) {
        res.status(400).json(err);
        res.json(err);
    }   

}