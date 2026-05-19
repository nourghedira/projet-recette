const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY_RECETTE');
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Token invalide.' });
  }
};

module.exports = verifyToken;