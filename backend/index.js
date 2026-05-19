const express  = require('express');
const database = require('./src/database/db.config');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

database.mongoose.connect(database.url, {}).then(() => {
  console.log('Connecté à la base de données.');
}).catch(err => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send({ message: 'API Recettes de cuisine' });
});

require('./src/api/routes/routes')(app);

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});