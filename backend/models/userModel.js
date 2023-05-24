const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "user must have username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "user must have password"],
        
    }
})

const User = mongoose.model("user", userSchema)
module.exports = User