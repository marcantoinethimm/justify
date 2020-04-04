//**************Justify Controler*****************//
const User = require('../models/User.js')

//Fonction de justification
exports.justifyText = (req, res, next) => {
  text = req.body.texte;
  //line_width représente la largeur max que peut avoir une ligne
  const line_width = 80;
  //spaceleft correspond à l'écart entre les mots sur la ligne et la fin de la ligne , par défaut il est égale à line_width
  spaceleft = line_width;
  //space_width représente la taille à laquel correspond un espacement entre deux mots
  space_width = 1;

  //on split le texte en mots
  var words = text.split(" ");

  //text_justified est le texte justifié.
  var text_justified = "";
  ///////// Verification de la limit rate de 80 000 mots de l'utilisateur ////////
  User.findOne({_id: req.body.userId})
    .then(user =>{
      if ((user.words_count + words.length) < 80000 ) {
        User.updateOne({ _id: req.body.userId }, { words_count: user.words_count + words.length })
        .then(()=> {

          //Utilisation du Greedy algorithm : https://quod.lib.umich.edu/j/jep/3336451.0013.105?view=text;rgn=main
          for (var i = 0; i < words.length; i++) {
            //on prend le mot correpondant à l'itération
            word=words[i];

            // On enlève les retour à la ligne parasites pour le comptage
            word_without_new_line= word.replace(/\r\n/g, '');

            if (word.length > spaceleft && !word.startsWith('\r\n')) {
              //cas où le mot ne rentre plus dans la ligne
              text_justified = text_justified.concat('\n' + word + " ");
              //mise à jour de l'écart spaceleft
              spaceleft = line_width - (word_without_new_line.length + space_width);

            } else if (word.startsWith('\r\n')) {
              //cas d'un saut de ligne dans le texte avec un \n dans le mot
              text_justified = text_justified.concat(word + " ");
              //mise à jour de l'écart spaceleft
              spaceleft = line_width - (word_without_new_line.length + space_width);

            } else {
              //cas où le mot ne possède pas de distinction \n et que le mot peut rentrer dans la ligne
              text_justified = text_justified.concat(word + " ");
              //mise à jour de l'écart spaceleft
              spaceleft = spaceleft - (word_without_new_line.length + space_width);
            }
          }

          //Renvois de la variable text_justified contenan le texte justifié
          //console.log(text_justified) //pour voir le texte justifié sur console.
          res.set('content-type', 'text/plain');
          res.status(201).json({
           text_justified,
          });
        })
       .catch(error => res.status(400).json({ error }));
      } else {
        //Erreur 402 payment
        res.status(402).json({ message: 'Vous avez dépassé votre quota gratuit de la journée !',});
      }
    })
    .catch(error => res.status(400).json({ error }));
};
