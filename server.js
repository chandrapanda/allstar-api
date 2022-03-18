const express = require("express");
let db = require("./config/connection");
const routes = require("./routes");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Once database is open, then begin listening for API calls
db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});
