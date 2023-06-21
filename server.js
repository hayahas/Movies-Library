'use strict';
const express = require('express');
const cors =require('cors');
const app= express();

const data = require('./Movie Data./data.json')

function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
  }
  
app.use(cors())

app.get('/.',handleJson)
app.get('/favorite',handleFavorite)
app.get('*',handleNotFound500)
app.get('*',handleNotFound404)


function handleJson(req,res){
res.send(data)
}

function handleFavorite(req,res){
    res.send("Welcome to Favorite Page")
}

function handleNotFound500(req,res){
    res.send({
"status": 500,
"responseText": "Sorry, something went wrong"
    })
}


function handleNotFound404(req,res){
    res.send({
"code": 404,
"responseText": "page not found"
    })
}


app.listen(3000,startingLog)

function startingLog(req,res){
console.log("Running at 3000")
}