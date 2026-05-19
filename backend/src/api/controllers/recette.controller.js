const db     = require('../../database/db.config');
const Recette = db.recettes;

// Créer une recette
exports.create = (req, res) => {
  const { nom, description, ingredients, etapes, duree, difficulte, categorie } = req.body;

  if (!nom || !description || !etapes || !duree || !categorie) {
    return res.status(400).send({ message: 'Les champs nom, description, étapes, durée et catégorie sont obligatoires.' });
  }

  
  const image = req.file
    ? `http://localhost:3000/uploads/${req.file.filename}`
    : (req.body.image || '');

  const nouvelleRecette = new Recette({
    nom,
    description,
    ingredients: ingredients
      ? (Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(s => s.trim()).filter(Boolean))
      : [],
    etapes,
    duree,
    difficulte,
    image,
    categorie
  });

  nouvelleRecette.save().then(() => {
    res.status(200).send({ message: 'Recette créée avec succès.' });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur lors de la création.' });
  });
};

// Récupérer toutes les recettes
exports.findAll = (req, res) => {
  Recette.find({}).populate('categorie').then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};

// Récupérer une recette par id
exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID est requis.' });
  }

  Recette.findById(id).populate('categorie').then(data => {
    if (!data) {
      return res.status(404).send({ message: 'Recette introuvable.' });
    }
    res.send(data);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};

// Modifier une recette
exports.update = (req, res) => {
  const id = req.params.id;
  const { nom, description, ingredients, etapes, duree, difficulte, categorie } = req.body;

  if (!id || !nom || !description || !etapes || !duree || !categorie) {
    return res.status(400).send({ message: 'Champs obligatoires manquants.' });
  }

  // Si un nouveau fichier est uploadé on le prend, sinon on garde l'ancienne valeur
  const image = req.file
    ? `http://localhost:3000/uploads/${req.file.filename}`
    : (req.body.image || '');

  Recette.findByIdAndUpdate(
    id,
    {
      nom,
      description,
      ingredients: ingredients
        ? (Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(s => s.trim()).filter(Boolean))
        : [],
      etapes,
      duree,
      difficulte,
      image,
      categorie
    },
    { useFindAndModify: false }
  ).then(data => {
    if (!data) {
      return res.status(404).send({ message: `Recette id=${id} introuvable.` });
    }
    res.status(200).send({ message: 'Recette mise à jour avec succès.' });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};

// Supprimer une recette
exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID est requis.' });
  }

  Recette.findByIdAndDelete(id).then(data => {
    if (!data) {
      return res.status(404).send({ message: 'Recette introuvable.' });
    }
    res.status(200).send({ message: 'Recette supprimée avec succès.' });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};