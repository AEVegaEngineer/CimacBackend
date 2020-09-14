module.exports = { consultar, consultarWhereClause };
//DATOS DE CONEXION
let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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
