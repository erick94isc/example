'use strict';
module.exports = function(app) {
	var matchController = require('../controllers/match');

	app.route('/partido')
	.post(matchController.create_match);

	app.route('/partidos/:id')
	.get(matchController.allMatch);

	app.route('/partido/:id')
	.get(matchController.read_match)
	.put(matchController.update_match)
	.delete(matchController.delete_match);

}