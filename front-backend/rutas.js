import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import {Router} from "express";
import path from 'path';
const router = Router();

router.get("/", (req,res) => {
    //res.sendFile(__dirname + "index.html");//Creando el __dirname, devuelve un archivo, ejemplo el index.html
    //res.redirect("/otra");//Redirige a otra parte de esa pagina
    //res.download(__dirname + "archivo.mp4");//Descargar archivo
    console.log("recibido");
    res.sendFile(__dirname + "/public/index.html");
});

router.get("/otra", (req, res) => {res.send("holaa")});

export default router;
