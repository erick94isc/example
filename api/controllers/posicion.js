'use strict';


var mongoose = require('mongoose'),
Posicion = mongoose.model('posicion');

exports.all_position = function(req, res) {
  Posicion.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_position = function(req, res) {
  var new_position = new Posicion(req.body);
  new_position.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};