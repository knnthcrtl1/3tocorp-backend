const studentModel = require('../models/student.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const myPlaintextPassword = 'test123';

exports.student_get = async (req, res) => {
    const student = await studentModel.find({});

    try {
        res.send(student);
    } catch (err) {
        res.status(500).send(err);
    }

}

exports.student_create = async (req, res) => {

    const student = new studentModel(req.body);

    try {

        await student.save();

        res.send(student._id);


        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(myPlaintextPassword, salt, async (err, hash) => {
        // Store hash in your password DB.
        const user = new userModel({
            user_id: student._id,
            username: student.email,
            password: hash,
            restriction: 1
        });

        await user.save();
    });
        });


    } catch (err) {
        res.status(500).send(err);
    }

}

exports.student_delete = async (req, res) => {
    try {
        const student = await studentModel.findByIdAndDelete(req.params.id);

        if (!student) res.status(404).send("No item found")
            res.status(200).send()

    } catch (err) {
        res.status(500).send(err);
    }
}

exports.student_update = async (req, res) => {
    try {
        const student = await studentModel.findByIdAndUpdate(req.params.id, req.body);
        await foodModel.save();
        res.send(student)
    } catch (err) {
        res.status(500).send(err);
    }
}