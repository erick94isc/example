'use strict';


var mongoose = require('mongoose'),
Partido = mongoose.model('partido');
const STATUS_ENUM = require('./status');

exports.allMatch = async function(req,res){
	try{
		const partidos = await Partido.find({torneo:req.params.id});
		if(partidos){
			res.status(200).send({code:200,partidos});
		}else{
			throw new StatusError(STATUS_ENUM.STATUS_ERROR.NOT_FOUND);
		}
	}catch(error){
		 console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR })
            }
	}
}

exports.read_match = async function(req,res){
	try{
		const partido = await Partido.findById(req.params.id);
		if(partido){
			res.status(200).send({code:200,partido});
		}else{
			throw new StatusError(STATUS_ENUM.STATUS_ERROR.NOT_FOUND);
		}
	}catch(error){
		console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR })
            }
	}
}

exports.create_match = async function(req,res){
	try{
		var new_match = new Partido(req.body);
		const response = await new_match.save();
		res.status(200).send({code:200,message:'It was ok!'});

	}catch(error){
		console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR })
            }
	}
}

exports.update_match= async function(req,res){
	try{
		const partido = await Partido.findOneAndUpdate({_id: req.params.id}, req.body, {useFindAndModify: false});
		res.status(200).send({code:200,message:'Match updated'});
	}catch(error){
		console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR })
            }
	}
}

exports.delete_match = async function(req,res){
	try{
		const response = await Partido.deleteOne({_id: req.params.id});
		 res.status(200).send({code:200,message:'Jugador deleted',response})
	}catch(error){
		console.error(error)
                if (error instanceof StatusError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...STATUS_ENUM.STATUS_ERROR.ERROR, jugador })
            }
	}
}

function StatusError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}