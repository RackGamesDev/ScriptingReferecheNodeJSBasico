import { createServer} from "http";
import express  from "express";
import ruta from "./rutas.js";
import mongoose from "mongoose";//npm i -E mongoose
const expressApp = express();
expressApp.use(express.json());
expressApp.use(express.text());


expressApp.use(ruta);


const bootstr = async () => {
    await mongoose.connect("mongodb+srv://yester:prueba123@prueba0.n2q4wr9.mongodb.net/?retryWrites=true&w=majority");//La url compartida por mongodb, cambiando <password>
    expressApp.listen(3000, () => console.log("levantado"));
}
bootstr();
