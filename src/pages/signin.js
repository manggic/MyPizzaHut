
import React, { useState, useContext, useEffect } from "react";

import { 
    Container,
    Col,
    Row,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Label,
    Button,
    Input,
    Form,
    FormGroup

} from "reactstrap"

import firebase from 'firebase/app';
import { MyContext }  from "../context/context";
import { Header  }  from '../layout/header'
import { Redirect } from "react-router-dom"


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"

const SignIn = () =>{

    const context = useContext( MyContext);      
    const [ email, setEmail ] = useState("");
    const  [ password , setPassword ] = useState('');
	const [ isChecked, setIsChecked  ] =useState(false);
	
    const handleSignUp = ()=>{
      firebase
               .auth()
               .signInWithEmailAndPassword( email, password )
               .then( res =>{
                   console.log(res)
                   context.setUser( { email : res.user.email,
                uid: res.user.uid
             })       
                 })
               .catch( error =>{
                   console.log(error)
                   toast(error.message, { type : "error"})
               }  )
    }
    
    const handleSubmit =(e)=>{
	   e.preventDefault();
	if(email && password){
		if( isChecked){
			localStorage.setItem("detail", JSON.stringify( {
				"email": email ,
				"password" : password,
				"checked" : isChecked

			} ));
	  }
       else{
              localStorage.removeItem("details")    
	   }
	   handleSignUp();
	}
	   else{
		toast( "Please provide Full input", { type: "error" })
	   }
    }

    useEffect(()=>{
		try{
            let detail = localStorage.getItem("detail")
	    detail =JSON.parse(detail)
		  setEmail(detail.email);	
		  setPassword(detail.password);	 
		console.log('useeffect' ,email)
		console.log('useeffect' ,password)
		}
		catch(error){
			console.log("Not found")
		}
		   
	}, [])

	console.log("signin", context) 
    if( context.user?.uid ){
      return <Redirect  to="/" />
    }

    return (
		<>
		<div className='Container'>
	     	<Header />
            <ToastContainer />
             <div className="signinbox">
				<Form onSubmit={handleSubmit}>
				<div className='signinhead'>
                     Sign In
				</div>			
				<div className='signinbody'>			
								<FormGroup row>
									<Label for='email' lg={3} >
										Email
									</Label>
									<Col lg={9}>
										<Input
											type='email'
											name='email'
											id='email'
											placeholder='provide your email'
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' lg={3} >
										Password
									</Label>
									<Col lg={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='your password here'
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<input type="checkbox" onChange ={ ()=> setIsChecked(!isChecked) } />  Remember me 
						</div>		
			 	<div className='signinfoot'>
			        	<Button type='submit' color='primary'>
									Sign In
								</Button>
				</div>
				</Form>
			 </div>

		</div>
		</>
	);

}

export default SignIn;

 