var express = require('express');
var mysql = require('mysql');
const env = require('dotenv').config({ path: "./.env" });

var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database
})

var app = express();

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected....\n\n");
    } else {
        console.log("Error connecting Database....\n\n");
    }
});

app.listen(8000, function () {
    console.log('8000 Port : Server Started...');
})

app.get("/", function (req, res) {
    connection.query("SELECT * FROM st_info;", function (err, rows, fields) {
        if (!err) {
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
            var template = `
            <table border="1" margin:auto; text-align:center;>
            <tr>
    			<th> ST_ID </th>
    			<th> NAME </th>
    			<th> DEPT </th>
    		</tr> `;
            rows.forEach((item) => {
                template += `
                <tr>
                    <td>${item.ST_ID}</td>
                    <td>${item.NAME}</td>
                    <td>${item.DEPT}</td>
                </tr>
                `;
            });
            template += `</table> `;
            res.end(template);
            console.log('The solution is :', rows);
        } else {
            console.log('Error while performing Query');
        }
    });
});

module.exports = app;