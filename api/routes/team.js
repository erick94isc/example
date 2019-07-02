'use strict';
module.exports = function(app) {
 var teamController = require('../controllers/team');
 
  // todoList Routes
  app.route('/equipo')
  	.get(teamController.all_teams)
    .post(teamController.create_team);

  app.route('/equipo/:id')
    .get(teamController.read_team)
    .put(teamController.update_team)
    .delete(teamController.delete_team);

    app.route('/equipoFilter')
    .get(teamController.teams_filter);
};