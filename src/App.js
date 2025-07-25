import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.React_App_News_API;
  pageSize = 20;
  state = {
    progress: 0,
  };
  updateProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar height={3} color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress}
                  key="general"
                  pageSize={this.pageSize}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress}
                  key="business"
                  pageSize={this.pageSize}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress}
                  key="entertainment"
                  pageSize={this.pageSize}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress}
                  key="general-2"
                  pageSize={this.pageSize}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress} key="health" pageSize={this.pageSize} category="health" />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress}
                  key="science"
                  pageSize={this.pageSize}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress} key="sports" pageSize={this.pageSize} category="sports" />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News apiKey={this.apiKey} updateProgress={this.updateProgress}
                  key="technology"
                  pageSize={this.pageSize}
                  category="technology"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
