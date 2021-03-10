const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    path_: {
      type: String,
      required: true,
    },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", schema);
