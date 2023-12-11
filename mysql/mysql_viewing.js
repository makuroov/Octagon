const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});

const sql = "SELECT * FROM `items`";
 
connection.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
 
connection.end();