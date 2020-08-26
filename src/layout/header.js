



import React, { useContext } from "react";

import { MyContext } from "../context/context";
import { Link ,BrowserRouter as Router} from "react-router-dom";

export const Header =()=>{

    const { user } = useContext(MyContext)
    const { setUser } = useContext(MyContext)

   return(
      
    <header className="header">
    <p className="flex-grow-1 heading">Manish Pizza Gallery</p>
    
    { ( user?.uid  )?(
        <div className="navy">
          <Link to="/" >Home</Link>
          <Link  to="/carts" >Carts</Link>
          <Link onClick={ ()=>{  setUser(null) } } to="/"  >Log Out</Link> 
         </div>
    ):(<div className="navy">
          <Link to="/" >Home</Link>
          <Link to="/carts" >Carts</Link>
          <Link to="/signin" >SignIn</Link>
          <Link to="/signup" >SignUp</Link>
         </div>) }
    
    
    
    
    </header>
   )
}

