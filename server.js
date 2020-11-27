const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static("express"));

const translate = require("@vitalets/google-translate-api");

app.get("/api/hte", function (req, res) {
  if (req.query.text) {
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

// var text = "yes";
// // console.log("English :>", text);
// googleTranslate.translate(text, "hi", function (err, translation) {
//   console.log("Hindi :>", translation);
// });

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
server.listen(port);
console.debug("Server listening on port " + port);
