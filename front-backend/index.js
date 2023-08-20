import { createServer} from "http";
import express  from "express";
import router from "./rutas.js"
const expressApp = express();
expressApp.use("/", router);
expressApp.listen(3000, () => console.log("levantado"));