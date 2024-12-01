import {Router} from "express";
import userModel from "./schemas/user-schema.js";

//Obviamente, habria que cubrir los errores manualmente
const ruta = Router();
ruta.get("/get/:id", async (req,res) => {
    const user = await userModel.findById(req.params.id).exec();//Devuelve un objeto de ese esquema(userModel) que tenga esa id
    if (!user) return res.status(404).send();
    res.send(user.name);
});

ruta.post("/post", async (req,res) => {
    const {bid, bname} = req.body;
    const newUser = new userModel({_id: bid, name: bname});//Creando una instancia (debe coincidir con el esquema, sobretodo el _id)
    await newUser.save();//Agregandolo a la base de datos
    res.send("todo bien");
});

ruta.delete("/delete/:id", async (req, res) => {
    const user = await userModel.findById(req.params.id).exec();
    if (!user) return res.status(404).send();
    await user.deleteOne();//Borrar una instancia
    res.send("todo bien");
});

export default ruta;
