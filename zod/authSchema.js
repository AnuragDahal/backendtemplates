import {z} from 'zod';

const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character");


const signupSchema = z.object({
    name:z.string().min(1),
    email:z.string().email("Invalid Email Address"),
    password:passwordSchema
})

const loginSchema = z.object({
    email:z.string().email("Invalid Email Address"),
    password:passwordSchema
})

export {signupSchema,loginSchema};
