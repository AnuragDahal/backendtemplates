// zodmiddleware.js
import { z } from 'zod';
import { sendBadRequest } from '../utils/statusUtils.js';

// Middleware to validate request body against a Zod schema
export const zodValidator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Validate the request body
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        if (err instanceof z.ZodError) {
            return sendBadRequest(res, err.errors[0].message); // Handle validation error
        }
        next(err); // Pass other errors to the error handler
    }
};