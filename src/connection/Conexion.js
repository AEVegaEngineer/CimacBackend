module.exports = {consultar}
    //DATOS DE CONEXION
    let mysql      = require('mysql');
    let connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database: 'cimac'
    });

  function consultar (campos,tabla,where){
  connection.connect();
  connection.query('SELECT '+campos+' from '+tabla+' WHERE '+where, function(err, rows, fields) {
      if (err) throw err;
      //  console.log('The solution is: ', rows);
       return JSON.stringify(rows)
    });
  connection.end();
    //  return  rows.solution.json()
}
function Update (){
  connection.connect();
  connection.query('SELECT user, pass from login_users', function(err, rows, fields) {
      if (err) throw err;
      //  console.log('The solution is: ', rows);
      console.log(JSON.stringify(rows))
       return JSON.stringify(rows)
    });
  connection.end();
    //  return  rows.solution.json()
}


