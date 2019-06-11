'use strict';
module.exports = function(app) {
 var playerController = require('../controllers/player');
 
  // todoList Routes
  /*app.route('/jugador')
    .post(playerController.create_player);*/
  
  app.route('/jugadores/:id')
   .get(playerController.all_players);

  app.route('/jugador/:id')
    .get(playerController.read_player)
    .put(playerController.update_player)
    .delete(playerController.delete_player)
    .post(playerController.create_player);
};