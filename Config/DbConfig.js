const mongoose = require('mongoose')

const DbConnect = async () => {
  const con = await mongoose.connect("mongodb://localhost:27017/Crud")
  if (con) {
    console.log("DB Connected !")
  }
}

module.exports = DbConnect