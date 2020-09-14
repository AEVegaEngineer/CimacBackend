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
      "id,user,pass",
      "login_users",
      'user = "' + req.body.user + '" AND pass = "' + md5(req.body.pass) + '"',
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
            console.log(rows);
            //error al validar usuario y contraseña
            res.json({ mensaje: "Usuario o contraseña incorrectos" });
          } else {
            console.log(rows);
            const payload = {
              user_id: rows.id,
              check: true,
            };
            const token = jwt.sign(payload, app.get("llave"));
            res.json({
              mensaje: "Autenticación correcta",
              token: token,
            });
          }
        }
      }
    );
  } catch (error) {
    res.json({ mensaje: "Tenemos problemas con la base de datos" });
  }
};
