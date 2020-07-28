const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Userschema = mongoose.Schema({

   user_name:{
        type: String,
        required: [true,'please enter a user name']
    },
    email:{
        type:String,
        unique:true, 
        required: [true,'please enter a user email']
       /* match:[
            /^\w+([\,-]?\w+)([\,_]?\w+)*(\.\w{2,3})+$/,
            'please enterd a valid email'
        ]*/
    },
    password:{
        type: String,
        required: [true,'please enter a password'],
        minlength: 6,
        select: false
    },
    createAt:{

        type:Date,
        default : Date.now
    }


});

//Encript password using bcrypt js

Userschema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

});
// get signed jwt token
Userschema.methods.getSignedJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE

    });
}

/// Match Password 
Userschema.methods.matchPassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password);
};

module.exports = mongoose.model('User',Userschema);