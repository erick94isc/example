var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usuarioSchema = new Schema({
   nombre:{
    type: String,
    required: [true,'enter username']
  },
  apellido:{
    type:String,
    required: [true, 'Why no lastname?']
  },
  username:{
    type:String,
    required:true
  },
  email: {  
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  rol:{
    type:String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('usuario', usuarioSchema,'usuario');