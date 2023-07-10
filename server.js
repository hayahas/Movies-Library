'use strict';
const express = require('express');
const cors =require('cors');

require("dotenv").config();
const app= express();
const client = require("./client");
const axios =require('axios');

const {PORT} = require("./configs");
const data = require('./MovieData/data.json')
const notFoundHandler= require("./error_handlers/404");
const internalErrorHandler = require("./error_handlers/500");
const moviesRoutes = require("./movies.routes")
const generalRoutes = require("./general.routes")
// const DB_URL=process.env.DB_URL


app.use(cors())
app.use(express.json())


app.use("/movies",moviesRoutes)
app.use(generalRoutes)
app.use(notFoundHandler)
app.use(internalErrorHandler)


  client.connect().then(() => {
    
    app.listen(PORT,() => {
      console.log("Running at 3000")
    });
  }).catch(error => console.log(error)); 
  





