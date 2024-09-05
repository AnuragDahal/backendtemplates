import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

// Validate that required environment variables are set
const requiredEnvVars = [
    'JWT_SECRET',
    'MONGO_URI',
    'ALGORITHM',
    'EXPIRES_IN_SEC',
    // Add other required environment variables here
];

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

// Export environment variables for easy access throughout the application
export const env = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    ALGORITHM: process.env.ALGORITHM,
    EXPIRES_IN_SEC: process.env.EXPIRES_IN_SEC,
    // Add other environment variables here
};


