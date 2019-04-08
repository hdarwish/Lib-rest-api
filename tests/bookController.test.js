const sinon = require('sinon'),
  Book = require('./../models/bookModel');

describe('Book Controller Tests', () => {
  describe('Post', () => {
    it('should not allow a empty title on post', () => {
      // let Book = book => {
      //   let save = () => {};
      // };
      let req = {
        body: {
          author: 'Mario Teik'
        }
      };
      let res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      const bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
