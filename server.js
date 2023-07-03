'use strict';
const express = require('express');
const cors =require('cors');
const app= express();
const axios =require('axios');
const PORT = process.env.PORT;
const pg =require('pg');
require("dotenv").config();

const data = require('./MovieData/data.json')

const DB_URL=process.env.DB_URL

const dbClient= new pg.Client(DB_URL)

app.use(cors())
app.use(express.json())


function Movie(id,title, poster_path, release_date,overview) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.overview = overview;
  }

   // localhost:3000/trending
  app.get('/trending', async (req,res,next) => {
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

  })

   // localhost:3000/search?search=movieName
  app.get('/search', async(req,res,next) => {
    let movieName= req.query.search;
    let axiosResponse= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.HAYAKEY}&language=en-US&query=${movieName}`)
    
    let search=axiosResponse.data;
    res.send(search)
  })
  
    // localhost:3000/search?search=PosterPath
    app.get('/searchPoster', async(req,res,next) => {
      let moviePoster= req.query.search;
      let axiosResponse= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.HAYAKEY}&language=en-US&query=${moviePoster}`)
      
      let search=axiosResponse.data;
      res.send(search)
    })

 
   // localhost:3000/allMovies
    app.get('/allMovies', async (req,res,next) => {
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
  
    })




app.use('/',handleJson)
app.get('/favorite',handleFavorite)
app.get('/error',handleNotFound500)
app.use('*',handleNotFound404)


function handleJson(req,res){

let movies=[];

    let movieObject = new Movie (data.title, data.poster_path,data.overview)
    movies.push(movieObject)
  res.send(movies)

}

function handleFavorite(req,res){
    res.send("Welcome to Favorite Page")
}



///////lab 13

   // localhost:3000/addMovie
   app.post('/addMovie',(req,res)=> {

    let {t,y,m}=req.body;
  
  let sql=`insert into movies (title,year,mainActor) values ($1,$2,$3)`;
  dbClient.query(sql,[t,y,m]).then(()=>{
    res.status(200).send(`movie ${title} added to database`)
  });
  
  });
  
  //localhost:3000/getMovies
  app.get('/getMovies',(req,res)=> {
    let sql=`SELECT * FROM movies`;
    dbClient.query(sql).then((moviesData) => {
      res.status(201).send(moviesData.rows)
    })
  
  })

  //////lab 14

   //localhost:3000/delete/id
  app.delete('/delete/:id', (req,res) => {
  let {id}= req.params;
  let sql=`DELETE FRROM movies where id = ${id}`;
  dbClient.query(sql).then(() => {
  res.status(200).end()
})

  })

    
  // delet in async/await way
  // app.delete('/delete/:id', async (req,res) => {
  //   let {id}= req.params;
  //   let sql=`DELETE FRROM movies where id = ${id}`;
  //    await dbClient.query(sql)
  //     res.status(200).send("deleted")  
  //     })


 //localhost:update/delete/id
  app.put('/update/:id' , async(req,res) =>{
    let {newMainActor} = req.body;
    let {id}= req.params;
    let sql=`UPDATE movies SET mainActor=$1 where id =${id}`;
    dbClient.query(sql,newMainActor).then(() => {
      res.status(200).send("Updated");
    })
  })
    

  //localhost:3000/getMovie/id
  app.get('getMovie/:id',  (req,res) => {
    let { id } = req.params;
    let sql= `SELECT FROM movies where id = ${id}`;
 dbClient.query(sql).then(response => { 
     res.status(200).send(response.rows)} )

  })



   // get in async await maybeeee
  //   app.get('getMovie/:id', async (req,res) => {
  //   let { id } = req.params;
  //   let sql= `SELECT FROM movies where id = ${id}`;
  //   let response= await dbClient.query(sql)
  //   res.status(200).send(response.rows)
  // })

 

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

  
  dbClient.connect().then(() => {
    app.listen(3000,() => {
      console.log("Running at 3000")
    });
  }); 
  





