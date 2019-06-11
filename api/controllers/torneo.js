'use strict';


var mongoose = require('mongoose'),
Torneo = mongoose.model('torneo');

exports.all_torneo = function(req, res) {
  Torneo.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_torneo = function(req, res) {
  var new_torneo = new Torneo(req.body);
  new_torneo.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_torneo= function(req, res) {
  Torneo.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_torneo = function(req, res) {
  Torneo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_torneo = function(req, res) {
  Torneo.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Player successfully deleted' });
  });
};
