import React, { Component } from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import Hangman from "./Hangman";
import Board from "./Board";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div className = "App">
        <Route exact path = "/" component = {Home}/>  
        <Route exact path = "/hangman" component = {Hangman}/>  
        <Route exact path = "/lightsOut" component = {Board}/>  
      </div>
    );
  }
}

export default App;
