const morgan = require("morgan");

const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT||8000;


const app =express()
dotenv.config();

// app.get('/',(req, res)=>{
//     res.json({massage: 'hello world'} )
// })

app.listen(PORT, ()=>{
    console.log('server is running in port: ', + PORT)
})