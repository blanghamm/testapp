import React, { Component } from "react";
import io from "socket.io-client";

export default class Home extends Component {
  state = {
    response: "",
    endpoint: "http://localhost:3005/api"
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);
    const { response } = this.state;
    socket.on(
      "connectionAPI",
      res => this.setState({ response: res }),
      console.log(response)
    );
  }
  render() {
    const { response } = this.state;
    return <div> {response} </div>;
  }
}
