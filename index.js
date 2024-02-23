const express = require("express");
const connectMongodb = require("./connections");
const cookieParser = require("cookie-parser");
const path = require("path");
const { checkForAuthentication } = require("./middlewares/auth");
const { urlRouter, redirect } = require("./routes/urls");
const { staticRouter, staticShortnerRouter } = require("./routes/static");
const { userRouter } = require("./routes/user");
const client = require("./discord/url");
//constants
const PORT = 8000;
const TOKEN =
  "MTE4OTkwNjQ3MTcyNzY3MzM3NQ.GS_Ws7._sOnt5MgtfR_pZECjvB7-BeNzFsqlVsm1lO3lQ";

const app = express();

//app configurations
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

//routes
app.use("/api/", urlRouter);
app.use("/user", userRouter);

app.use("/", staticRouter);
app.use("/", redirect);
//======================connections========================
//  mongodb
connectMongodb("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

//discord
client.login(TOKEN);

//starting server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
