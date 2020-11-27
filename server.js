const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("express"));

const translate = require("@vitalets/google-translate-api");
app.get("/", function (req, res) {
  console.log("on server");
  res.sendStatus(200);
});
app.get("/api/hte", function (req, res) {
  console.log("hit hte");
  if (req.query.text) {
      console.log(req.query.text);
    translate(req.query.text, { from: "hi", to: "en" })
      .then((data) => {
        return res.json({
          data: data.text,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
app.get("/api/eth", function (req, res) {
  console.log("hit eth");
  if (req.query.text) {
    translate(req.query.text, { from: "en", to: "hi" })
      .then((data) => {
        return res.json({
          data: data.pronunciation,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

console.log("working");

const server = http.createServer(app);
const port = process.env.PORT || 8000;
server.listen(port);
console.debug("Server listening on port " + port);
