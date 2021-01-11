


import React,{ useContext, useState, useEffect } from "react"
import { MyContext } from "../context/context";
import { Redirect } from "react-router-dom"
import {ToastContainer, toast }  from "react-toastify"
import {Header} from '../layout/header'
import MiniCard from "./cardOfCarts";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HistoryCard from "./historyCart";
import firebase from "firebase/app";


export const Carts = () =>{
   
  const context = useContext(MyContext);
  const [modal, setModal] = useState(false);
  const [ person, setPerson  ] = useState({})   
  

    console.log("Singlecard",context.singleCard  )





      
   const activateFirebase = () =>{
       
    console.log( "firebase", context.orders, context.history);
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
  

    if( !context.user?.uid){
        return <Redirect  to="/signin"  />
      }

    //  if(  Object.keys( context.singleCard ).length  === 0){
    //      return <h1><Header />Cart is empty!!!</h1>
    //  }

    const toggle = ( card  ) =>{
     setModal(!modal);
     if(!modal){
    //   context.setPersonInfo()
      console.log(context.singleCard);
     }
     
  } 


   const handleSubmit = () =>{
        context.setPersonInfo(person)
        context.setCount(0)

        let newHistory = context.history
                for(let i in context.orders){
            // console.log( orders[i] )
             newHistory[ Object.keys(context.history).length ] = context.orders[i]
          }

        console.log( context.orders );
        context.setHistory( newHistory )
        context.setOrders({})
        toast('Added Your Info', {   type : "info"})
        console.log('person',  person );
   }

    return( <>
        <Header />
          <Modal className='mymodal' isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Order</ModalHeader>
        <ModalBody className='modalbody'>
           <div className="pb-3 row" ><span className="col-4"  ><b>Name :</b>   </span>  <input className="col-8"  onChange={ (e)=>{ setPerson({ ...person,  "name": e.target.value })}}  type="text"      /></div> 
           <div className="pb-3 row" ><span className="col-4" ><b>Mobile No :</b></span> <input className="col-8"  onChange={ (e)=>{ setPerson({ ...person,  "number": e.target.value })}} type="number"   /></div> 
           <div className="pb-3 row" ><span className="col-4" ><b>Address :</b></span>  <textarea className="col-8"  onChange={ (e)=>{ setPerson({ ...person,  "address": e.target.value })}} id="address" rows="3"  cols="40"    /></div>
        </ModalBody>
        <ModalFooter className='modalfooter'>
          <Button color="dark text-white" onClick={ handleSubmit }>Submit</Button>
        </ModalFooter>
      </Modal>

         <ToastContainer />
        <div class="carts row" >
           <div className='col-6'>
           <h3 className='text-center'>Orders</h3>
            {
                Object.entries(context.orders).map( (key) =>(
                     <MiniCard cart = {key[1]} key={ key[0] } />         
                ) )
             }
            { Object.keys(context.orders).length  !== 0 ?
              <button onClick={ toggle } className='btn btn-info ml-4'>Purchase All</button>:(<h1 className='text-center'>Cart is empty!!!</h1>) }
            </div>
            <div className='col-6 border'>
                <h3 className='text-center'>Purchased History</h3>
                {   Object.entries(context.history).map( (key) =>(
                     <HistoryCard cart = {key[1]} key={ key[0] } />         
                ) )
                    }
                    { Object.keys(context.history).length  !== 0 ?
            '':(<h1 className='text-center'>History is empty!!!</h1>) }  
                
            </div>
        </div>
    </>  )
};
