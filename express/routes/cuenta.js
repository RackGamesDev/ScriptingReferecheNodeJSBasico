import express from 'express';
import {usersdb} from '../bbdd.js';//importando una base de datos de mentira
const accountRouter = express.Router();//es como crear una subporcion de codigo con varias rutas

//las funciones se ponen en el router, los middlewares que se activen aqui solo funcionaran para este router
accountRouter.use((req, res, next) => {//esto se ejecutara con cualquiera de las funciones del router
    console.log(req.ip);
    next();
});

accountRouter.get('/:guid', (req, res) => {//conseguir datos (pasando el username por url devuelve el usuario entero)
    const user = usersdb.find(user => user.username === req.params.guid);
    if(!user){
       return res.statusCode(404).send();
    } else {
        return res.send(user);
    }
});
accountRouter.post('/', (req, res) => {//crear datos si no estaban ya creados (crea una cuenta con los datos pasados por el body)
    const {guid, name} = req.body;
    if(!guid || !name) return res.state(400).send();
    const user = usersdb.find(user => user.username === req.params.guid);
    if (!user) return res.status(409).send();
    usersdb.push(guid, name);
    return res.send();
});
accountRouter.patch('/:guid', (req, res) => {//actualizar datos ya existentes (cambia el nombre del usuario de la url por el name en el body)
    const {name} = req.body;
    if(!name) return res.state(400).send();
    const user = usersdb.find(user => user.username === req.params.guid);
    if (!user)  return res.status(404).send();
    user.name = name;
    return res.send();
});
accountRouter.delete('/:guid', (req, res) => {//eliminar datos (elimina una cuenta, la que se especifique en la url)
    const userIndex = usersdb.findIndex((user) => user.username === req.params.guid);
    if(userIndex === -1){
        return res.statusCode(404).send();
    } else {
        usersdb.splice(userIndex, 1);
        return res.send();
    }
});

export default accountRouter;