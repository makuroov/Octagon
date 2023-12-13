const mysql = require("mysql2");
const express = require("express");
 
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
 
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});
 
app.set("view engine", "hbs");

app.get("/", function(req, res){
    pool.query("SELECT * FROM `items`", function(err, data) {
      if(err) return console.log(err);
      res.render("index.hbs", {
          items: data
      });
    });
});

app.get("/create", function(req, res){
    res.render("create.hbs");
});

app.post("/create", urlencodedParser, function (req, res) {     
    if(!req.body) return res.sendStatus(400);
    const Name = req.body.Name;
    const Desc = req.body.Desc;
    pool.query("INSERT INTO `items` (Name, Desc) VALUES (?, ?)", [Name, Desc], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/");
    });
});
 
app.get("/edit/:ID", function(req, res){
  const ID = req.params.ID;
  pool.query("SELECT * FROM `items` WHERE ID=?", [ID], function(err, data) {
    if(err) return console.log(err);
     res.render("edit.hbs", {
        items: data[0]
    });
  });
});

app.post("/edit", urlencodedParser, function (req, res) {    
  if(!req.body) return res.sendStatus(400);
  const Name = req.body.Name;
  const Desc = req.body.Desc;
  const ID = req.body.ID;
  pool.query("UPDATE `items` SET Name=?, Desc=? WHERE ID=?", [Name, Desc, ID], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/");
  });
});
 
app.post("/delete/:ID", function(req, res){   
  const ID = req.params.ID;
  pool.query("DELETE FROM `items` WHERE ID=?", [ID], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/");
  });
});
 
app.listen(3000, function(){
  console.log("Сервер начал прием запросов по адресу: http://localhost:3000");
});