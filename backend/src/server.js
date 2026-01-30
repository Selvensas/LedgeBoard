import express from 'express';
import NoteRouter from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';

import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust the origin as per your frontend's address
}));
app.use(express.json());

app.use(rateLimiter);

// console.log(process.env.MONGO_URI);
app.use("/api/notes", NoteRouter);

connectDB().then(() => {

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})



 