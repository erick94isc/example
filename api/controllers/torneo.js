'use strict';


var mongoose = require('mongoose'),
Torneo = mongoose.model('torneo');
const STATUS_ENUM = require('./status');

exports.all_torneo = async function(req, res) {
  try{
    let query={};
    let nombre = req.query.nombre;
    if(nombre != ''){
      const nombreRegex = new RegExp(nombre, 'i')
      query={nombre:nombreRegex};
    }
    let torneos= await Torneo.find(query);
     if(torneos){
          res.status(200).send({code:200, torneos});
     }else{
        throw new StatusError(STATUS_ENUM.STATUS_ERROR.NOT_FOUND);
     }
  }catch(error){
       console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR, jugador })
            }
 }
};

exports.create_torneo = async function(req, res) {
  try{
       var nombre = req.body.nombre;
       var torneo = await Torneo.findOne({nombre:nombre});
         if(torneo){
           throw new StatusError(STATUS_ENUM.STATUS_ERROR.DUPLICATE);
         }
       var new_torneo = new Torneo(req.body);
       const response= await new_torneo.save();
       res.status(200).send({code:200,message:'it was ok'});
  }catch(error){
       console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
   }
};


exports.read_torneo= async function(req, res) {
   try{
     const torneo= await Torneo.findById(req.params.id);
      if(torneo){
        res.status(200).send({code:200,torneo});
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


exports.update_torneo = async function(req, res) {
    try{
     const torneo= await Torneo.findOneAndUpdate({_id: req.params.id}, req.body, {useFindAndModify: false});
      res.status(200).send({code:200,message:'Torneo updated',torneo});
    }catch(error){
           console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
   }
};


exports.delete_torneo = async function(req, res) {
  try{
   const response = await Torneo.deleteOne({_id: req.params.id});
   res.status(200).send({code:200,message:'Torneo deleted',response})
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
