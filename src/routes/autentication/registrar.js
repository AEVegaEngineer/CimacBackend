var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var app = express();
var conn = require("../../configs/db");
const md5 = require("md5");
const config = require("../../configs/config");
app.set("llave", config.llave);

module.exports = (req, res) => {
  try {
    conn.consultarWhereClause(
      "user",
      "login_users",
      'user = "' + req.body.user.toLowerCase() + '"',
      function (rows, err) {
        if (err) {
          console.log(err);
        }
        if (rows === "Error en db") {
          res.json({
            mensaje: "Tenemos problemas al comunicarnos con la base de datos",
          });
        } else {
          if (!(rows !== "[]")) {
            //USUARIO NO REGISTRADO PROSIGUE
            conn.insertarRegistros(
              "user,pass,nombre_apellido",
              "login_users",
              [
                "'" + req.body.user.toLowerCase() + "'",
                "'" + md5(req.body.pass) + "'",
                "'" + req.body.name + "'",
              ],
              function (response, err) {
                if (err) {
                  console.log(err);
                }
                if (response) {
                  console.log(response);
                  res.json(response);
                }
              }
            );
          } else {
            res.json({
              mensaje:
                "El usuario ya ha sido registrado. Por favor inicie sesión",
            });
          }
        }
      }
    );
  } catch (error) {
    res.json({ mensaje: "Tenemos problemas con la base de datos" });
  }
};
