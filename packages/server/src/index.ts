import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as Router from '@/routes';
import { CONFIG } from '@/config';

const app: Express = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(CONFIG.COOKIE_SECRET));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/api/v1/users', Router.UserRouter);
app.use('/api/v1/rooms', Router.RoomRouter);
app.use('/api/v1/auth', Router.AuthRouter);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
