const mongoose = require('mongoose');
module.exports.connect = async() => {
    try {
        await  mongoose.connect(process.env.MONGO_URL)
        console.log("Connect database thanh cong")
    } catch (error) {
        console.log("Connect database tha bai")
        console.log(error)
    }
}