'use strict';

const bookController = Book => {
  const post = (req, res) => {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      book.save();
      res.status(201);
      res.send(book);
    }
  };
  const get = (req, res) => {
    let query = {};
    if (req.query.genre) query.genre = req.query.genre;

    Book.find(query, (err, books) => {
      if (err) res.status(500).send(err);
      let returnBooks = [];
      books.forEach((elem, i, arr) => {
        let el = elem.toJSON();
        el.links = {};
        el.links.self = `http://${req.headers.host}/api/books/${el._id}`;
        returnBooks.push(el);
      });
      res.json(returnBooks);
    });
  };
  const getOne = (req, res) => {
    let returnBook = req.book.toJSON();
    returnBook.links = {};
    let newLink = `http://${req.headers.host}api/books?genre=${returnBook.genre}`;
    returnBook.links.filterByThisGenre = newLink.replace(' ', '%20');
    res.json(returnBook);
  };
  const put = (req, res) => {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save(err => {
      if (err) res.status(500).send(err);
      else res.json(req.book);
    });
  };
  const patch = (req, res) => {
    if (req.body._id) delete req.body._id;
    for (let p in req.body) {
      req.book[p] = req.body[p];
    }
    req.book.save(err => {
      if (err) res.status(500).send(err);
      else res.json(req.book);
    });
  };
  const deleteOne = (req, res) => {
    req.book.remove(err => {
      if (err) res.status(500).send(err);
      else res.status(204).send('Removed');
    });
  };
  const returnOne = (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) res.status(500).send(err);
      else if (book) {
        req.book = book;
        next();
      } else res.status(404).send('no book found');
    });
  };

  return {
    get: get,
    post: post,
    getOne: getOne,
    put: put,
    patch: patch,
    delete: deleteOne,
    returnOne: returnOne
  };
};

module.exports = bookController;
