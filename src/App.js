import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import  { Route, Link, BrowserRouter as Router, Switch} from "react-router-dom"

import Axios from "axios";
import { MyContext } from "./context/context"
import  SignUp  from './pages/signup'
import { Card } from "./components/Card"

import { Home } from "./pages/home"
import  SignIn from "./pages/signin"
import { Carts  } from "./components/carts";


import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./components/firebaseConfig";
firebase.initializeApp(firebaseConfig)


function App() {

   const [ user , setUser ] = useState(null);
   const [ personInfo, setPersonInfo ] =useState([])

   const [ singleCard , setSingleCard  ] =useState([])

  return (        
    <MyContext.Provider value = {{  user, setUser , personInfo, setPersonInfo, singleCard, setSingleCard }} >
    <Router>
        <Switch>
        <Route exact path="/" component={ Home  }></Route>
        <Route exact path="/signin" component={ SignIn  }></Route>
        <Route exact path="/signup" component={ SignUp }></Route>
        <Route exact path="/carts" component={ Carts }></Route>  
        </Switch>
    </Router>
    </MyContext.Provider>
    
  );
}

export default App;
