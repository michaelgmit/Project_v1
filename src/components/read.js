import React from "react";
import { Movies } from "./movies";
import axios from "axios";

export class Read extends React.Component {
  state = {
    movies: [], //end movies object, can add as many objects to state as you want
  }; //end state, allows us to store data to be used in class

  //component lifecycle hook (gets called every time component is mounted)
  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/movies"
      )
      .then((response) => {
        this.setState({ movies: response.data.movies });
      }) //what happens when it works
      .catch((error) => {
        console.log(error);
      }); //what happens when it doesn't work
  }

  render() {
    return (
      <div>
        <h1>This is the Read component.</h1>
        <Movies movies={this.state.movies}></Movies>{" "}
        {/* using JSX, passing movies down as part of object called movies */}
      </div>
    );
  } //end render method
} //end component
