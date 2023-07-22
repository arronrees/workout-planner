import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { exerciseRouter } from './routes/exercise.routes';
import { checkJwtExits } from './middleware/auth.middleware';
import path from 'path';
import { workoutRouter } from './routes/workout.routes';

export const prismaDB = new PrismaClient({
  errorFormat: 'pretty',
  log: ['query', 'info', 'warn'],
});

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// static files
app.use(express.static(path.join(__dirname, 'uploads')));

// reset user on locals
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = null;

  next();
});

app.get('/', async (req: Request, res: Response) => {
  res.send('home');
});

// routes
app.use('/api/auth', authRouter);
app.use(checkJwtExits);
app.use('/api/user', userRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/workouts', workoutRouter);

// error handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: '404 - Route not found' });
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('--- error handler');
  console.error(err);

  res.status(500).json({ error: err.message });
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
