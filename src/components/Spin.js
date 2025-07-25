import React, { Component } from "react";
import magnify from "./magnify.gif";

export default class Spin extends Component {
  render() {
    return (
      <div className="text-center my-4">
        <img
          src={magnify}
          alt="loading"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    );
  }
}
