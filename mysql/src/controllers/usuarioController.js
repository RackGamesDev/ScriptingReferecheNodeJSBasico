const controller = {};
import path from 'path';
controller.list = (req, res) => {
    req.getConnection((err, conn) => {//al estar activado el middleware de express-myconnection se pueden usar sus funciones aqui tambien, err es si hay errores
        conn.query('SELECT * FROM usuarios', (err, usuarios) => {//ejecutar la consulta, como esta devuelve datos usuarios es el array con los datos devueltos
            if (err) res.json(err);
            console.log(usuarios);//el array devuelto con todos los usuarios
            res.send(usuarios);
            //res.render('usuarios.html', {data: 123})
        });
    });
}
controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ? ? ?', [data], (err, usuario));//esta consulta modifica los datos, cada ? es una posicion del array data
        res.send("ya");
    });
}
export default controller;