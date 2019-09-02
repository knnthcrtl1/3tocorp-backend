const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        bcrypt.compare((req.body.password && req.body.password), validUsername.password, (err, isValid) => {
            // res === true     
            if (isValid) {
                const token = jwt.sign({
                    data: validUsername
                }, 'secret', { expiresIn: '1hr' });

                res.json({
                    data: validUsername,
                    token: token
                })

            } else {
                res.status(400).json('Password is incorrect');
            }
        });


    } catch (err) {
        res.status(400).json('username doesnt exist');
        // res.json(err);
    }

}