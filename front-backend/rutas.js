import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import {Router} from "express";
import path from 'path';
const router = Router();

router.get("/", (req,res) => {
    //res.sendFile(__dirname + "index.html");//creando el __dirname, devuelve un archivo, ejemplo el index.html
    //res.redirect("/otra");//redirige a otra parte de esa pagina
    //res.download(__dirname + "archivo.mp4");//descargar archivo
    console.log("recibido");
    res.sendFile(__dirname + "/public/index.html");
});

router.get("/otra", (req, res) => {res.send("holaa")});

export default router;