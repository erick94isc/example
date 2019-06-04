var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var posicionSchema = new Schema({
   nombre:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('posicion', posicionSchema,'posicion');