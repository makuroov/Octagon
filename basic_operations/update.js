const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});
 
const sql = "UPDATE `items` SET `Name`='[fwefw]',`Desc`='[wefewfwe]' WHERE 1";

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log("Данные обновлены");
});
 
connection.end();