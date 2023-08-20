//autentificacion es el metodo para saber si un usuario es quien dice ser (ej: login con contrasegna) y autorizacion es para comprobar los usuarios que tienen acceso a algo
import {Router} from 'express';
import {usersdb} from '../bbdd.js'
const authRouter = Router();

//ejemplo para inicios de sesion
authRouter.get("publico", (req, res) => res.send("endpoint publico"));

authRouter.post("autenticado", (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    const user = usersdb.find(user => user.email === email);
    if (!user) return res.sendStatus(401);
    if(user.password !== password) return res.sendStatus(403);
    res.send("usuario " + user.name + " es correcto");
});

authRouter.post("autorizado", (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    const user = usersdb.find(user => user.email === email);
    if (!user) return res.sendStatus(401);
    if(user.password !== password) return res.sendStatus(403);
    if(user.role !== 'admin') return res.sendStatus(403);
    res.send("usuario administrador" + user.name + " es correcto");
});

export default authRouter;