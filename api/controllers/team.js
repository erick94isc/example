'use strict';


var mongoose = require('mongoose'),
Equipo = mongoose.model('equipo');
var ObjectId = require('mongoose').Types.ObjectId; 
const STATUS_ENUM = require('./status');

exports.all_teams = async function(req, res) {
  try{
    const equipos = await Equipo.find({});
    if(equipos){
        res.status(200).send({code:200,equipos})
        //res.json(equipos);
    }else{
         throw new StatusError(STATUS_ENUM.STATUS_ERROR.NOT_FOUND);
    }
  }
  catch(error){
    if (error instanceof StatusError) {
             res.status(error.status).send(error)
          }
        else{
         res.status(500).send(...STATUS_ENUM.STATUS_ERROR.ERROR);
        }
  }
};


exports.create_team = async function(req, res) {
  try{
        var new_team = new Equipo(req.body);
        const response = await new_team.save();
        res.status(200).send({code:200,message:'it was ok'})
  }
  catch(error){
         if (error instanceof StatusError) {
             res.status(error.status).send(error)
          }
         console.error(error)
         res.status(500).send({code:500, message: 'Something Went Wrong' })
  }
};


exports.read_team = async function(req, res) {
  try{
   const equipo= await Equipo.findById(req.params.id);
   if(equipo){
     res.status(200).send({code:200,equipo})
   }else{
     throw new StatusError(STATUS_ENUM.STATUS_ERROR.NOT_FOUND);
   }
  }catch(error){
      console.error(e)
          if (e instanceof StatusError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({ message: 'Something Went Wrong' })
          }
  }
};


exports.update_team = async function(req, res) {
   try{
     const equipo= await Equipo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
     res.status(200).send({code:200,message:'Team updated',response});
   }
   catch(error){
       if (e instanceof StatusError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({code:500, message: 'Something Went Wrong' })
          }
   }
};


exports.delete_team = async function(req, res) {
  try{
    const response= await  Equipo.remove({_id: req.params.id});
    res.status(200).send({code:200,message:'Team deleted',response})
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