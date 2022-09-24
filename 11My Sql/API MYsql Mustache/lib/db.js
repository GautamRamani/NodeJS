var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'password',
	database:'node_js_crud_mustache',
	port:3306
});
connection.connect(function(error){
	if(error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;
 