const express = require("express");
let db = require("./config/connection");
const routes = require("./routes");

const app = express();
const port = 3001;

// Once database is open, then begin listening for API calls
db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});
app.use(routes);

app.use(express.json());
