var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	nombre:{
		type:String,
		required:true
	},
	torneo:{
		type:String,
		required:true
	},
	color:{
		type:String,
		required:false
	},
	Created_date: {
    type: Date,
    default: Date.now
  },
  posicion:{
  	type:Number,
  	default:0
  },
  puntos:{
  	type:Number,
  	default:0
  }
});

module.exports = mongoose.model('equipo',teamSchema,'equipo');
