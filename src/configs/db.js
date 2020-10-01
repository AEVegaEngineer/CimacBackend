module.exports = { consultar, consultarWhereClause, insertarRegistros };
//DATOS DE CONEXION
let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "181.118.74.67",
  user: "root",
  password: "DbAlex2020-*a*",
  database: "cimac",
});

function consultarWhereClause(campos, tabla, where, callback) {
  try {
    connection.query(
      "SELECT " + campos + " from " + tabla + " WHERE " + where,
      function (err, rows, fields) {
        if (rows) {
          return callback(JSON.stringify(rows));
        }
        if (err) {
          return callback("Error en db");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
function consultar(campos, tabla, where, callback) {
  connection.query(
    "SELECT " + campos + " from " + tabla + " WHERE " + where,
    function (err, rows, fields) {
      if (err) {
        return callback(JSON.stringify(err));
      }
      if (rows) {
        return callback(JSON.stringify(rows));
      }
    }
  );
}
function insertarRegistros(campos, tabla, valores, callback) {
  try {
    connection.query(
      "INSERT INTO " + tabla + "(" + campos + ") VALUES (" + valores + ")",
      function (err, result) {
        if (result) {
          return callback({ mensaje: "Se agregó el usuario correctamente" });
        }
        if (err) {
          console.log(err);
          return callback("Error al agregar el usuario");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
function Update() {
  connection.connect();
  connection.query("SELECT user, pass from login_users", function (
    err,
    rows,
    fields
  ) {
    if (err) throw err;
    //  console.log('The solution is: ', rows);
    console.log(JSON.stringify(rows));
    return JSON.stringify(rows);
  });
  connection.end();
  //  return  rows.solution.json()
}
