import express from 'express';
const app = express();
import * as url from 'url';
import mimeTypes from 'mime-types';
//npm i cors para cosas con ajax

import multer from 'multer';//Multer funciona como middleware
const storage = multer.diskStorage({
    destination: 'uploads/',//Donde se guarda
    filename: function(req, file, cb){//Como sera tratado el nombre del archivo, donde req es la request, cb es el next() y file es el archivo
        cb("",file.originalname + Date.now() + "." + mimeTypes.extension(file.mimetype));//Al terminar se usa la callback (normalmente se le va poniendo un numero a cada archivo, en este caso se guarda con la fecha) (mimetypes devuelve la extension del archivo)
    }
});
const upload = multer({
    storage: storage//Especificar el storage ya configurado
});


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.get("/", (req, res) => {
    console.log("recibido");
    res.sendFile(__dirname + "/views/index.html");
})

app.post("/files",upload.single('avatar') , (req, res) => {//Se usa el middleware multer como single para un solo archivo (especificar el nombre del input file del html)
    res.send("ok");
})

app.listen(3000, () => console.log("iniciado"));
