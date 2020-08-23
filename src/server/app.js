const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send('Hello World!')
  const saludar = {
    saludo:"hola",
  }
  res.sendStatus='Ok'
  res.statusCode=200
  res.json(saludar)
})

app.get('/start',(req, res)=>{
  if(req.query.name === 'Alexis')
  {
    console.log("Mandaste parametro de Alexissss")
  }
  else {
    console.log("Otro parametro: "+req.query.name)
  }
  res.sendStatus=200,
  res.json({ username: 'Flavio' })
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