'use strict';
module.exports = function(app) {
 var posicionController = require('../controllers/posicion');

  // todoList Routes
  app.route('/posicion')
    .get(posicionController.all_position);

 app.route('/posicion')
    .post(posicionController.create_position);

};