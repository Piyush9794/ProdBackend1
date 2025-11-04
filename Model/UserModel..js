const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    phone: {
        type: String,

    },
    token : {
        type: String,

    },
},
    { timestamps: true },
)

const UserModel = mongoose.model("UserData", UserSchema)

module.exports = UserModel