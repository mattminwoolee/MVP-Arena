require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/stage/:name', (req, res) => {
  // console.log('req.params: ', req.params.name);
  db.selectOne(req.params.name, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
})

app.get('/api/stages', (req, res) => {
  db.selectAll( (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
})

app.post('/api/stages', bodyParser.json(), (req, res) => {
  // console.log('req.body: ', req.body);
  db.saveBoard(req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })
})

app.delete('/api/stages', (req, res) => {
    db.deleteAll( (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
})

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// kill $(lsof -t -i:3001)