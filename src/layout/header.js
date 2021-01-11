



import React, { useContext } from "react";

import { MyContext } from "../context/context";
import { Link ,BrowserRouter as Router} from "react-router-dom";

export const Header =()=>{

    const context = useContext(MyContext)
    // const { setUser } = useContext(MyContext)

   return(
      
    <header className="header">
    <p className="flex-grow-1 heading">Manish Pizza Gallery</p>
    
    { ( context.user?.uid  )?(
        <div className="navy" >
          <Link to="/"  >Home</Link>
          <Link  to="/carts"  >Carts</Link>
          <Link onClick={ ()=>{  context.setUser(null)
                                 context.setPersonInfo({})
                                 context.setOrders({})
                                  context.setHistory({})
                                  context.setCount(0)
                                  context.setSingleCard({})     } }  to="/"  >Log Out</Link> 
         </div>
    ):(<div className="navy" >
          <Link to="/"  >Home</Link>
          <Link to="/carts"  >Carts</Link>
          <Link to="/signin" >SignIn</Link>
          <Link to="/signup" >SignUp</Link>
         </div>) }
    </header>
   )
}

