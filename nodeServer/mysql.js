let mysql = require('mysql');
module.exports={
	query:function($sql,callback){
			let connection = mysql.createConnection({
		    host: 'localhost',
		    user: 'root',
		    password: '197311',
		    database: 'nodeServer'
		})
		
		connection.connect();
		
		connection.query($sql,function(error,results,fileds){
		    if(error) throw error;
		    callback(results);
		})
		
		connection.end();
	}
}