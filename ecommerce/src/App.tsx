import React, { Component } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

interface IState{}
interface IProps{}
class App extends Component<IProps,IState> {
   constructor(props:IProps){
      super(props);
   }
   render(){ return (
      <React.Fragment>
         <Router>
            <div className="grid-container">
               <header className="row">
                  <div>
                     <NavLink to="/" exact={true} strict className="brand">AshokIT</NavLink>
                  </div>
                  <div>
                     <NavLink to="/" exact={true} strict>Cart</NavLink>
                      <NavLink to="/" exact={true} strict>SignIn</NavLink>
                  </div>
 
               </header>
 
               <main>
               <Route path="/" component={HomeScreen} exact={true} strict></Route>
               </main>
 
               <footer className="row center">
                  copyright@ashokIt.in
               </footer>
 
            </div>
            
         </Router>
      </React.Fragment>
   );}
 
}

export default App;