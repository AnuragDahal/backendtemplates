import { Router } from 'express';
import {handleSignup,handleLogin , handleLogout} from "../controllers/authController.js"
import {isAuthenticated} from "../middlewares/authmiddleware.js"
import { zodValidator } from '../middlewares/zodmiddleware.js';
import { signupSchema,loginSchema } from '../zod/authSchema.js';

const authRouter = Router();


authRouter.post('/signup',zodValidator(signupSchema),handleSignup)
authRouter.post('/login',zodValidator(loginSchema),handleLogin)
authRouter.post('/logout',isAuthenticated,handleLogout)
authRouter.get('/protected',isAuthenticated, (req,res)=>{
    return res.status(403).json({message:"You are authorized"})
})

export default authRouter;
