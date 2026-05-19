module.exports = app => {
  const router = require('express').Router();
  const path   = require('path');

  const recetteController   = require('../controllers/recette.controller');
  const categorieController = require('../controllers/categorie.controller');
  const authController      = require('../controllers/auth.controller');
  const upload              = require('../../middleware/upload');
  const verifyToken         = require('../../middleware/authMiddleware');

 

  router.post('/auth/login',    authController.login);

  // Routes recettes
  router.get('/recettes',                                              recetteController.findAll);
  router.get('/recettes/:id',                                          recetteController.findOne);
  router.post('/recettes',    verifyToken, upload.single('image'),     recetteController.create);
  router.put('/recettes/:id', verifyToken, upload.single('image'),     recetteController.update);
  router.delete('/recettes/:id', verifyToken,                          recetteController.delete);

  // Routes catégories
  router.get('/categories',          categorieController.findAll);
  router.get('/categories/:id',      categorieController.findOne);
  router.post('/categories',         verifyToken, categorieController.create);
  router.put('/categories/:id',      verifyToken, categorieController.update);
  router.delete('/categories/:id',   verifyToken, categorieController.delete);

  app.use('/api/', router);
};