const path = require('path');
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const oppRoutes = require("./routes/OpportunityRoute");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongodburi).then(
  () => { 
    console.log("mongoose connected successfully :)");
   
    startWebServer();
  },
  err => {
    console.log("mongoose did not connect", err);
   }
);

function startWebServer(){

  const app = express();

  app.get("/api/publicinformation", (req, res) => {
    res.send("Anyone can see this");
  });

  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(oppRoutes);
//   routes


  const port = process.env.PORT || 3001;
  
  app.listen(port, () => {
    console.log(`Listening on port:${port}`);
  });
}