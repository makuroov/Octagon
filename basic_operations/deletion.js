const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});
 
const sql = "DELETE FROM `items` WHERE 1";

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log("Данные удалены");
});
 
connection.end();