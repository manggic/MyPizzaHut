


import React,{ useContext } from "react"
import { MyContext } from "../context/context";
import { Redirect } from "react-router-dom"
import {ToastContainer, toast }  from "react-toastify"

export const Carts = () =>{
   
  const context = useContext(MyContext);
    console.log("carts",context)
    if( !context.user?.uid){
        return <Redirect  to="/signin"  />
      }

     if(context.singleCard.length === 0){
         return <h1>Cart is empty!!!</h1>
     }

    return( <>
        <div class="carts">
         <ToastContainer />
            {context.singleCard.map((cart, key)=>(
               <div key={ key } className="row" >
                   <div className='col-6 row'>
                      <div className='col-6'> <img className="cartimg" src={ cart.image } /></div>
                       <div className="col-6">
                       <p>Name :{ cart.name}</p>
                       <p>Price :{ cart.price}</p>
                       </div>
                           
                   </div>
                   <div className='col-6'>
                       <p>Name :{context.personInfo[key].name}</p>
                       <p>Number :{context.personInfo[key].number}</p>
                       <p>Address :{context.personInfo[key].address}</p>    
                   </div>             
               </div>
            )) } 
        </div>
    </>  )
};