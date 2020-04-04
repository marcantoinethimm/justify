const User = require('../models/User.js')

module.exports = (req, res, next) => {

  var dateNow = new Date();
  dateNow.setHours(0,0,0,0);

  User.findOne({_id: req.body.userId})
    .then(user =>{
      //fix the time to 00h, 0 min , 0 sec
      user.date.setHours(0,0,0,0);
      if (user.date < dateNow){
        User.updateOne({ _id: req.body.userId }, { words_count: 0, date: dateNow })
        .catch(error => res.status(400).json({ error }));
        next();
      } else {
        next();
      }
    })
    .catch(error => res.status(400).json({ error }));
};
