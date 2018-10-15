var mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var stageCollectionSchema = mongoose.Schema({
  name: String,
  previous: Object,
  next: Object,
  dancers: Object,
  board: Array
});

var Stage = mongoose.model('Stage', stageCollectionSchema);

const selectAll = (callback) => {
  Stage.find({}, (err, items) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const saveBoard = (obj, callback) => {
  // grab previous from the database
  const newBoard = new Stage({
    name: obj.name,
    previous: 'null',
    dancers: obj.dancers,
    board: obj.board
  });

  newBoard.save( (err, data) => {
    if (err) {
      console.log('Save was NOT successful')
      callback(err, null);
    } else {
      console.log('Save was successful');
      callback(null, data);
    }
  });
}

module.exports = {
  selectAll,
  saveBoard
}