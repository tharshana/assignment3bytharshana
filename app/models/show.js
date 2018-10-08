
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var showSchema = mongoose.Schema({
  seriesName: String,
  firstAired: String,
  id: Number,
  network: String,
  overview: String,
  slug: String,
  status: String,
  subscriber : Array
});

module.exports = mongoose.model('Show', showSchema);


module.exports.createShow = (newShow, callback) => {
  newShow.save(callback);
}
