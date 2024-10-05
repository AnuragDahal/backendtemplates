import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken:{
    type:String,
  }
});

const User = mongoose.model("User", signupSchema);

signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  return next();
});

export default User;

signupSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};


signupSchema.methods.generateAccessToken = async function () {

    jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },process.env.ACESS_TOKEN_SECRET,{

        expiresIn:"2h"
    })
    
}

signupSchema.methods.generateRefreshToken = async function name() {

    jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"1y"
    })
    
}