const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser');

const UserController = require('./src/controllers/UserController')

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://juanda:S3cur3P4ssw0rd@ds261626.mlab.com:61626/juandadb';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/user', (req, res) => {
  UserController.create(req.body)
      .then( result =>
        res.json({
          success: 1,
          data: result
        })
      )
      .catch( reason =>
          res.send(404,{
            success: 0,
            error: reason
          })
      )
});

app.post('/api/victory', (req, res) => {
  UserController.addVictory(req.body)
      .then( result =>
          res.json({
            success: 1,
            data: result
          })
      )
      .catch( reason =>
          res.send(404,{
            success: 0,
            error: reason
          })
      )
});

app.get('/api/high-scores', (req, res) => {
  UserController.listHighScores()
      .then( result => {
        res.send(result)
      })
      .catch( reason =>
          res.send(404,{
            success: 0,
            error: reason
          })
      )
});

const connectDb = () => {
  const options = {
    'server' : {
      'socketOptions' : {
        'keepAlive' : 300000,
        'connectTimeoutMS' : 30000
      }
    },
    'useNewUrlParser': true
  }
  return mongoose.connect(DATABASE_URL, options);
};

connectDb()
    .then( () => {
      app.listen(PORT, () =>
          console.log(`Listening on port ${PORT}!`),
      );
    })
    .catch( reason => {
      console.log('Something Wrong!', reason)
    });

//app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
