const express = require("express");
var router = express.Router();
const app = express();
const autenticar = require("../routes/autentication/autenticar");

const moment = require("moment");
const obras_sociales = require("../routes/obras_sociales/obras_sociales");

//le asignamos la seguridad a las rutas
const security = require("../configs/security");
const registrar = require("./autentication/registrar");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", moment().format());
  next();
});

// Define the home page route
router.post("/", function (req, res) {
  const saludar = {
    mensaje:
      "Hola, bienvenido a la API de CIMAC S.A. Para consultar por endpoints ponte en contacto con alexissa41@gmail.com (Programador de Backend)",
  };
  res.status = 200;
  res.send(JSON.stringify(saludar));
});

router.get("/", function (req, res) {
  const saludar = {
    mensaje:
      "Hola, bienvenido a la API de CIMAC S.A. Para consultar por endpoints ponte en contacto con alexissa41@gmail.com (Programador de Backend)",
  };
  res.status = 200;
  res.send(JSON.stringify(saludar));
});

router.post("/registrar", registrar);

router.post("/autenticar", autenticar);

router.get("/getObrasSociales", security, obras_sociales);

//Example Route
router.get("/datos", security, (req, res) => {
  const datos = [
    { id: 1, nombre: "Asfo" },
    { id: 2, nombre: "Denisse" },
    { id: 3, nombre: "Carlos" },
  ];
  res.json(datos);
});

module.exports = router;
