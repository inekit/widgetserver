
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
const cookieParser=require("cookie-parser");
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



passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
     var connection = mysql.createConnection(param);
    connection.query("SELECT * FROM widget.users", function (
      error,
      result,
      fields
    ) {
      console.log(email + password);
      
      let r=JSON.parse(JSON.stringify(result))
      console.log(r)
      console.log(r)
      for (let u in r) {
        console.log(r[u]+"bnthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
      if (
        email === r[u].email &&
        bcrypt.compareSync(password, r[u].password)
      ) {
        console.log("логин правильный, вы ", r[u].id);
        return done(null, r[u]);
      }
    }

      console.log("логин неправильный");
      return done(null, false);
    });
    connection.end();
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var param = {
  socketPath: "/var/run/mysqld/mysqld.sock",
  user: "root",
  password: "nicklzx",
  database: "widget",
};
var sesParams = {
  host: "localhost",
  user: "sessions",
  password: "1234",
  database: "widget",
};

var sessionConnection = mysql.createConnection(param);
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
    store: sessionStore,
    cookie: {
      path: "/",
      httpOnly: false,
      resave: false,
      maxAge: 60 * 60 * 1000,
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
  const sql = "select w.id,w.name,w.header,w.description,w.b_color,w.position_desktop,w.position_mobile,w.prototype_name \
  from users u,widgets w where u.id=w.creator_id and u.id=?";
  connection.query(sql,idd, function (error, result, fields) {
    for (i in result){
      result[i].key=CryptoJS.AES.encrypt(result[i].id.toString(), 'bhaerbalntrzv').toString();

    }
    console.log(result)
    return res.send(result);
  });
  connection.end();
});

app.post("/operators", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "select o.message, o.name,o.phone,o.platform_name \
  FROM widget.users u,widget.widgets w, widget.operators o \
  where u.id=? and w.id=? and u.id=w.creator_id and o.widget_id=w.id";
  connection.query(sql,[idd,req.body.widget_id], function (error, result, fields) {
    console.log(result)
    return res.send(result);
  });
  connection.end();
  
});


app.post("/addwidget", auth, (req, res) => {
  let widget=req.body.widget;
  idd = req.session.passport.user.toString();
  const iWQuery = "insert into widget.widgets(creator_id,name,header,description,b_color,position_desktop,position_mobile,prototype_name) values (?,?,?,?,?,?,?,?)";
  const iOQuery="insert into widget.operators (widget_id,name,phone,platform_name,message)\
  select ?,?,?,?,? from widget.widgets w,widget.users u \
  where  w.creator_id=u.id  and w.id=? and u.id=? limit 1";
  const connection = mysql.createConnection(param)
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query(iWQuery, [idd,widget.name,widget.header,widget.description,widget.b_color,widget.position_desktop,widget.position_mobile,widget.prototype_name], (error, result, fields)=> {
      console.log(result.insertId);
      if (error) {
        connection.rollback(function() {
              return res.send({isAffected:false})
            });
      }
      for(o of req.body.operators) {
        connection.query(iOQuery, [result.insertId,o.name,o.phone,o.platform_name,o.message,result.insertId,idd], (error, result, fields) =>{
          console.log(result);
          if (error) {
            connection.rollback(function() {
              return res.send({isAffected:false})
            });
          }
      });    
      
        connection.commit(function(err) {
          if (err) {
            connection.rollback(function() {
              return res.send({isAffected:false})
            });
          }
          return res.send({isAffected:true})
        });
      };
    });
  });
  
});

app.post("/alter", auth, (req, res) => {
  idd = req.session.passport.user.toString();
  let iOQuery="insert into widget.operators \
  select ?,?,?,?,? from widget.widgets w,widget.operators o,widget.users u \
  where o.widget_id=w.id and w.creator_id=u.id  and w.id=? and u.id=? limit 1";
  let uOQuery="update widget.operators set name=?,phone=? ,platform_name=?,message=? where id=?"//добавить аутентификацию
  let uWQuery="update widget.widgets set name=?,header=?,description=?,b_color=?,position_desktop=?,position_mobile=?,prototype_name=? where id=? and creator_id=?";
  let dOQuery="delete from widget.operators o where o.widget_id=? and o.id=?";
  const connection = mysql.createConnection(param)
  .then(connection.beginTransactionAsync())
  .then(() => {
      connection.queryAsync(uWQuery, req.data.widget)
      .then(()=>{
        for(i in req.data.operators.delete) {
          connection.queryAsync(dOQuery, req.data.operators.delete[i]);
        }
        for(i in req.data.operators.insert) {
          connection.queryAsync(iOQuery, req.data.operators.insert[i]);
        };
        for(i in req.data.operators.update) {
          connection.queryAsync(uOQuery, req.data.operators.update[i]);
        };
      })
      
  })
  .then(results => {
      return connection.commitAsync()
      .then(connection.endAsync())
      .then(() => {
          return res.send(results);
      });
  })
  .catch(err => {
      return connection.rollbackAsync()
      .then(connection.endAsync())
      .then(() => {
        return res.send(results);
    });
  });
});

app.post("/delete", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "delete from widget.widgets where id=? and creator_id=?";
  connection.query(sql,[req.body.id,idd], function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});



app.get("/id", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const dialog = [idd];
  const sql = "select id,email,nick from widget.users where id=(?) limit 1";
  connection.query(sql, dialog, function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});

app.get("/sub", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const dialog = [idd];
  const sql = "SELECT u.id,s.plan_name,DATE_ADD(s.date_start, INTERVAL p.period MONTH) date_finish FROM widget.subscriptions s,widget.users u,widget.plans p  where u.id=s.user_id and p.name=s.plan_name and u.id=? order by date_start limit 1";
  connection.query(sql, dialog, function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});

app.post("/addsub", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "insert into widget.subscriptions \
  (SELECT ?,?,now(),?, ? FROM widget.subscriptions s,widget.users u,widget.plans p \
  where u.id=s.user_id and p.name=s.plan_name and u.id=? and DATE_ADD(s.date_start, INTERVAL p.period MONTH)<now() \
  order by date_start limit 1) \
  union \
  (select ?,?,now(),?, ? from widget.subscriptions \
  where (SELECT count(id) FROM widget.subscriptions s,widget.users u where u.id=s.user_id and user_id=?)=0 limit 1)";
  connection.query(sql, [idd,req.body.plan_name,req.body.coupon_name,"Чек",idd,idd,req.body.plan_name,req.body.coupon_name,"Чек",idd], 
  function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});

app.post("/stat-by-cities", auth, (req, res) => {
  var connection = mysql.createConnection(param);
  idd = req.session.passport.user.toString();
  const sql = "SELECT id,city_name,date FROM widget.clicks c where line_id=?";
  connection.query(sql, [idd,req.body.o_id], function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});

app.get("/plans",  (req, res) => {
  var connection = mysql.createConnection(param);
  const sql = "SELECT * FROM widget.plans p order by p.price_ru";
  connection.query(sql, function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});


app.get("/logout", auth, (req, res) => {
  req.logOut();
  return res.send(JSON.stringify({isAuthenticated: req.isAuthenticated()}));
});

app.post("/click",  (req, res) => {
  var connection = mysql.createConnection(param);
  const sql = "insert into widget.clicks (line_id,city_name,date) values (?,?,now());";
  connection.query(sql,[req.body.o_id,req.body.c_name], function (error, result, fields) {
    return res.send(result);
  });
  connection.end();
});


app.post("/client-widget",  (req, res) => {
  let code=CryptoJS.AES.decrypt(req.body.code, "bhaerbalntrzv").toString(CryptoJS.enc.Utf8);
  console.log(code);
  var connection = mysql.createConnection(param);
  const Query = 
    "SELECT count(u.id) count FROM widget.users u, widget.subscriptions s, widget.plans p \
    where s.user_id=u.id and s.plan_name=p.name \
    and DATE_ADD(s.date_start, INTERVAL p.period MONTH)>now() and u.id=? \
    order by s.date_start limit 1";
  const Query2="select w.name,w.header,w.description,w.b_color, \
  w.position_desktop,w.position_mobile,w.prototype_name,o.id,o.name,o.phone,o.platform_name,o.message \
  from widget.widgets w,widget.users u,widget.operators o where u.id=w.creator_id and o.widget_id=w.id and u.id=? and w.id=? and 1=?"
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query(Query, [idd], (error, result, fields)=> {
        console.log(result[0].count);
        if (error) {
          return connection.rollback(function() {
            console.log(error)
            throw error;
          });
        }
        
        connection.query(Query2, [idd,code,result[0].count], (error, ress, fields)=> {
          console.log(ress);
          
          connection.commit(function(err) {
            if (err) {
              connection.rollback(function() {
                return res.send(err);
              });
            } else
            return res.send(ress)
          });
        })
        
          
        
      });
    })
  /*connection.query(sql, [code], function (error, result, fields) {
    if(result){
    div="<p>"+result[0].text+"</p>"
    return res.send(JSON.stringify({widget:div,link:['location.href = "https://wa.me/',result[0].phone,'?text=',encodeURI(result[0].message),'"'].join("")}));
    }
  })
  connection.end();*/
});





//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
let srv = http.createServer(app).listen(8000);

var path=require('path');

express().use(express.static(
  path.join(__dirname,'webb')
)).listen(8080);
