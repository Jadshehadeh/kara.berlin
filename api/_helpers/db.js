const config = require("config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions
);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/users/user.model"),
  Post: require("../models/posts/post.model"),
  File: require("../models/files/file.model"),
  Comment: require("../models/comments/comment.model"),
};
