import 'dotenv/config';
const MongoClient = require('mongodb').MongoClient;
import app from './app';

const urlMongoConnector = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@kapivatest.15sgw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.listen(app.get(process.env.PORT), () => {
  const client = new MongoClient(urlMongoConnector, { useUnifiedTopology: true });
  client.connect((err) => {
    if (err) console.log(err);
    global.conn = client.db(process.env.DB_NAME);
  })

  console.log(`app running on ${process.env.PORT}`);
});
