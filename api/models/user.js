var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usuarioSchema = new Schema({
   nombre:{
    type: String,
    required: 'enter username'
  },
  apellido:{
    type:String,
    required: [true, 'Why no lastname?']
  },
  username: {  
    type:String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('usuario', usuarioSchema);