"use strict";
const express=require('express')

const Router=express.Router();

const client = require("./client");
// Router.use(express.json()); 


// localhost:3001/addMovie
Router.post('/',(req,res,next)=> {
try {
    let {t,y,m}=req.body;
  
    let sql=`insert into movies (title,year,mainActor) values ($1,$2,$3)`;
    client.query(sql,[t,y,m]).then(()=>{
      res.status(200).send(`movie ${t} added to database`)
    });
} catch (e) {
  next("Failed to add movie " + e)
}
  
  });

//localhost:3000/getMovies
Router.get('/',(req,res,next)=> {
    try {
        let sql=`SELECT * FROM movies`;
        client.query(sql).then((moviesData) => {
    res.status(201).send(moviesData.rows)
    });
    } catch (e) {
      next("Failed to get all  movies " + e) 
    }
  });

  
   //localhost:3000/delete/id
   Router.delete('/:id', (req,res,next) => {
    try {
        let {id}= req.params;
    let sql=`DELETE FROM movies where id = ${id}`;
    client.query(sql).then(() => {
    res.status(200).send("deleted")
  });
    } catch (e) {
      next("Failed to delete movie" + e) 
    }
    
  
    });
       
  // delet in async/await way
  // app.delete('/delete/:id', async (req,res) => {
  //   let {id}= req.params;
  //   let sql=`DELETE FRROM movies where id = ${id}`;
  //    await dbClient.query(sql)
  //     res.status(200).send("deleted")  
  //     })


    
 //localhost:update/id
 Router.put('/:id' , async(req,res,next) =>{
try {
    let {newMainActor} = req.body;
    let {id}= req.params;
    let sql=`UPDATE movies SET mainActor=$1 where id =${id}`;
    client.query(sql,[newMainActor]).then(() => {
      res.status(200).send("Updated");
    });
    
} catch (e) {
  next("Failed to update movie" + e) 
}

  });
    

  //localhost:3000/getMovie/id
  Router.get('getMovie/:id',  (req,res,next) => {
try {
    let { id } = req.params;
    let sql= `SELECT FROM movies where id = ${id}`;
    client.query(sql).then(response => { 
     res.status(200).send(response.rows)
    });
} catch (e) {
  next("Failed to get movie" + e) 
}
  });

  
   // get in async await 
  //   app.get('getMovie/:id', async (req,res) => {
  //   let { id } = req.params;
  //   let sql= `SELECT FROM movies where id = ${id}`;
  //   let response= await dbClient.query(sql)
  //   res.status(200).send(response.rows)
  // })



  module.exports = Router;
