var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var artistsController = require("./controllers/artists");
var songsController = require("./controllers/songs");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/application.html")
});

app.use("/", artistsController);
app.use("/", songsController);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
