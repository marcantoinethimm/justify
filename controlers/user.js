const User = require('../models/User.js')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
  });
  console.log(req.body.email);
  user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
              { userId: user._id },
              'T3ZK6rrvccb311f',
              { expiresIn: '24h' }
            )
    });
  })
  .catch(error => res.status(500).json({ error }));
};
