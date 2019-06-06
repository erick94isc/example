var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var leagueSchema = new Schema({

	nombre:{
		type:String,
		required:true
	},
	Created_date: {
	    type: Date,
	    default: Date.now
  }
});

module.exports = mongoose.model('torneo',teamSchema,'torneo');