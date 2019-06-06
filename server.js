var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  usuario = require('./api/models/user'), //created model loading here
  posicion = require('./api/models/posicion'), 
  jugador = require('./api/models/player'),
  equipo = require('./api/models/team'),
  bodyParser = require('body-parser');
 
 var cors = require('cors');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/quiniela', { useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 

var routes = require('./api/routes/user'); //importing route
var posicionRoute = require('./api/routes/posicion');
var jugadorRoute = require('./api/routes/player');
var equipoRoute = require('./api/routes/team');
routes(app); //register the route
posicionRoute(app);
jugadorRoute(app);
equipoRoute(app);

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);