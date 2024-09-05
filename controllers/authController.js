import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateAuthToken } from '../utils/authutils.js';
import { z } from 'zod';
import { sendBadRequest, sendInternalServerError, sendNotFound} from '../utils/statusUtils.js';


// Signup handler
export const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return sendBadRequest(res, "User already exists");
        }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with the hashed password
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
        });
        // Save the user to the database
        const savedUser = await newUser.save();
        // Respond with the saved user's information
        res.status(201).json({
            "statusCode": 201,
            "message": "User created successfully",
            "user": {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            }
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Extract and return the first error message
            return sendBadRequest(res, err.errors[0].message);
        }
        return sendInternalServerError(res);
    }
}

// Login handler
export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return sendNotFound(res, "User not found");
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return sendBadRequest(res, "Invalid credentials");
        }
        // generate and set cookie
        generateAuthToken(res,email)
        // Respond with the saved user's information
        return res.status(200).json({
            "statusCode": 200,
            "message": "User logged in successfully",
        });
    } catch (err) {
        return sendInternalServerError(res,"Failed to login");
    }
}
