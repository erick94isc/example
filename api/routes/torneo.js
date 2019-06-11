'use strict';
module.exports = function(app) {
 var torneoController = require('../controllers/torneo');

  // todoList Routes
  app.route('/torneo')
    .get(torneoController.all_torneo)
    .post(torneoController.create_torneo);


  app.route('/torneo/:id')
    .get(torneoController.read_torneo)
    .put(torneoController.update_torneo)
    .delete(torneoController.delete_torneo);
};