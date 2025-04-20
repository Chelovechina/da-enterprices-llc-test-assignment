const express = require('express');
const multer = require('../config/multer');
const validators = require('../validators')
const authMiddleware = require('../middlewares/auth.middleware')
const validationMiddleware = require('../middlewares/validation.middleware')
const router = express.Router();

module.exports = (fileController) => {
  router.use(authMiddleware);

  router.post(
    '/upload',
    multer.single('file'),
    (req, res) => fileController.upload(req, res)
  );

  router.get(
    '/list',
    validationMiddleware(validators.file.list),
    (req, res) => fileController.getList(req, res)
  )


  router.get('/download/:id', (req, res) =>
    fileController.download(req, res)
  );

  router.delete('/delete/:id', (req, res) =>
    fileController.delete(req, res)
  );

  router.get('/:id', (req, res) =>
    fileController.getFileById(req, res)
  );

  router.put(
    '/update/:id',
    multer.single('file'),
    (req, res) => fileController.update(req, res)
  );

  return router
}
