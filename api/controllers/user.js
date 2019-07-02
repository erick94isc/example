'use strict';


var mongoose = require('mongoose'),
Usuario = mongoose.model('usuario');
const STATUS_ENUM = require('./status');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';
const jwt = require('jsonwebtoken');

exports.all_users = function(req, res) {
  Usuario.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.loginUser= async function(req,res){
  try{
     const usuario = await Usuario.findOne({email:req.body.email});
       if(!usuario){
          throw new StatusError(STATUS_ENUM.STATUS_ERROR.INVALID_EMAIL);
       }
     const resultPassword = bcrypt.compareSync(req.body.password,usuario.password);
     if(resultPassword){
          const expiresIn = 24*60*60;
          const accessToken  = jwt.sign({id: usuario._id},
          SECRET_KEY,{
            expiresIn :expiresIn
          });

          const dataUser={
          name: usuario.nombre + usuario.apellido,
          email: usuario.email,
          id:usuario._id,
          username:usuario.username,
          accessToken: accessToken,
          expires:expiresIn
        }
        res.status(200).send({code:200,dataUser});
     }else{
         res.status(403).send({code:403,message:'Invalid Password'});
     }
  }catch(error){
     if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{
          console.log(error);
      res.status(500).send({ message: 'Something Went Wrong' })
      }
   }
};

exports.create_user = async function(req, res) {
    try{
     const email = await Usuario.findOne({email:req.body.email});
       if(email){
          throw new StatusError(STATUS_ENUM.STATUS_ERROR.DUPLICATE);
       }
        var new_usuario = new Usuario(req.body);
        new_usuario.password = bcrypt.hashSync(req.body.password);
        var usuario = await new_usuario.save();
        const expiresIn = 24*60*60;
        const accessToken  = jwt.sign({id: usuario._id},
          SECRET_KEY,{
            expiresIn :expiresIn
          });
        const dataUser={
          name: usuario.nombre + usuario.apellido,
          email: usuario.email,
          username:usuario.username,
          accessToken: accessToken,
          expires:expiresIn
        }
        res.status(200).send({code:200,dataUser});
    }catch(error){
        if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{
          console.log(error);
        res.status(500).send({ message: 'Something Went Wrong' })
      }
  }
};


exports.read_user = async function(req, res) {
  try{
    let usuario = await Usuario.findById(req.params.id);
    console.log(usuario);
     if(usuario){
        res.status(200).send({code:200,usuario});
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


exports.update_user =async function(req, res) {
    try{
     const usuario= await Usuario.findOneAndUpdate({_id: req.params.id}, req.body, {useFindAndModify: false});
     res.status(200).send({code:200,message:'User updated',usuario});
    }catch(error){
            console.error(error)
       if (error instanceof StatusError)  {
          res.status(error.status).send(error)
        }else{        
           res.status(500).send({code:500, message: 'Something Went Wrong' })
        }
    }
};


exports.delete_user = function(req, res) {
  Usuario.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Usuario successfully deleted' });
  });
};

function StatusError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}