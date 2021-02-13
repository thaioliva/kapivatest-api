import 'dotenv/config';
const MongoClient = require('mongodb').MongoClient;
import app from './app';
import cron from './cron';

const urlMongoConnector = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kapivatest.15sgw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.listen(process.env.PORT, () => {
  const client = new MongoClient(urlMongoConnector, { useUnifiedTopology: true });
  client.connect((err) => {
    if (err) console.log(err);
    global.db = client.db(process.env.DB_NAME);
  })

  cron;

  console.log(`app running on ${process.env.PORT}`);
});
