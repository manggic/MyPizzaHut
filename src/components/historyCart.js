

import React from 'react'
const HistoryCard = ( { cart } ) =>{

     
    return (
        <div class = "minicard card d-flex box-shadow" >
        {/* <div onClick={ removeCart } className='BsX'><BsX /></div> */}
          <div class = "card-body d-flex" style= {{ textAlign: 'left', height: "250px" }} >
              <div className='d-flex  justify-content-center   col-8 flex-column'>
                <strong class="mb-3 text-primary">Name : { cart.name}</strong> 
                <div class="mb-1 text-muted">Price : { cart.price}</div>
              </div>
              <img class="card-img-right  col-4"  alt="Thumbnail [200x250]" style={{ height: "200px"}} src={cart.image  }  />               
           </div>
          {/* <button  onClick={ singlePurchase } className='btn btn-success d-block border'>Purchase</button>  */}
        </div>
    )
}


export default HistoryCard;