var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidoSchema = new Schema({
	equipo1:{
		type:String,
		required:true
	},
	equipo2:{
		type:String,
		required:true	
	},
	fecha:{
		type:Date,
		required:true
	},
	hora:{
		type:String,
		required:true
	},
	torneo:{
		 type: mongoose.Schema.Types.ObjectId, 
         ref: 'torneo'
	},
	 Created_date: {
	    type: Date,
	    default: Date.now
  }
});

module.exports = mongoose.model('partido',partidoSchema,'partido');