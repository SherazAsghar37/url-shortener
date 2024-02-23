const mongoose = require("mongoose");
const userSchemna = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "Normal",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchemna);
module.exports = userModel;
