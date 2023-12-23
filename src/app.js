const morgan = require("morgan");

const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;

const app = express();
dotenv.config();

const connectionDB = require("./util/connectDB") 
connectionDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}))


const indexRoute = require("./routes/index");
const { connection } = require("mongoose");

app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log("server is running in port: ", +PORT);
});
