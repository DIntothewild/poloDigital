const express = require('express');
const { request } = require('http');
const app = express();
const mysql = require("mysql2");
//const { Connection } = require('mysql2/typings/mysql/lib/Connection');

app.use(express.static('public'));
app.use(express.json());

//crear conexion con mysql (base de datos)
const connection = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password:"7075",
    database:"polo_digital", 
});

//conectar con mysql
connection.connect(function(error){
    if (error){
        return console.error(`error: ${error.message}`);
    }
    console.log("conectado a MySQL!!!");
});
/**
 * Funciones utiles.........................................................................
 */
function handleSQLerror (response, error, result, callback){
    if (error) {
        response.status(400).send (`error: ${error.message}`);
        return
    }
    callback (result);   

    }
/**
 * Termina funciones utiles................................................................
 */

/**
 * Endpoint para el index.............................................................................................
 */
// Esta línea usa el método app.get() para definir
// una ruta que recibe dos parámetros: request y response
app.get('/carrusel', function(request, response){
       //select * from eventos
       // Dentro de la ruta, se ejecuta una consulta SQL para seleccionar todos los 
       //registros de la tabla 'eventos' de la base de datos.
    connection.query("select * from eventos", function(error, result, fields){
                                         // Esta línea usa el método connection.query() 
                                        // para ejecutar una consulta SQL que recibe tres parámetros: error, result y fields.
       handleSQLerror(response, error, result,function(result){
        let total = request.query.total;
        let eventos = [];

        for (let i = 0; i < total; i++) {
            eventos[i] = result[i];

        }
         response.send(eventos);   
       });
          
    });                               
   
});
    
app.get('/evento/:idEvento', function(request, response){
    const idEvento = request.params.idEvento;

    connection.query(`select * from usuarios where id = ${idevento}`, function(error, result, fields) {
        handleSQLerror (response, error, result, function(result) {
            if (result.lenght == 0){
                response.send({});
            } else {
                response.send (result[0]);
            }
         })
      });
    }); 
   
/**
 * Termina index .....................................................................................................
 */
/**
 * endpoint para login y registro...............................................
 * Ejemplo URL: http://localhost:8000/login? email = isare@email.com&password=1234
 */
app.get("login", function(resquest, response){
    const email = request.query.email;
    const password = request.query.password;
    const modoNuevo = `select * from usuarios where email = '${email}' and password = '${password}'`;
    console.log(modoNuevo);
    connection.query("select * from usuarios where email'" + email + "' and password = '" + password + "'", function(error, result, fields){
        handleSQLerror(response, error, result, function(result){
            console.log(result);

        if (result.lenght == 0) {
            response.send({ message: "Email o password no validos"});
        } else {
            response.send({ message: "Usuario logueado"});
        }
        });
    });
});

app.post("/registro", function(request, response){
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let cliente_ID = request.body.cliente_ID;
    let usuario_ID = request.body.usuarios_ID;

    console.log(request.body);

    //1.insert into empleados_clientes;
    connection.query(
        `insert into empleados_clientes (nombre, apellidos, usuario_ID, cliente_ID) VALUES ('${nombre}','${apellidos},'${usuario_ID},'${cliente_ID}')`,
        function (error, result, fields) {
            if (error) {
                response.status(400).send(`error${error.message}`);
                return;
            }
            response.send("usuario resgistrado");
        });
         
    
    //2.insert into usuarios
    //connection.query(`insert into usuarios (email, password) values ("${email}", "${password}")`, function(error, result, fields){
       // const usuario_ID = result[0].id;
        
    //3. insert into empleados_clientes con usuariosId
    //connection.query(`insert into empleados_clientes (nombre, apellidos, ...) values`)
    //}`)
});

/**
 * Termina login y resgistro..........................................................................
 */
app.listen(8000, function(){
    console.log('Server up and running!!!')
});

/**
 * Endpoints para Clientes
 */

//app.get("/clientes)




