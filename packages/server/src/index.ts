import express, { Express } from 'express';
import dotenv from 'dotenv';
import usersRoutes from '@/routes/users';

dotenv.config();

const app: Express = express();
const port = 5000;

app.use('/', usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
