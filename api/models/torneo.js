var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var leagueSchema = new Schema({
	nombre:{
		type:String,
		required:true
	},
	categoria:{
		type:String,
		required:true
	},
	fecha_inicio: {
	    type: Date,
	    default: Date.now
  },
  fecha_fin: {
	    type: Date,
	    default: Date.now
  } ,
   Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('torneo',leagueSchema,'torneo');