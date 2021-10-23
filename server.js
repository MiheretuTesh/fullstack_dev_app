const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
// DB Config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
// mongoose
//     .connect(db)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err=>console.log(err))
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"));
app.get("/", (res, req) => res.end("Hello"));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
