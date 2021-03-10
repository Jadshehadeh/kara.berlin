const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      minlength: 5,
      maxlength: 150,
      required: [true, "Description is required!"],
    },
    status: { type: String, default: "0" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
