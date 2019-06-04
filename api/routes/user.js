'use strict';
module.exports = function(app) {
 var usuarioController = require('../controllers/user');

  // todoList Routes
  app.route('/usuario')
    .get(usuarioController.all_users)
    .post(usuarioController.create_user);


  app.route('/usuario/:id')
    .get(usuarioController.read_user)
    .put(usuarioController.update_user)
    .delete(usuarioController.delete_user);
};