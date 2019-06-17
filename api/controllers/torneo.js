'use strict';


var mongoose = require('mongoose'),
Torneo = mongoose.model('torneo');
const STATUS_ENUM = require('./status');

exports.all_torneo = function(req, res) {
  Torneo.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_torneo = async function(req, res) {
  try{
        var new_torneo = new Torneo(req.body);
       const response= await new_torneo.save();
       res.status(200).send({code:200,message:'it was ok'});
  }catch(error){
      if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }
      console.error(error)
      res.status(500).send({code:500, message: 'Something Went Wrong' })
   }
};


exports.read_torneo= function(req, res) {
  Torneo.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_torneo = async function(req, res) {
    try{
     const torneo= await Torneo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
      res.status(200).send({code:200,message:'Torneo updated',response});
    }catch(error){
       if (e instanceof StatusError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({code:500, message: 'Something Went Wrong' })
          }
    }
};


exports.delete_torneo = async function(req, res) {
  try{
   const response = await Torneo.remove({_id: req.params.id});
   res.status(200).send({code:200,message:'Torneo deleted',response})
  }catch(error){
       if (e instanceof StatusError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({code:500, message: 'Something Went Wrong' })
          }
  }
};

function StatusError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
}
