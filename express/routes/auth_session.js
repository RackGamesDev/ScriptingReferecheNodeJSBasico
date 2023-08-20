import {Router} from "express";
import {nanoid} from "nanoid";
import {usersdb} from '../bbdd.js'
//import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
const sessions = [];
const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    try{
        const user = usersdb.find(user => user.email === email);
        if (!user) return res.sendStatus(401);
        if(user.password !== password) return res.sendStatus(403);

        let id = user.id;
        const sessionId = nanoid();//con nanoid importado, esto genera un id aleatorio como string
        sessions.push({sessionId, id});
        res.cookie("sessionId", sessionId, {httpOnly:true});//guarda una cookie en el navegador, primero el nombre, luego el contenido y luego la configuracion
        return res.send("usuario " + user.name + " logeado")
    } catch (err) {
        return res.sendStatus(401);
    }
});
authSessionRouter.get("/profile", (req, res) => {
    console.log(req.cookies);//con la libreria de cookie-parser importada y usada como middleware, se pueden saber las cookies
    const {cookies} = req;
    if(!cookies.sessionId) return res.sendStatus(401);
    const userSession = sessions.find(session => session.sessionId === cookies.sessionId);
    if(!userSession) return res.sendStatus(401);
    const user = usersdb.find((user) => user.id === userSession.id);
    if(!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
});
export default authSessionRouter;