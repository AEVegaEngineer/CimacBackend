const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var conn = require('../connection/Conexion')

// PARA CORRER EL SERVIDOR EN MODO TESTING ESCUCHA TIEMPO REAL ESCRIBIR... "npm run dev"
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send('Hello World!')
  const saludar = {
    saludo:"holaa",
  }
  res.sendStatus='Ok'
  res.statusCode=200
  res.json(saludar)
})

app.get('/getUsers',(req, res)=>{
 const arr = conn.consultar()
 console.log(arr)
  console.log(conn.consultar())
  
  res.sendStatus=200
  // res.json(conn.consultar())
  res.json({"saludo":"hola"})
})

app.post('/startURL', urlencodedParser,jsonParser, function(req, res){
  // var content = JSON.stringify(req.body)
console.log(req.body)
  // if(content.name === 'Alexis')
  // {
  //   console.log("Mandaste parametro de Alexis")
  // }
  // else {
  //   console.log("Otro parametro: "+content.name)
  // }
  res.sendStatus=200
  // res.json(JSON.stringify(content.name))
   res.json(req.body)
})
app.post('/startJSONPARSER', jsonParser, function(req, res){
  // var content = JSON.stringify(req.body)
console.log(req.body)
  // if(content.name === 'Alexis')
  // {
  //   console.log("Mandaste parametro de Alexis")
  // }
  // else {
  //   console.log("Otro parametro: "+content.name)
  // }
  res.sendStatus=200
  // res.json(JSON.stringify(content.name))
   res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})