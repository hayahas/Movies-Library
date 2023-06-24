'use strict';
const express = require('express');
const cors =require('cors');
const app= express();

const data = require('./MovieData/data.json')

function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
  }

  
  
app.use(cors())

app.get('/',handleJson)
app.get('/favorite',handleFavorite)
app.get('/error',handleNotFound500)
app.get('*',handleNotFound404)


function handleJson(req,res){

let movies=[];

  // for(let i=0;i<=data.length;i++){
  //   let movie = data[i];
    let movieObject = new Movie (data.title, data.poster_path,data.overview)
    movies.push(movieObject)
  // }
  // console.log(data)
  res.send(movies)
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