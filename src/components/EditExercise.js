import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  componentDidMount() {
    // Get id from the url and then gets its data
    axios.get("http://localhost:5000/exercises/"+ this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        })
      })
      .catch(err => console.log("Error: " + err));

    // Set username based on the previous get call
    axios.get("http://localhost:5000/users")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username)
          })
        }
      })
      .catch(err => console.log("Error: " + err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = date => {
    this.setState({ date });
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    // update data to the backed
    axios.post("http://localhost:5000/exercises/update/" + this.props.match.params.id, exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));

      window.location = '/';
  };
  
  render() {
    return (
      <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref="userInput"
            required
            className="form-control"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          >
            {this.state.users.map(user => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={this.state.duration}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
    );
  }
}

export default EditExercise;
