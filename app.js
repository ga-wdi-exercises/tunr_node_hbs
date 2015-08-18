var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use("/app", express.static(path.join(__dirname + "/app")));

var artistController = require("./controllers/artists");
var songsController = require("./controllers/songs");

app.get("/", function(request, response){
  //response.sendFile(__dirname + "/app/views/index.html");
  response.send("foo")
});
