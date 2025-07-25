import React, { Component, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App =()=> {
  const apiKey = process.env.React_App_News_API;
  const pageSize = 20;
  const [progress , newprogress] = useState(0)

  const updateProgress = (progress) => {
    newprogress(progress);
  };
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar height={3} color="#f11946" progress={progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress}
                  key="general"
                  pageSize={pageSize}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress}
                  key="business"
                  pageSize={pageSize}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress}
                  key="entertainment"
                  pageSize={pageSize}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress}
                  key="general-2"
                  pageSize={pageSize}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress} key="health" pageSize={pageSize} category="health" />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress}
                  key="science"
                  pageSize={pageSize}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress} key="sports" pageSize={pageSize} category="sports" />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News apiKey={apiKey} updateProgress={updateProgress}
                  key="technology"
                  pageSize={pageSize}
                  category="technology"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }

export default App;
