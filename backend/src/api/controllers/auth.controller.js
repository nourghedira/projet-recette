const db = require('../../database/db.config');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email et password obligatoires.' });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur introuvable.' });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      'SECRET_KEY_RECETTE',
      { expiresIn: '24h' }
    );

    res.status(200).send({
      message: 'Connexion réussie.',
      token: token,
      user: { id: user.id, nom: user.nom, email: user.email }
    });

  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};