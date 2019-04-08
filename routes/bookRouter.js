const express = require('express');

const routes = Book => {
  const bookRouter = express.Router();
  const bookController = require('../controllers/bookController')(Book);

  bookRouter
    .route('/')
    .get(bookController.get)
    .post(bookController.post);

  bookRouter.use('/:bookId', bookController.returnOne);

  bookRouter
    .route('/:bookId')
    .get(bookController.getOne)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.delete);

  return bookRouter;
};

module.exports = routes;
