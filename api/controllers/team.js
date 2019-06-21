'use strict';


var mongoose = require('mongoose'),
Equipo = mongoose.model('equipo');
var ObjectId = require('mongoose').Types.ObjectId; 
const STATUS_ENUM = require('./status');

exports.all_teams = async function(req, res) {
  try{
    let query={};
    let torneo = req.query.torneo;
    let nombre = req.query.nombre;
     if(torneo != '' && nombre != ''){
        const nombreRegex = new RegExp(nombre, 'i')
        query ={ nombre:nombreRegex,torneo:torneo};
     }else if(torneo != ''){
         query={torneo:torneo};
     }
     else if(nombre !=''){
         const nombreRegex = new RegExp(nombre, 'i')
         query={nombre:nombreRegex};
     }
    const equipos = await Equipo.find(query);
    if(equipos){
        res.status(200).send({code:200,equipos})
    }else{
         throw new StatusError(STATUS_ENUM.NOT_FOUND);
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
      var nombreEquipo = req.body.nombre;
      const team = await Equipo.findOne({ nombre: nombreEquipo})    
        if(team){   
          console.log(team);          
          throw new StatusError(STATUS_ENUM.STATUS_ERROR.DUPLICATE);
        }
      var new_team = new Equipo(req.body);
      const response = await new_team.save();
      res.status(200).send({code:200,message:'it was ok'})
  }
  catch(error){
         if (error instanceof StatusError) {
             res.status(error.status).send(error) 
              console.error(error)
          }else{
             console.error(error)

         res.status(500).send({ message: 'Something Went Wrong' })
          }
        
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
           console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
   }
};


exports.update_team = async function(req, res) {
   try{
     console.log( req.params.id);
     const equipo= await Equipo.findOneAndUpdate({_id: req.params.id}, req.body,  {useFindAndModify: false});
     res.status(200).send({code:200,message:'Team updated',equipo});
   }
   catch(error){
           console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
   }
};


exports.delete_team = async function(req, res) {
  try{
    const response= await  Equipo.deleteOne({_id: req.params.id});
    res.status(200).send({code:200,message:'Team deleted',response})
  }catch(error){
           console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
   }
};

function StatusError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}