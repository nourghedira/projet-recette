const db = require('../../database/db.config');
const Categorie = db.categories;
const Recette = db.recettes;


exports.create = (req, res) => {
  const { nom, description } = req.body;

  if (!nom) {
    return res.status(400).send({ message: 'Le champ nom est obligatoire.' });
  }

  const nouvelleCategorie = new Categorie({ nom, description });

  nouvelleCategorie.save().then(data => {
    res.status(200).send({ message: 'Catégorie créée avec succès.' });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur lors de la création.' });
  });
};


exports.findAll = (req, res) => {
  Categorie.find({}).then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID est requis.' });
  }

  Categorie.findById(id).then(data => {
    if (!data) {
      return res.status(404).send({ message: 'Catégorie introuvable.' });
    }
    res.send(data);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};


exports.update = (req, res) => {
  const id = req.params.id;
  const { nom, description } = req.body;

  if (!id || !nom) {
    return res.status(400).send({ message: 'Champs obligatoires manquants.' });
  }

  Categorie.findByIdAndUpdate(id, { nom, description }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `Catégorie id=${id} introuvable.` });
      }
      res.status(200).send({ message: 'Catégorie mise à jour avec succès.' });
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: 'Erreur serveur.' });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID est requis.' });
  }

  Categorie.findByIdAndDelete(id).then(data => {
    if (!data) {
      return res.status(404).send({ message: 'Catégorie introuvable.' });
    }
    // Supprimer toutes les recettes liées
    Recette.deleteMany({ categorie: id }).then(() => {
      res.status(200).send({ message: 'Catégorie et recettes liées supprimées avec succès.' });
    }).catch(err => {
      console.log(err);
      res.status(500).send({ message: 'Erreur lors de la suppression des recettes liées.' });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Erreur serveur.' });
  });
};