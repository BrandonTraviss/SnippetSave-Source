import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './src/config/db.js';
import cors from"cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./src/routes/authRoutes.js"
import snippetRoutes from "./src/routes/snippetRoutes.js";


connectDB();
const app = express();
const PORT = process.env.PORT || 5000

app.listen(PORT || 5000,()=>{
    console.log(`Server Started on Port ${PORT}`)
});

// Body Parser
app.use(express.json())

//Cookie Parser (required for httpOnly JWT cookies)
app.use(cookieParser());

//  CORS(required for cookies to work with frontend)
app.use(
    cors({
        origin: "http://localhost:5173", // frontend url
        credentials:true,               // allow cookies
    })
)

// Mount your auth routes
app.use('/api/auth', authRoutes)
app.use("/api/snippets", snippetRoutes);

