const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      maxlength: 50,
      required: [true, "Email is required!"],
    },
    hash: {
      type: String,
      minlength: 8,
      required: [true, "Password is required!"],
    },
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "FirstName is required!"],
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "LastName is required!"],
    },
    phoneNumber: {
      type: String,
      minlength: 8,
      maxlength: 50,
      required: [true, "Phone Number is required!"],
    },
    role: { type: String, required: [true, "Role is required!"] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "userId",
  localField: "_id",
});

userSchema.set("toJSON", {
  // virtuals: true,
  // versionKey: false,
  transform: function (doc, ret) {
    // delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("User", userSchema);
