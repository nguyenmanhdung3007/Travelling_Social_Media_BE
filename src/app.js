const morgan = require("morgan");

const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;

const {connectDb} = require("./database/index")

const app = express();
app.use(express.json())
dotenv.config();
connectDb();

const indexRoute = require("./routes/index");

app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.json({ massage: "hello world" });
});

app.listen(PORT, () => {
  console.log("server is running in port: ", +PORT);
});
