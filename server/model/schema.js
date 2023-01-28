const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const login = new mongoose.Schema({
    email :{
        type :String
    },
    password :{
        type :String
    }
   
}) 
const signUp = new mongoose.Schema({
    email :{
        type :String
    },
    password :{
        type :String
    },
    cpassword:{
        type: String
    }
});

const eventRegister = new mongoose.Schema({
    firstname :{
        type : String 
    },
    lastname :{
        type : String 
    },
    location :{
        type : String
    },
    stime :{
        type : String
    },
    dates:{
        type : String
    },
    agenda :{
       type : String
    },
    mobileno :{
        type : String
    }
},{
  timestamps : true  
});




signUp.pre('save',  async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password, 12);
        this.cpassword = await bcrypt.hashSync(this.cpassword, 12);

    }
    next();
});

// eventRegister.pre('save',  async function (next){
//     if(this.isModified('stime')){
//         this.stime = this.stime.slice(14,19);
//     }
//     next();
// });

const Login = mongoose.model('LOGIN',login);
const SignUp = mongoose.model('SIGNUP',signUp);
const EventRegister = mongoose.model('EVENTREGISTER',eventRegister);

module.exports = {
    Login : Login,
    SignUp : SignUp,
    EventRegister : EventRegister
   } ;




