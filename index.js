'use strict'


//NOTA: para ejecutar en local -> npm run start:dev

var mongoose = require('mongoose');
require("dotenv").config();

var app = require('./app');
var cors = require('cors')

//Establecer puerto
app.set("port",process.env.PORT || 3700);

//Configurar CORS
app.use(cors());

/*
Conexion a base de datos local
 */

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/CRUD_persons')
//         .then(() => {
//         	console.log("Conexión a la base de datos establecida satisfactoriamente");

//         	// Creacion del servidor
//         	app.listen(app.get("port"), () => {
//         		console.log("Servidor corriendo correctamente en en el puerto:"+port);
//         	});

//         })
//         .catch(err => console.log(err));


/*
Conexion a base de datos en la nube
 */

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CN)
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente");

        	// Creacion del servidor
        	app.listen(app.get("port"), () => {
        		console.log("Servidor corriendo correctamente en en el puerto:"+process.env.PORT);
        	});

        })
        .catch(err => console.log(err));