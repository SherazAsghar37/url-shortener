const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
      unique: true,
    },
    visitHistory: [{ timestamps: { type: Number } }],
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
const urlModel = mongoose.model("URL", urlSchema);
module.exports = urlModel;
