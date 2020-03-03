import React, { Component } from "react";
import io from "socket.io-client";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      endpoint: "http://localhost:3005/"
    };
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);
    socket.emit("connection");
  }

  sendData = () => {
    const { endpoint } = this.state;
    const socket = io(endpoint);
    const { text } = this.state;
    socket.emit("outgoing", { data: text });
  };

  render() {
    const { thanks } = this.state;
    return (
      <div>
        <form onSubmit={this.sendData}>
          <label>
            Testing:
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h1>{thanks}</h1>
      </div>
    );
  }
}
