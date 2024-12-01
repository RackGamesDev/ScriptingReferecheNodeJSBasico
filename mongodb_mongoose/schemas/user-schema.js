import mongoose, { mongo } from "mongoose";
const userSchema = mongoose.Schema({//Creando un esquema que adoptaran las instancias de la base de datos
    _id: String,
    name: String
});
const userModel = mongoose.model('User', userSchema);
export default userModel;
