const mongoose = require("mongoose");
function connectMongodb(url) {
  return mongoose.connect(url);
}
module.exports = connectMongodb;
