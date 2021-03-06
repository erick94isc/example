var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var playerSchema = new Schema({
   nombre:{
    type: String,
    required: 'enter username'
  },
  apellido:{
    type:String,
    required: [true, 'Why no lastname?']
  },
  fecha_nacimiento: {  
    type:String,
    required: false
  },
  telefono:{
    type:Number
  } ,
  posicion:{
    type: String,  
    required: true
  },
  numero:{
     type: Number,
     required: true
  },
  goles:{
      type: Number,
      required: false
  },
  tarjetas_amarillas:{
             type: Number,
             required: false,
             default:0
         },
  tarjetas_rojas:{
             type: Number,
             required: false,
             default:0
         }   
  ,
  equipo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'equipo'
    },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('jugador', playerSchema,'jugador');