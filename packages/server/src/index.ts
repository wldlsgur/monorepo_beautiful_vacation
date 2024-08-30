import express, { Express, Request, Response } from 'express';
import * as Router from '@/routes';

const app: Express = express();
const port = 5000;

app.use('/api/v1/users', Router.UserRouter);
app.use('/api/v1/rooms', Router.RoomRouter);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
