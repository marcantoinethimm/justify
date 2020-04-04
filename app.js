const express = require('express');
const mongoose = require('mongoose');

//Déclaration des routes
const justifyRoutes = require('./routes/justify.js')
const userRoutes = require('./routes/user');

//Connection à la database MongoDB
mongoose.connect('mongodb+srv://tictactrip:Mtmittnb0WEyXxJj@cluster0-ffjds.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//création de l'application web
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/justify', justifyRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
