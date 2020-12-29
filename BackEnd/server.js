const express = require("express");
const app = express();
const port = 4000; //change from 3000 as running 2 applications simultaneously
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //including mongoose
const path = require ('path');

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build/static')));


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//mongoose connection
const myConnectionString =
  "mongodb+srv://admin:admin@cluster0.9jcxs.mongodb.net/movies?retryWrites=true&w=majority";
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

//movie schema - what db will look like
var movieSchema = new Schema({
  title: String,
  year: String,
  poster: String,
});

//refer to movie model each time you interact with db
var MovieModel = mongoose.model("movie", movieSchema);

app.get("/api/movies", (req, res) => {
  // const mymovies = [
  //   {
  //     Title: "Avengers: Infinity War",
  //     Year: "2018",
  //     imdbID: "tt4154756",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Captain America: Civil War",
  //     Year: "2016",
  //     imdbID: "tt3498820",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
  //   },
  // ];

  //find all records in db and send back
  MovieModel.find((err, data) => {
    res.json(data);
  });

  // res.status(200).json({
  //   message: "Everything is ok",
  //   movies: mymovies}); //can pass as many things as you need
});

// listen for http that has delete method
app.delete("/api/movies/:id", (req, res) => {
  console.log("Delete Movie: " + req.params.id);

  // interact with data model to find record, deletes record
  MovieModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
});

//take id and return data with associated movie
app.get("/api/movies/:id", (req, res) => {
  console.log(req.params.id);

  MovieModel.findById(req.params.id, (err, data) => {
    res.json(data);
  });
});

//method for editing record
app.put("/api/movies/:id", (req, res) => {
  console.log("Update movie: " + req.params.id);
  //pass up object containing new movie data
  console.log(req.body);

  //interact with db
  MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},//{new:true} for creating a new record
    (err,data)=>{
      res.send(data);
    })
});//makes asynchronous call to db, finds record with id and updates it

app.post("/api/movies", (req, res) => {
  console.log("Movie Received!");
  console.log(req.body.title);
  console.log(req.body.year);
  console.log(req.body.poster);

  MovieModel.create({
    title: req.body.title,
    year: req.body.year,
    poster: req.body.poster,
  });

  res.send("Item Added");
});

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
