const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("Name is required");
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("Password is required");
            }
        }
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:100,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("Gender is required");
            }
        }
    },
    genderPreference:{
        type:String,
        required:true,
        enum:["male","female","both"]
    },
    bio:{
        type:String,
        trim:true,
        maxlength:200
    },
    image:{
        type:String,
        default:''
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    matches:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    otp:{
        type:String,
        default:''
    },
    otpExpiry:{
        type:Date,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false
    },


  
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
