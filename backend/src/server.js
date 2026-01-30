import express from 'express';
import NoteRouter from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';

import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//dp
const __dirname = path.resolve();
//dp

// middleware
//no not needed in production
if(process.env.NODE_ENV !== 'production') {
  app.use(cors({
  origin: 'http://localhost:5173', // Adjust the origin as per your frontend's address
}));
}

app.use(express.json());

app.use(rateLimiter);

// console.log(process.env.MONGO_URI);
app.use("/api/notes", NoteRouter);

//depyoyment
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
}
//deployment
connectDB().then(() => {

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})



 