const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const auth = require("./auth")();
const users = require("./users");
const cfg = require("./config");
const jwt = require("jwt-simple");

app.use(bodyParser.json());
app.use(auth.initialize());

// Get user info (authenticated route)
app.get("/user", auth.authenticate(), (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

app.get("/", (req, res) => {
  res.json({msg: "Backend endpoint"});
});

// Get JWT Token
app.post("/token", function(req, res) {  
  if(req.body.email && req.body.password){
    const email = req.body.email;
    const password = req.body.password;
    const user = users.find(function(u) {
      return u.email === email && u.password === password;
    });
    if(user){
      const payload = {
        id: user.id
      };
      const token = jwt.encode(payload, cfg.jwtSecret);
      res.json({
        token: token
      });
    }else{
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(401);
  }
});


app.listen(3000, () => {
  console.log("App started");
});