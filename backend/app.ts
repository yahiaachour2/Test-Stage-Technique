import cors from 'cors'; // Import the cors middleware
import express, {
  Request,
  Response,
} from 'express';

import database from './models';
import docmentsRoutes from './routes/documents';

const app = express();

// Enable CORS for all routes
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/sync', (req: Request, res: Response) => {
  database.sequelize.sync();
  return res.status(200).send('database synchronized');
});

app.use('/documents', docmentsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
