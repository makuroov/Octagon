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
    let checkParams = ["a", "b", "c"]; // массив содержащий переменные для проверки параметров использования.
    for (let param of checkParams) // цикл, который проверяет, что все параметры a, b, c существуют и являются числами.
    { 
        if (request.query[param] == null || isNaN(request.query[param])) 
        { 
            return response.send(`header: Error</p>body: ${body}</p>`); // Если хоть один параметр отсутствует или не является числом, то возвращает ответ с сообщением об ошибке.
        } 
    } 
    let result = (parseInt(request.query[checkParams[0]]) * parseInt(request.query[checkParams[1]]) * parseInt(request.query[checkParams[2]])) / 3; // здесь происходит вычисления параметров a, b, c, которые делятся на 3. Рузультат сохраняется в переменную result
    return response.send(`header: Calculated</p>body: ${result}</p>`); // блок, который в результате вычисления (которая содержится в result) отправляет ответ клиенту с заголовком "Calculated"
});
 
app.listen(3000,()=>{console.log("Сервер начал прием запросов по адресам: http://localhost:3000/, http://localhost:3000/static, http://localhost:3000/dynamic?a=1&b=2&c=3");});