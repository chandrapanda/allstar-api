const express = require("express");
let db = require("./config/connection");
const mongodb = require("mongodb").MongoClient;
const data = require("./utils/data");
const routes = require("./routes");

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://localhost:27017/allStarDB`;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    // Drops any documents, if they exist
    db.collection("allStar").deleteMany({});
    // Adds data to database
    db.collection("allStar").insertMany(data, (err, res) => {
      if (err) {
        return console.log(err);
      } else {
        console.err(err);
      }
      console.log(res.ops);
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});

app.use(routes);

app.use(express.json());
