import React from "react";
import axios from "axios";

export class Edit extends React.Component {
  constructor() {
    super(); //invoke constructor of parent class

    // Bind all events
    // won't execute unless binded to this instance of the class
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangePoster = this.onChangePoster.bind(this);

    this.state = {
      Title: "",
      Year: "",
      Poster: "",
    };
  }

  //Lifecycle Hook - componentDidMount gets fired when component becomes active in the view
  componentDidMount() {
    console.log(this.props.match.params.id); //log id to console

    //Read record from db
    //call get request from server.js
    axios
      .get("http://localhost:4000/api/movies/" + this.props.match.params.id) //returns promise
      .then((response) => {
        //define what to do with returned data and set state
        this.setState({
          _id: response.data._id,
          Title: response.data.title,
          Year: response.data.year,
          Poster: response.data.poster,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Functions for when values change
  onChangeTitle(e) {
    this.setState({
      Title: e.target.value,
    });
  }

  onChangeYear(e) {
    this.setState({
      Year: e.target.value,
    });
  }

  onChangePoster(e) {
    this.setState({
      Poster: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //prevents calling button multiple times
    alert(
      "Movie: " +
        this.state.Title +
        " " +
        this.state.Year +
        " " +
        this.state.Poster
    );

    const newMovie = {
      title: this.state.Title,
      year: this.state.Year,
      poster: this.state.Poster,
      _id: this.state._id,
    };

    //edit a record
    axios
      .put("http://localhost:4000/api/movies/" + this.state._id, newMovie)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .post("http://localhost:4000/api/movies", newMovie) //returns promise
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add Movie Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Title}
              onChange={this.onChangeTitle}
            ></input>
          </div>
          <div className="form-group">
            <label>Add Movie Year: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Year}
              onChange={this.onChangeYear}
            ></input>
          </div>
          <div className="form-group">
            <label>Movie Poster</label>
            <textarea
              type="text"
              className="form-control"
              value={this.state.Poster}
              onChange={this.onChangePoster}
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Movie"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    );
  } //end render method
} //end component
