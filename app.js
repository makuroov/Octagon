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

app.use
(
    "/dynamic", function(request, response)
    {
        const a = request.query.a;
        const b = request.query.b;
        const c = request.query.c;
        const body = a*b*c/3;
        if (a === "", b === "", c === "")
        {
            response.send(`header: Error</p>body: ${body}</p>`);
        }
    else
    {
        const a = request.query.a;
        const b = request.query.b;
        const c = request.query.c;
        const body = a*b*c/3;
        response.send(`header: Calculated</p>body: ${body}</p>`);
    }
    }
);

app.use
(
    "/getAllItems", function(request, response)
    {
        response.send(``);
    }
);

app.use
(
    "/addItem", function(request, response)
    {
        response.send(``);
    }
);

app.use
(
    "/deleteItem", function(request, response)
    {
        response.send(``);
    }
);

app.use
(
    "/updateItem", function(request, response)
    {
        response.send(``);
    }
);
 
app.listen
(
    3000,()=>
    {
        console.log("Сервер начал прием запросов по адресам: http://localhost:3000/, http://localhost:3000/static, http://localhost:3000/dynamic?a=1&b=2&c=3, http://localhost:3000/getAllItems, http://localhost:3000/addItem?name=TEXT&desc=TEXT2, http://localhost:3000/deleteItem?id=number, http://localhost:3000/updateItem?id=number&name=TEXT&desc=TEXT2");
    }
);