import React from "react";
import { MovieItem } from "./movieItem";

export class Movies extends React.Component {
  render() {
    {
      /*map function takes movies and splits into each section*/
    }
    return this.props.movies.map((movie) => {
      return <MovieItem movie={movie}></MovieItem>;
    });
  } //end render method
} //end component
