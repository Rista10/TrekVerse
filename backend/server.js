import express from 'express';
import connectDB from './db/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './db/Routes/authRoutes.js'; 
import trailRoutes from './db/Routes/trailRoutes.js';
import commentRoutes from './db/Routes/commentRoutes.js';

const app = express();
const port = 5000;
const allowedOrigin = 'http://localhost:3000';


app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json()); 
app.use(cookieParser());


connectDB();


app.use('/api/auth', authRoutes); 
app.use("/api/trails", trailRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
