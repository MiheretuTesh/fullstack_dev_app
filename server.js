const express = require("express");
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
// mongoose
//     .connect(db)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err=>console.log(err))
mongoose.connect(db,{
    useUnifiedTopology: true,
    useNewUrlParser: true   
}).then(() => console.log('Connected to MongoDB'))
app.get('/', (res, req) => res.end("Hello"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
