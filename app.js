
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mysql = require("mysql");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const cors = require("cors");
const http = require("http");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var users = [];
var webs = http.createServer(function (req, res) {
  console.log("createServer");
});
const CryptoJS=require("crypto-js");
const { json } = require("body-parser");

app.use(
  cors({
    origin: ["http://127.0.0.1:8080","http://81.176.228.81:8080"],
    credentials: true,
  })
);

passport.serializeUser(function (user, done) {
  console.log("Сериализация: ", user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("Десериализация: ", id);
  var user = false;
  for (const userN of users) {
    user = userN.id === id ? userN : user;
  }
  done(null, user);
});

function Connect() {
  var connection = mysql.createConnection(param);
  connection.query("SELECT * FROM widget.users", function (
    error,
    result,
    fields
  ) {
    //console.log(result)
    users = result;
  });
  connection.end();
}

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    Connect();
    console.log(email + password);
    for (const userN of users) {
      if (
        email === userN.email &&
        bcrypt.compareSync(password, userN.password)
      ) {
        console.log("логин правильный, вы ", userN.id);
        return done(null, userN);
      }
    }
    console.log("логин неправильный");
    return done(null, false);
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var param = {
  host: "localhost",
  user: "client",
  password: "12345678",
  database: "widget",
};
var sesParams = {
  host: "localhost",
  user: "sessions",
  password: "1234",
  database: "widget",
};

var sessionConnection = mysql.createConnection(sesParams);
var sessionStore = new MySQLStore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "USERS_SESSIONS",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  sessionConnection
);

app.use(
  session({
    secret: "hghtyNN23h",
    //store: sessionStore,
    cookie: {
      path: "/",
      httpOnly: false,
      resave: false,
      maxAge: 60 * 60 * 1000,
      sameSite:"none",//убрать при деплое
    },
    resave: false,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());



const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.send(JSON.stringify({isAutenticated:false}))
  }
};

app.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      //console.log("Укажите правильный email или пароль!");
      return res.send(JSON.stringify({isAutenticated:false}));
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(1)
      return res.send(JSON.stringify({isAutenticated:true}));
      
    });
  })(req, res, next);
});

app.post("/register", (req, res) => {
  if (!req.body.password || !req.body.nick || !req.body.email) {
    res.send({error:"no data"});
  } else {
    var connection = mysql.createConnection(param);
    let ps = bcrypt.hashSync(req.body.password, salt);
    const dialog = [req.body.email, ps, req.body.nick];
    console.log([req.body.email, ps, req.body.nick]);
    const sql =
      "insert into widget.users (email,password,nick) values ((?),(?),(?))";
    connection.query(sql, dialog, function (error, result, fields) {
      console.log(result);
      console.log(error);
      if (error) res.send({isRegistered:false});
      else res.send({isRegistered:true});
    });
    connection.end();
  }
});

app.get("/widgets", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "select w.id,platform,type,text,discription,w.name,w.phone,message  FROM widget.users u,widget.widgets w where u.id=w.client_id and u.id=?;";
  connection.query(sql,idd, function (error, result, fields) {
    for (i in result){
      result[i].key=CryptoJS.AES.encrypt(result[i].id.toString(), 'bhaerbalntrzv').toString();

    }
    console.log(result)
    return res.send(result);
  });
  connection.end();
});



app.post("/addwidget", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "INSERT INTO `widget`.`widgets` (`client_id`, `platform`, `type`, `text`, `discription`, `name`,`phone`, `message`) VALUES (?, ?, ?, ?, ?,?,?,?)";
  connection.query(sql,[idd,req.body.platform,req.body.visual,req.body.text,req.body.description,req.body.name,req.body.phone,req.body.message], function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});

app.post("/alter", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "UPDATE widget.widgets SET platform = ? , type = ?, text = ?,discription = ?,name = ?,phone = ?,message = ? WHERE id=? and client_id=?;";
  connection.query(sql,[req.body.platform,req.body.visual,req.body.text,req.body.description,req.body.name,req.body.phone,req.body.message,req.body.id,idd], function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});

app.post("/delete", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "delete from widget.widgets where id=? and client_id=?";
  connection.query(sql,[req.body.id,idd], function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});



app.get("/id",  (req, res) => {
    return res.send({isAutenticated:true});
});


app.get("/logout", auth, (req, res) => {
  req.logOut();
  return res.send(JSON.stringify({isAuthenticated: req.isAuthenticated()}));
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
let srv = http.createServer(app).listen(8000);

var path=require('path');

express().use(express.static(
  path.join(__dirname,'webb')
)).listen(8080);
