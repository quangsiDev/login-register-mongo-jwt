const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotevn = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
dotevn.config();

// connnect to DB

try {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connecting to db!");
      console.log(mongoose.connection.readyState);
    }
  );
} catch (error) {
  console.log("could not connect");
}
// Middleware

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("Server Up and running");
});
