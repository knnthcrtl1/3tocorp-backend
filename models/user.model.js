const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        max: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 250
    },
    restriction: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;