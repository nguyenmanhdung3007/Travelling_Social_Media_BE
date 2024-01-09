const morgan = require("morgan");
const multer  = require('multer')
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;

// const {connectDb} = require("./database/index")

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();
// connectDb();

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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
