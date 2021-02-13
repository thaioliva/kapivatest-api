import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import pipedrive from 'pipedrive';
import dealsController from './controllers/deals';

pipedrive.Configuration.apiToken = process.env.PIPEDRIVE_KEY;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const dateFilter = req?.query?.date || new Date();
  
  dealsController.getAll(dateFilter)
    .then((response) => {
      res.status(response.statusCode);
      res.json(response.data);
    });
});

export default app;