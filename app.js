const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
let db;
if (process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/bookAPI_test', {
    useMongoClient: true
  });
} else {
  db = mongoose.connect('mongodb://localhost/books', {
    useMongoClient: true
  });
}
const Book = require('./models/bookModel');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bookRouter = require('./routes/bookRouter')(Book);
app.use('/api/books', bookRouter);
app.get('/', function(req, res) {
  res.send('Welcome to my API');
});
app.disable('x-powered-by');
app.listen(port, function() {
  console.log('Running on port: ' + port);
});
module.exports = app;
