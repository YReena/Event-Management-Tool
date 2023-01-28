const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const  session = require('express-session');

dotenv.config({path :'./config.env'});
app.use(express.json());


app.use(session({
    secret: 'Reena_Yadav@12345',
    resave: false,
    saveUninitialized: false,
  }));
  console.log(session);
app.use(require('./router/router'));
require('./db/conn');





app.listen(8000,(req,res)=>{
    console.log("server is running at 8000");
})
