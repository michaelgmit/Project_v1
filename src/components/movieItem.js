import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export class MovieItem extends React.Component {

  //add constructor for binding
  constructor(){
    super();

    this.DeleteMovie = this.DeleteMovie.bind(this);
  }

  //delete movie method
  DeleteMovie(e){
    //prevent method being called every time page loads
    // use on every method which is called via an event
    e.preventDefault();
    console.log("Delete: "+this.props.movie._id);

    //pass up id 
    axios.delete("http://localhost:4000/api/movies/"+this.props.movie._id)
    .then(()=>{
      this.props.ReloadData();
    })
    .catch();
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header>{this.props.movie.title}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <img src={this.props.movie.poster} width="200"></img>
              <footer className="blockquote-footer">
                {this.props.movie.year}
              </footer>
            </blockquote>
          </Card.Body>

          {/* Delete Button */}
          <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
        </Card>
      </div> //div tag must always be included
    );
  } //end render method
} //end component
