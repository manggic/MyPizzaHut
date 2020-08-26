

import React, { useEffect, useContext , useState }  from "react";
import { Card } from "../components/Card";
import One from '../images/1.jpg'
import Two  from '../images/2.jpg'
import Three from '../images/3.jpg'
import Four from '../images/4.jpg'
import Five  from '../images/5.jpg'
import Six from "../images/6.jpg"
import { MyContext } from "../context/context"
import { Redirect } from "react-router-dom"
import  SignIn from "./signin"

// import firebase, { initializeApp } from "firebase/app";
// import "firebase/auth";


export const Home =  ()  =>{
   
    const context = useContext(MyContext);
    const [ cards , setCards ] = useState([]);
  const pizzaLocation = [ 'Malad', 'BKC','Santacruz','dadar','khar','cst']
  const pizzaNames =['Butter Chicken Pizza','Piccante Pepperoni Pizza','Basilico Margherita Pizza',
  'Pollo Forza Pizza','Meat Ultimo Pizza','Smoked Salmon Pizza' ]
  const pizzaPrices = [ 230, 450, 300, 500, 250, 400  ]
  const pizzaImages = [One, Two ,Three, Four, Five, Six ]  

   useEffect(()=>{
      const fullObj = pizzaLocation.map( (name,key)  => (
         { 'image': pizzaImages[key] ,  "location" : name,"name" : pizzaNames[key],"price" : pizzaPrices[key]   }
      ))

        setCards(fullObj);
   },[] )

   console.log("home", context );
   if( !context.user?.uid){
     return <Redirect  to="/signin"  />
   }
    
  return(
           <Card cards={ cards } />                  
  );
}