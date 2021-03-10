require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const fileUpload = require("express-fileupload");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
// use JWT auth to secure the api
app.use("/files", require("./models/files/files.controller"));

// app.post("/upload", (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/data/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

// app.use(jwt());

// api routes
// app.use("/details", require("./details/details.controller"));
app.use("/users", require("./models/users/users.controller"));
app.use("/posts", require("./models/posts/posts.controller"));
app.use("/comments", require("./models/comments/comments.controller"));
// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
