'use strict';


var mongoose = require('mongoose'),
Usuario = mongoose.model('usuario');

exports.all_users = function(req, res) {
  Usuario.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_user = function(req, res) {
  var new_usuario = new Usuario(req.body);
  new_usuario.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_user = function(req, res) {
  Usuario.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_user = function(req, res) {
  Usuario.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_user = function(req, res) {
  Usuario.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Usuario successfully deleted' });
  });
};
