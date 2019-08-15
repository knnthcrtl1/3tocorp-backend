const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        max: 250
    },
    middlename: {
        type: String,
        required: true,
        max: 250
    },
    lastname: {
        type: String,
        required: true,
        max: 250
    },
    address: {
        type: String,
        required: true,
        max: 1000
    },
    age: {
        type: Number,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
        max: 250
    },
    mobile_number: {
        type: Number,
    },
    telephone: {
        type: Number,
    },
    gender: {
        type: String,
        max: 250
    },
    email: {
        type: String,
        max: 250,
        unique: true
    },
    marital_status: {
        type: String,
        max: 250
    }
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;