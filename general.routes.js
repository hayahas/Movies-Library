"use strict";

const express=require('express')
const axios =require('axios');
const Router=express.Router();


Router.get('/',(req,res,next) => {
    try {
        let movies=[];
        console.log(data)
        res.send(data)
    } catch (e) {
      next('Failed to get Movies' + e)  
    }
  })
  
  
  Router.get('/favorite',(req,res,next)=>{
    try {
        res.send("Welcome to Favorite Page")
    } catch (e) {
        next('Failed to acess favorite page' + e)  
    }
  })
  

function Movie(id,title, poster_path, release_date,overview) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.overview = overview;
  }

   // localhost:3000/trending
   Router.get('/trending', async (req,res,next) => {
   try {
    let axiosResponse= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.HAYAKEY}&language=en-US`)
    //res.send(axiosResponse.data.results)
    let x=axiosResponse.data.results;
    let movies=[];
   
    for(let i=0;i<x.length;i++){
     let movie = x[i];
     let movieObject = new Movie (movie.id,movie.title, movie.release_date ,movie.poster_path,movie.overview)
     movies.push(movieObject)
    }
     res.send(movies)
} catch (e) {
    next('Failed to get trending movies' + e)  
}


  })

   // localhost:3000/search?search=movieName
   Router.get('/search', async(req,res,next) => {
    try {
        let movieName= req.query.search;
        let axiosResponse= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.HAYAKEY}&language=en-US&query=${movieName}`)
        
        let search=axiosResponse.data;
        res.send(search)
    } catch (e) {
        next('Failed to search' + e)  
    }
  
  })
  
    // localhost:3000/search?search=PosterPath
    Router.get('/searchPoster', async(req,res,next) => {
try {
    let moviePoster= req.query.search;
      let axiosResponse= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.HAYAKEY}&language=en-US&query=${moviePoster}`)
      
      let search=axiosResponse.data;
      res.send(search)
} catch (e) {
    next('Failed to search' + e)  
}

      
    })

 
   // localhost:3000/allMovies
   Router.get('/allMovies', async (req,res,next) => {
    try {
        let axiosResponse= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.HAYAKEY}&language=en-US`)
        //res.send(axiosResponse.data.results)
        let x=axiosResponse.data.results;
        let movies=[];
       
        for(let i=0;i<x.length;i++){
         let movie = x[i];
         let movieObject = new Movie (movie.title)
         movies.push(movieObject)
        }
         res.send(movies)  
    } catch (e) {
        next('Failed to get all movies' + e)  
    }

    });


    module.exports = Router;