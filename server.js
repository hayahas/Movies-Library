'use strict';
const express = require('express');
const cors =require('cors');
const app= express();
const axios =require('axios');

require("dotenv").config();

const data = require('./MovieData/data.json')

function Movie(id,title, poster_path, release_date,overview) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.overview = overview;
  }

  app.get('/trending', async (req,res,next) => {
    let axiosResponse= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.moviesKey}&language=en-US`)
    //res.send(axiosResponse.data.results)
    let x=axiosResponse.data.results;
    let movies=[];
   
    for(let i=0;i<x.length;i++){
     let movie = x[i];
     let movieObject = new Movie (movie.id,movie.title, movie.release_date ,movie.poster_path,movie.overview)
     movies.push(movieObject)
    }
     res.send(movies)

  })

   // localhost:3000/search?search=movieName
  app.get('/search', async(req,res,next) => {
    let movieName= req.query.search;
    let axiosResponse= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.moviesKey}&language=en-US&query=${movieName}`)
    
    let search=axiosResponse.data;
    res.send(search)
  })
  
  
app.use(cors())

app.get('/',handleJson)
app.get('/favorite',handleFavorite)
app.get('/error',handleNotFound500)
app.get('*',handleNotFound404)


function handleJson(req,res){

let movies=[];

    let movieObject = new Movie (data.title, data.poster_path,data.overview)
    movies.push(movieObject)
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