const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        max: 250
    },
    surname: {
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
        max: 250
    },
    marital_status: {
        type: String,
        max: 250
    }
});

const Trainer = mongoose.model("Trainer", TrainerSchema);
module.exports = Trainer;