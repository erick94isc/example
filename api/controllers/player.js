'use strict';


var mongoose = require('mongoose'),
Jugador = mongoose.model('jugador');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const STATUS_ENUM = require('./status');

exports.all_players = async function(req, res) {
 try{
    const jugadores= await Jugador.find({equipo: req.params.id});
      if(jugadores){
           res.status(200).send({code:200, jugadores});
      }
       else{
                throw new StatusError(STATUS_ENUM.STATUS_ERROR.NOT_FOUND);
            }
 }
 catch(error){
       console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR, jugador })
            }
 }
};


exports.create_player = async function(req, res) {
 try{
   var nombreJugador = req.body.nombre;
   var apellidoJugador = req.body.apellido;
   var jugador = await Jugador.findOne({nombre:nombreJugador, apellido:apellidoJugador});
       if(jugador){
          throw new StatusError(STATUS_ENUM.STATUS_ERROR.DUPLICATE);
      }
    var new_player = new Jugador(req.body);
    const response = await new_player.save();
     res.status(200).send({message:'it was ok'});
 }
 catch(error){
    if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{
      res.status(500).send({ message: 'Something Went Wrong' })
      }
   }
};


exports.read_player = async function(req, res) {
   try{
     const jugador = await Jugador.findById(req.params.id);
     if(jugador){
        res.status(200).send({code:200,jugador});
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


exports.update_player = async function(req, res) {
   try{
     const jugador= await Jugador.findOneAndUpdate({_id: req.params.id}, req.body, {useFindAndModify: false});
     res.status(200).send({code:200,message:'Player updated',jugador});
   }catch(error){
           console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
   }
};


exports.delete_player = async function(req, res) {
 try{
    const response= await  Jugador.deleteOne({_id: req.params.id});
    res.status(200).send({code:200,message:'Jugador deleted',response})
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