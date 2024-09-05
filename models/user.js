import mongoose from "mongoose";


const signupSchema = new mongoose.Schema({

    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    }
)

const user=mongoose.model('user',signupSchema);

export default user;

