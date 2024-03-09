const mongoose = require('mongoose');


const userSchema = new  mongoose.Schema({
    username : {
        type : String,
        required : true,
        lowerCase : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        
    }
})

 const UserModel = mongoose.model('UserModel',userSchema);

module.exports = UserModel;