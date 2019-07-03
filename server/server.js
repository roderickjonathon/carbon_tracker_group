const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
// const history = require('connect-history-api-fallback');

const app = express();
app.use(cors());
app.use(bodyParser.json())
// app.use(history())

// history({
//   index: '/'
// });

MongoClient.connect('mongodb://localhost:27017')
.then(( visitor ) => {
  const db = visitor.db('carbon_counter');
  const profiles = db.collection("profiles");
  const profilesRouter = createRouter(profiles);
  app.use('/api/profiles', profilesRouter);
})
.catch(console.err);

// app.get('/', (req, res) => {
//   res.send("Hello world!")
// })
app.listen(3000, function (){
  console.log(`Listening on port ${ this.address().port}`);
});
