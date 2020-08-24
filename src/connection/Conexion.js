 function consultar(){
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'cimac'
  });

  connection.connect();
  connection.query('SELECT user, pass from login_users', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0]);
    });
    
    connection.end();
    // return  rows[0].solution
}


module.exports={
  consultar
}