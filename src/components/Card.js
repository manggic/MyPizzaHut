import React, { useContext, useState, useEffect } from "react";
import { Link ,BrowserRouter as Router} from "react-router-dom"
import { Header }  from '../layout/header'
import { Carts } from "./carts"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../context/context";
export const Card = ( { cards }) => {

   const context = useContext(MyContext) 
  // const [info , setInfo ] = useState([]) 
  const [ person, setPerson  ] = useState({})   
  const [modal, setModal] = useState(false);
  // const [singlecard, setSinglecard  ]  =useState({})

  const toggle = ( card  ) =>{
     setModal(!modal);
     if(!modal){
      context.setSingleCard( [ ...context.singleCard,  card ]  );
      console.log(context.singleCard);
     }
     
  } 

  const handleCart =()=>{

    if( person.name && person.number && person.address){
      context.setPersonInfo([  ...context.personInfo,  person  ])
      toast(`${ context.singleCard[context.singleCard.length-1].name } is Added to the card` , { type : "info" })
    }
    else{
      toast("Please provide the overall information", { type:'error' })
    } 
  }

  const handlePurchase = ()=>{

    console.log(person)
    if( person.name && person.number && person.address ){
      toast(`Your order for  ${ context.singleCard[context.singleCard.length-1].name  } is Placed`, { type: "success" })
      var pizzaName = `${context.singleCard[context.singleCard.length-1].name }`
      console.log(pizzaName)
      setPerson({})
      console.log(document.getElementsByName(pizzaName).innerHTML)
      document.getElementById(pizzaName).innerHTML= "Purchased";
      document.getElementById(pizzaName).disabled = true;
      document.getElementById(pizzaName).style.width = "200px"; 
    }
    else{
      toast("Please provide the overall information", { type:'error' })
    }     
  }


  console.log("card", context);


   return ( 
    <div class="Container">
     <ToastContainer />
     <Modal className='mymodal' isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Order</ModalHeader>
        <ModalBody className='modalbody'>
           <div className="pb-3 row" ><span className="col-4"  ><b>Name :</b>   </span>  <input className="col-8" onChange={ (e)=>{ setPerson({ ...person,  "name": e.target.value })}}  type="text"      /></div> 
           <div className="pb-3 row" ><span className="col-4" ><b>Mobile No :</b></span> <input className="col-8" onChange={ (e)=>{ setPerson({ ...person,  "number": e.target.value })}} type="number"   /></div> 
           <div className="pb-3 row" ><span className="col-4" ><b>Address :</b></span>  <textarea className="col-8" onChange={ (e)=>{ setPerson({ ...person,  "address": e.target.value })}} id="address" rows="3"  cols="40"    /></div>
        </ModalBody>
        <ModalFooter className='modalfooter'>
          <Button color="dark text-white" onClick={ handleCart }>Add Cart</Button>
          <Button color="dark text-white" onClick={ handlePurchase }>Purchase</Button>
        </ModalFooter>
      </Modal>


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
             <button id={card.name}  name={ card.name }  type="button" onClick={()=> toggle(card) } className="btn btn-primary btn-sm buy">BUY</button>              
            </div>
          </div>
        ))}
      </div>
           
      {/* <Carts  info ={ info } singlecard ={ singlecard }  /> */}
  
    </div>
  );
};
