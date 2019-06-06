'use strict';


var mongoose = require('mongoose'),
Equipo = mongoose.model('equipo');

exports.all_teams = function(req, res) {
  Equipo.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_team = function(req, res) {
  var new_team = new Equipo(req.body);
  new_team.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_team = function(req, res) {
  Equipo.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_team = function(req, res) {
  Equipo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_team = function(req, res) {
  Equipo.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Player successfully deleted' });
  });
};
