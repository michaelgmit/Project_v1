import React from "react";
import { MovieItem } from "./movieItem";

export class Movies extends React.Component {
  render() {
      /*map function takes movies and splits into each section*/
    
    return this.props.movies.map((movie) => {
      //pass movie item AND reload data method 
      //passed reload data method from its parent - read.js
      //movies.js will now pass to all of its children ie/read.js grandchildren
      return <MovieItem key={movie.poster} movie={movie} ReloadData={this.props.ReloadData}></MovieItem>;
    });
  } //end render method
} //end component
