const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    comment: {
      type: String,
      minlength: 5,
      maxlength: 250,
      required: [true, "Comment is required!"],
    },
    files: { type: Schema.Types.ObjectId, ref: "File" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", schema);
