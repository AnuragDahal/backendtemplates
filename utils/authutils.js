// utils/authUtils.js
import jwt from 'jsonwebtoken';
import {env} from '../utils/envutils.js';
import otpGenerator from 'otp-generator';

export const generateAuthToken = (res,email) => {

    // Generate a token
    const token = jwt.sign({ email }, env.JWT_SECRET, {
        algorithm: env.ALGORITHM,
        expiresIn: env.EXPIRES_IN_SEC
    });
    // Set the token in a cookie
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: parseInt(env.EXPIRES_IN_SEC * 1000)
    });
};

export const generateOtp = (length= 6)=>{

    const otp = otpGenerator.generate(6,{digits:true,specialChars:false,alphabets:false})
    return otp
}
