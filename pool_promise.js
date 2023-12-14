const mysql = require("mysql2");
  
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
}).promise();
 
 
pool.execute("INSERT INTO `items`(`Name`, `Desc`) VALUES ('Apple','Delicious')")
    .then(result =>{ 
      console.log(result[0]);
      return pool.execute("SELECT * FROM items"); 
    })
    .then(result =>{
      console.log(result[0]);
      pool.end();
    })
    .then(()=>{
      console.log("Подключение закрыто");
    })
    .catch(function(err) {
      console.log(err.message);
    });