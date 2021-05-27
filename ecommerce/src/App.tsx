import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
     <React.Fragment>
        <Router>
           <Route path="/" component={HomeScreen} exact={true} strict></Route>
        </Router>
     </React.Fragment>
  );
}

export default App;