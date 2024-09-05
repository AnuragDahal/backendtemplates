import express from 'express';
import mongoose from 'mongoose';
import {env} from "./utils/envutils.js";
import authRouter from "./apis/auth.js"
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected...');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.status(200).json("Hello world");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// Register API routes
app.use('/api/auth',authRouter);
