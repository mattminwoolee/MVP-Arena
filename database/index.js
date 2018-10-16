var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds131903.mlab.com:31903/stages`);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var stageCollectionSchema = mongoose.Schema({
  id: Number,
  name: String,
  previous: Object,
  next: Object,
  dancers: Object,
  board: Array
});

var Stage = mongoose.model('Stage', stageCollectionSchema);

const selectOne = (name, callback) => {
  Stage.find( {name: name}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

const selectAll = (callback) => {
  Stage.find({}, (err, items) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  }).sort({"_id":1});
};

const saveBoard = (obj, callback) => {
  // grab most recent board and set it as the previous board
  Stage.find( (err, data) => {
    let newBoard;
    if (!data[0]) {
      newBoard = new Stage({
        name: obj.name,
        previous: null,
        next: null,
        dancers: obj.dancers,
        board: obj.board
      });
      newBoard.save( (err, content) => {
        if (err) {
          console.log('Save was NOT successful')
          callback(err, null);
        } else {
          console.log('Save was successful');
          callback(null, content);
        }
      });
    } else {
      console.log('data[0]._id', data[0]._id);
      console.log('obj.name: ', obj.name);
      Stage.updateOne( { "_id": data[0]._id }, { $set: { "next": obj.dancers } }, (err, success) => {
        if (err) {
          console.log(err);
        } else {
          newBoard = new Stage({
            name: obj.name,
            previous: data[0].dancers,
            next: null,
            dancers: obj.dancers,
            board: obj.board
          });
          newBoard.save( (err, content) => {
            if (err) {
              console.log('Save was NOT successful')
              callback(err, null);
            } else {
              console.log('Save was successful');
              callback(null, content);
            }
          });
        }
      });
    }
  }).limit(1).sort({"_id":-1});
}

module.exports = {
  selectOne,
  selectAll,
  saveBoard
}
