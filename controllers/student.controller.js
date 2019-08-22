const studentModel = require('../models/student.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const myPlaintextPassword = 'test123';

exports.student_get = async (req, res) => {
    // const student = await studentModel.find({});

    // try {
    //     res.send(student);
    // } catch (err) {
    //     res.status(500).send(err);
    // }    
    // console.log(req.params);

    try {
        let pageNo = await parseInt(req.query.pageNo)
        let size = await parseInt(req.query.size)

        let query = {}
        let response = {}

        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response)
        }

        query.skip = size * (pageNo - 1);
        query.limit = size;

        // Find some documents
        studentModel.estimatedDocumentCount({}, async (err, totalCount) => {
            if (err) {
                response = { "error": true, "message": "Error fetching data" }
            }

            studentModel.find({}, {}, query, async (err, data) => {
                // Mongo command to fetch all data from collection.
                if (err) {
                    response = { "error": true, "message": "Error fetching data" };
                } else {
                    var totalPages = await Math.ceil(totalCount / size)
                    response = { "error": false, "message": data, "pages": totalPages };
                }
                res.json(response);
            });
        })

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
        await studentModel.save();
        res.json(student)
    } catch (err) {
        res.status(500).send(err);
        res.json(err);
    }
}