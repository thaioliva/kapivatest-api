import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import pipedrive from 'pipedrive';

import dealsController from './controllers/deals';

pipedrive.Configuration.apiToken = process.env.TOKEN;

const app = express();

app.set('port', 3000);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
  next(createError(404));
});

app.get('/', async (req, res) => {
  const dateFilter = req?.query?.date || '';
  dealsController.getAll(req.query.date)
    .then((response) => {
      res.status(response.statusCode);
      res.json(response.data);
    });
});


export default app;