const User = require('../models/User.js')

module.exports = (req, res, next) => {

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  dateNow = Date(year + "-" + month + "-" + day);

  User.findOne({_id: req.body.userId})
    .then(user =>{
      console.log(user.date);
      if (user.date < dateNow){
        User.updateOne({ _id: req.body.userId }, { words_count: 0 }, { date: dateNow})
        .catch(error => res.status(400).json({ error }));
        next();
      } else {
        next();
      }
    })
    .catch(error => res.status(400).json({ error }));
};
