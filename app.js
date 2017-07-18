const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const auth = require("./controllers/auth")();
const jwt_config = require("./config/jwt");
const database_config = require("./config/database");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Book = require("./models/book");

app.use(bodyParser.json());
app.use(auth.initialize());

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(database_config.database_url, {
  useMongoClient: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("Database error:", error);
});

// Get user info (authenticated route)
app.get("/user", auth.authenticate(), (req, res) => {
  console.log(req.user);
  res.json({
    email: req.user.email,
    password: req.user.password,
    name: req.username || "",
    city: req.user.city || "",
    country: req.user.country || ""
  });
});

app.post("/api/book", auth.authenticate(), (req, res) => {
  const _book = new Book({
    title: req.body.title || "",
    authors: req.body.authors || "",
    thumbnail: req.body.thumbnail || "",
    owner: req.user.email || ""
  });

  Book.addBook(_book, (err, book) => {
    if(err){
      res.json({success: false, error: err});
    }else{
      res.json({success: true});
    }
  });

});

app.get("/api/books", (req, res) => {
  Book.getAllBooks((err, books) => {
    if(err){
      res.json({success: false, error: err});
    }else{
      res.json({success: true, books: books});
    }
  });
});

app.get("/", (req, res) => {
  res.json({msg: "Backend endpoint"});
});

// Get JWT Token
app.post("/auth/login", (req, res) => {  
  const email = req.body.email || "";
  const password = req.body.password || "";

  User.getUserByEmail(email, (err, user) => {
    // Handle error or null result
    if(err) return res.json({success: false, error: "A server error occurred"});
    if(!user) return res.json({succes: false, error: "Email not registered"});

    // Check password
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(isMatch){
        const payload = {
          email: user.email
        };
        const token = jwt.sign(payload, jwt_config.jwtSecret, {
          expiresIn: "7d"
        });

        return res.json({success: true, token: token});
      }else{
        return res.json({success: false, error: "Wrong password"});
      }
    });

  });
});

app.post("/auth/register", (req, res) => {
  const email = req.body.email || "";
  const password = req.body.password || "";

  const _user = new User({
    email: email,
    password: password
  });

  User.addUser(_user, (err, user) => {
    if(err) return res.json({success: false, error: err});

    if(user) return res.json({success: true, msg: "Successfully registered"});
  });
});



app.listen(3000, () => {
  console.log("App started");
});