const express = require("express");
const app = express();

app.get
(
    "/", function(request, response)
    {
        response.send("<h1>Главная страница</h1>");
    }
);

app.use
(
    "/static", function(request, response)
    {
        response.send(`header: Hello</p>body: Octagon NodeJS Test`);
    }
);

app.use("/dynamic", function(request, response) 
{
    let a = request.query.a;
    let b = request.query.b;
    let c = request.query.c;
    let isError = false;
  
    for (let property in request.query) {
      if (isNaN(request.query[property])) {
        isError = true;
        break;
      }
    }
  
    if (isError || !a || !b || !c) 
    {
        return response.send(`header: Error</p>body: ${body}</p>`);
    } 
    else 
    {
        let result = (parseInt(a) * parseInt(b) * parseInt(c)) / 3;
        return response.send(`header: Calculated</p>body: ${result}</p>`);
    }
});
 
app.listen(3000,()=>{console.log("Сервер начал прием запросов по адресам: http://localhost:3000/, http://localhost:3000/static, http://localhost:3000/dynamic?a=1&b=2&c=3");});