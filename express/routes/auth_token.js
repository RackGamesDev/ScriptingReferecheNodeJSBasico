import {Router} from "express";
import {usersdb} from '../bbdd.js'
import {nanoid} from "nanoid";
import {SignJWT, jwtVerify} from "jose";//npm i -E jose (para jwt, no recomendado, mejor la jsonwebtoken)
import validateLoginDTO from "../dto/validate_login_dto.js";
//import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
const authTokenRouter = Router();

authTokenRouter.post("/login", validateLoginDTO , async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    try{
        const user = usersdb.find(user => user.email === email);
        if (!user) return res.sendStatus(401);
        if(user.password !== password) return res.sendStatus(403);

        let id = user.id;
        const jwtConstructor = new SignJWT({id});
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor.setProtectedHeader({alg: 'HS256', typ: 'JWT'}).setIssuedAt().setExpirationTime('1h').sign(encoder.encode("aoweur2u7982374h"));

        return res.send({jwt})
    } catch (err) {
        return res.sendStatus(401);
    }
});
authTokenRouter.get("/profile", async(req, res) => {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401);
    try{
        const encoder = new TextEncoder();
        const {payload} = await jwtVerify(authorization, encoder.encode("aoweur2u7982374h"))

        const user = usersdb.find((user) => user.id === payload.id);
    if(!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);

    }catch(err){
        return res.status(401);
    }

    
});
export default authTokenRouter;