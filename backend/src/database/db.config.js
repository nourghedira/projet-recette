const config = require('../config/config');
const mongoose = require('mongoose');

const db = {};

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

db.mongoose = mongoose;
db.url = config.DB_URL;
db.recettes = require('../api/models/recette.model')(mongoose);
db.categories = require('../api/models/categorie.model')(mongoose);
db.users = require('../api/models/user.model')(mongoose);
module.exports = db;