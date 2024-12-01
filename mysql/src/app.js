//npm install express mysql express-myconnection morgan ejs
import express from 'express';
//import morgan from 'morgan';//Morgan pone en consola informacion de las peticiones, solo para dev
import mysql from 'mysql';
import myConnection from 'express-myconnection';
const app = express();
import customerRoutes from './routes/usuario.js'


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
//app.set('views', './views');

//app.use(morgan('dev'));
app.use(myConnection(mysql, {//Abrir xampp, abrir conexion con mysql workbench y crear base de datos adentro
    host: 'localhost',//Url de la base de datos, localhost para 127.0.0.1
    user: 'root',
    password: '',
    port: 3306,//Usar este
    database: 'usuarios'//Base de datos concreta/shcema dentro del mysql
}, 'single'));

app.use('/', customerRoutes);

app.use(express.static('./public'));


app.listen(app.get('port'), () => {
    console.log("iniciado");
});
