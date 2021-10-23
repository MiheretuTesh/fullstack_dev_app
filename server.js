const express = require("express");

const app = express();

app.get("/", (res, req) => res.send("Hello"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
