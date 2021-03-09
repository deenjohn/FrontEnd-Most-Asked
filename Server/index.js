var cookieSession = require("cookie-session");
var express = require("express");
var path = require("path");
var app = express();

// add req.session cookie support
app.use(cookieSession({ secret: "manny is cool" }));
app.use(
  express.static("assets", {
    etag: false, // uses milliseconds per docs
  })
);
app.use("/assets", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// do something with the session
app.use(count);

// custom middleware
function count(req, res, next) {
  console.log(req.headers["cookie"]);
  req.session.count = (req.session.count || 0) + 1;
  res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);

  next();
}

var apiController = require("./controllers/apiController");
var htmlController = require("./controllers/htmlController");

var port = process.env.PORT || 3000;

//app.set("etag", false); // no cache validate, 200 status

app.use("/", function (req, res, next) {
  res.setHeader("Cache-Control", "no-cache");
  next();
});

htmlController(app);

apiController(app);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
