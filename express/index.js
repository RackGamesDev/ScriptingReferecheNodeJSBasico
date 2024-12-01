//Express es una libreria externa para manejar peticiones y paquetes, se instala con npm i -E express, haciendo primero el package.json con npm init --y, aparecera en dependencies
//El archivo .env tiene las variables de entorno (no hay que ponerlo en un repositorio) y el .env.example si se sube y es para ver solo el formato, .gitignore identifica que cosas no se subiran al repositorio
import { createServer} from "http";
import express  from "express";

import dotenv from 'dotenv';
dotenv.config();
const puerto = process.env.PORT || 3000;//Despues de instalar con nmp i dotenv se pueden usar las variables del .env

const expressApp = express();
expressApp.use(express.json());//Activar el middleware para parsear el body json
expressApp.use(express.text());//Activar el middleware para parsear el body txt

expressApp.get("/ajustes", (req, res) => {//La diferencia esta en que en express pones el tipo de peticion como funcion (get), la url relativa en la pagina y luego la funcion que ejecuta cuando llega la peticion. el .all llega con cualquier tipo de peticion
    res.send("la pagina de ajustes");
    console.log(req.get("accept"));//Permite devolver un parametro en concreto del header
    console.log(req.query);//Devuelve lo que haya despues del ?
    res.status(401).send({errorMessage: "no"});//Permite devolver errores dependiendo del status
    console.log(req.body);//Se puede obtener el body directamente, para que se parsee hay que usar los middlewares
    console.log(req.ip);//La ip
    //req y res tienen muchas propiedades y funciones, estan explicadas en la documentacion de express
});
expressApp.get("/ajustes/:id/:hola", (req, res) => {//Lo que haya despues del : es opcional y la funcion se ejecutara sin importar lo que lleve (ej: localhost.x/ajustes/3497/asdfkj)
    console.log("ajustes de " + req.params.id);//Se usa esto para acceder a esa parte de la url
});

import accountRouter from "./routes/cuenta.js";//Este archivo exporta un route con varias funciones
expressApp.use("/cuenta", accountRouter);//Metiendo el router en el principal, para que sus funciones se ejecuten aqui

import authRouter from "./routes/auth.js";
expressApp.use("/auth", authRouter);


//Aqui dentro se usa una libreria, npm i nanoid y npm i cookie-parser
import cookieParser from "cookie-parser";
expressApp.use(cookieParser());//Este paquete se usa como un middleware
import authSessionRouter from "./routes/auth_session.js"
expressApp.use("/auth-session", authSessionRouter);
import authTokenRouter from "./routes/auth_token.js"
expressApp.use("/auth-token", authTokenRouter);


expressApp.listen(puerto, () => console.log("levantado en " + puerto));
