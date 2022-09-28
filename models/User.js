const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    messages: {
        type: Array
    }

});

const User = mongoose.model("User", userSchema);
module.exports = User;
