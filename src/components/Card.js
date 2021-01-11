import React, { useContext, useState, useEffect } from "react";
import { Link ,BrowserRouter as Router, Redirect} from "react-router-dom"
import { Header }  from '../layout/header'
import { Carts } from "./carts"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../context/context";
import firebase from "firebase/app";
import "firebase/database";


export const Card = ( { cards }) => {

   const context = useContext(MyContext) 
  // const [info , setInfo ] = useState([]) 
  const [ person, setPerson  ] = useState({ name : "manya", number : "9029", address: "deen"})   
  const [modal, setModal] = useState(false);
    const [ isRedirect , setIsRedirect ] = useState(false)
   

    // const getResp = () => {
    //   let be =   firebase.database().ref('/users/' + context.user.uid ).once('value').then((snapshot) => {
    //     var username = snapshot.val();
    //        console.log(username);
    //       // context.setHistory( ( 'history' in username )?( username.history):{} )
    //      //  context.orders  =  
    //   });
    // }

    // useEffect(  () => {
    //        getResp()      
    // } )




   const addToCart = ( cart ) => {

        context.setSingleCard(cart)
       // let key = Object.keys(context.orders).length
        let newObj = context.orders
        newObj[context.count] = cart
       
        context.setCount( context.count + 1)
        context.setOrders(newObj)       
        toast( `${cart.name} added to the cart`, { type : 'success' } )
       // console.log('after buy single order :', context.singleCard );
       // console.log('after buy orders :', context.orders);
   }

  console.log("Card", context);


   return ( 
    <div class="Container">
     <ToastContainer />
     { isRedirect?( <Redirect to='/carts' />  ):"" }
   

     <Header />
      {/* images  */}
      <div class="Row">
        {cards.map((card,key) => (
          <div class="card" key ={key} >
            <img src={card.image}  alt="image" />
            <div class="card-body cardy">
              <p id="name"   ><b>Name : { card.name }</b></p>
              <p>Location : { card.location }</p>
              <p id="price"> Price : { card.price }</p>
             <button id={card.name}  name={ card.name }  type="button" onClick={()=> addToCart(card) } className="btn btn-primary btn-sm buy">BUY</button>              
            </div>
          </div>
        ))}
      </div>
           
      {/* <Carts  info ={ info } singlecard ={ singlecard }  /> */}
  
    </div>
  );
};
