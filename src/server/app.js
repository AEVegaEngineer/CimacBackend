const { response } = require('express');

const express = require('express'),
      conn = require('../connection/Conexion'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('../configs/config'),
      app = express();
// 1
app.set('llave', config.llave);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());
// 4
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});
// 5
app.get('/', function(req, res) {
  const saludar={
    mensaje:"Hola, bienvenido a la API DE CIMAC. Para consultar por endpoints ponte en contacto con Alexissa41@gmail.com"
  }
    res.status=200
    res.send(JSON.stringify( saludar));
});
app.post('/', function(req, res) {
  const saludar={
    mensaje:"Hola, bienvenido a la API DE CIMAC. Para consultar por endpoints ponte en contacto con Alexissa41@gmail.com"
  }
    res.status=200
    res.send(JSON.stringify( saludar));
});
 

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];    
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token vacio' 
      });
    }
  } catch (error) {
    console.log(error)
    res.send({ 
      mensaje: 'Se recibio un formato de token invalido' 
  });
  }
 
   
 });

app.post('/autenticar', (req, res) => {
    if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
  const payload = {
  check:  true
  };
  const token = jwt.sign(payload, app.get('llave'));
  res.json({
  mensaje: 'Autenticación correcta',
  token: token
  });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})

app.get('/datos', rutasProtegidas, (req, res) => {
  const datos = [
   { id: 1, nombre: "Asfo" },
   { id: 2, nombre: "Denisse" },
   { id: 3, nombre: "Carlos" }
  ];
  
  res.json(datos);
 });


 app.get('/getUsers', rutasProtegidas, (req, res)=>{
  
   const arr = conn.consultar('user,pass','login_users','user = "'+req.body.user+'"')
   //console.log(arr)
   // console.log(conn.consultar())
  //  console.log(arr)
  console.log(arr)
   res.sendStatus=200
   // res.json(conn.consultar())
   
   res.json({"saludo":"hola"})
 })
 