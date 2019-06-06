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
	categoria:{
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
  }
});

module.exports = mongoose.model('equipo',teamSchema,'equipo');