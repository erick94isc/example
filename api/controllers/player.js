'use strict';


var mongoose = require('mongoose'),
Jugador = mongoose.model('jugador');

exports.all_players = function(req, res) {
  Jugador.find({equipo: req.params.id}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_player = function(req, res) {
  var new_player = new Jugador(req.body);
  //new_player.equipo = ObjectId.fromString(req.params.id);
  console.log(req.params.id);
  /*new_player.save(function(err, task) {
    if (!err){
     res.json(task);
     console.log(task);
    }else{
         res.send(err);
    }
  });*/
};


exports.read_player = function(req, res) {
  Jugador.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_player = function(req, res) {
  Jugador.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_player = function(req, res) {
  Jugador.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Player successfully deleted' });
  });
};
