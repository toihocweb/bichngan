const express = require("express");
const path = require("path");
const compression = require("compression");
const http = require("http");

const indexRouter = require("./routes/index");


const customHeaders = (req, res, next) => {
  res.setHeader("X-Powered-By", "Nhat Dep Chai");
  next();
};

const app = express();
// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
// set up a route to redirect http to https
app.use(compression());


app.use(customHeaders);

// view engine setup
const cacheTime = 86400000 * 1;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

// cache static files in public folder

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: cacheTime,
  })
);

app.use("/", indexRouter);
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

module.exports = app;
