const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,

    },
    price: {
        type: String,

    },
   
    email: {
        type: String,

    },
    img: {
        type: String,

    },
   
    description : {
        type: String,

    },
},
    { timestamps: true },
)

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = ProductModel;