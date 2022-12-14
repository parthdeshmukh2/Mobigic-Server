const mongoose = require('mongoose');

//Schema required for User Information.
const userSchema = mongoose.Schema({
    userName: String,
    password: {required:true, type:String}
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;