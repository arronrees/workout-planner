import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// reset user on locals
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = null;

  next();
});

app.get('/', async (req: Request, res: Response) => {
  res.send('home');
});

// error handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: '404 - Route not found' });
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).json({ error: err.message });
});
