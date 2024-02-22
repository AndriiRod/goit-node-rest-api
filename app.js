import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { contactsRouter, authRouter } from './routes/index.js';
dotenv.config();

const { DB_HOST } = process.env;

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connection successful');
      console.log('Server is running. Use our API on port: 3000');
    });
  })
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });
