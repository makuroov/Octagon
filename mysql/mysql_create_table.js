const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});
 
const sql = `CREATE TABLE Users
(
  ID int PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255),
  Age INT
)`;
 
connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});
connection.end();