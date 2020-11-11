const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mysql = require("mysql");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const widgetServer = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const CryptoJS=require("crypto-js")
var salt = bcrypt.genSaltSync(10);
var users = [];

var param = {
  host: "localhost",
  user: "client",
  password: "12345678",
  database: "widget",
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/widget",  (req, res) => {
  let code=CryptoJS.AES.decrypt(req.body.code, "bhaerbalntrzv").toString(CryptoJS.enc.Utf8);
  console.log(code);
  var connection = mysql.createConnection(param);
  const sql =
    "select  text,phone,message  from  widget.widgets w where w.id=?";
  connection.query(sql, [code], function (error, result, fields) {
    div="<p>"+result[0].text+"</p>"
    return res.send(JSON.stringify({widget:div,link:['location.href = "https://wa.me/',result[0].phone,'?text=',encodeURI(result[0].message),'"'].join("")}));
  });
  connection.end();
});

http.createServer(app).listen(3000);
