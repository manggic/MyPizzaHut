

import React,{ useContext, useEffect } from "react"
import Card from "reactstrap/lib/Card";
import { MyContext } from "../context/context";
import firebase from "firebase/app";

import {BsX} from 'react-icons/bs'
import { toast } from "react-toastify";


const MiniCard = ( { cart, key }) => {
     const context = useContext(MyContext);

     const singlePurchase = () => {
            console.log(cart.name);
            console.log( context.orders );
           let newOrders =   Object.entries(context.orders).filter( order => (order[1].name !== cart.name)  ) 
           toast( `${cart.name} is successfully purchased`, { type : 'success'})
           context.setSingleCard({})
          console.log( newOrders );
          context.setOrders(Object.fromEntries(newOrders))
          let key = Object.keys(context.history).length
          let newObj = context.history
          newObj[key] = cart
          context.setCount( context.count - 1)
          context.setHistory(newObj)
         // console.log( context.history );
     }


   const activateFirebase = () =>{
     //   let trimEmail = context.user.email.slice(0, context.user.email.indexOf('@')) 

    firebase.database().ref(`users/`+ context.user.uid ).set({
          email: context.user.email,
           uid :  context.user.uid ,
           info : context.personInfo ,
           orders : context.orders,
           history: context.history,
       count : context.count

      }) 
   }


   useEffect( () => {
             activateFirebase()
   } , [ context ] )    


     const removeCart = () =>{
        let newOrders =    Object.entries(context.orders).filter( order => (order[1].name !== cart.name)  ) 
        toast( `${cart.name} is successfully removed`, { type : 'error'})
        context.setSingleCard({})
        context.setCount( context.count - 1 )
        context.setOrders( Object.fromEntries(newOrders) )
     }

      return(          
        // <div key={ key } className=""                  
            <div class = "minicard card d-flex box-shadow" >
            <div onClick={ removeCart } className='BsX'><BsX /></div>
              <div class = "card-body d-flex" style= {{ textAlign: 'left', height: "250px" }} >
                  <div className='d-flex  justify-content-center   col-8 flex-column'>
                    <strong class="mb-3 text-primary">Name : { cart.name}</strong> 
                    <div class="mb-1 text-muted">Price : { cart.price}</div>
                  </div>
                  <img class="card-img-right  col-4"  alt="Thumbnail [200x250]" style={{ height: "200px"}} src={cart.image  }  />               
               </div>
              <button  onClick={ singlePurchase } className='btn btn-success d-block border'>Purchase</button> 
            </div>            
    // </div>
      )
}

export default MiniCard;
