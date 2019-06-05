'use strict';
module.exports = function(app) {
 var playerController = require('../controllers/player');
 
  // todoList Routes
  app.route('/jugador')
    .get(playerController.all_players)
    .post(playerController.create_player);


  app.route('/jugador/:id')
    .get(playerController.read_player)
    .put(playerController.update_player)
    .delete(playerController.delete_player);
};