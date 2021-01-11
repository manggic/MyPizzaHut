
import React, { useState, useContext } from "react";

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

const SignUp = () =>{

    const context = useContext( MyContext);
      
    const [ email, setEmail ] = useState("");
    const  [ password , setPassword ] = useState('');

    const handleSignUp = ()=>{
      firebase
               .auth()
               .createUserWithEmailAndPassword( email, password )
               .then( res =>{
                   console.log('signIn response of firebase :',res)
                   context.setUser( { email : res.user.email,
				uid: res.user.uid
				
             })             
                 })
               .catch( error =>{
                   console.log(error)
                   toast(error.message, { type : "error"})
               }  )
	}
	
	if( context?.user?.email)
	   return <Redirect  to="/"  />
    
    const handleSubmit =(e)=>{
	   e.preventDefault();
	   ( email && password ) ? ( handleSignUp()) : ( 
		   toast( "Please provide Full input", { type: "error" })
	    )
    }

    
    return (
		<>
		<div className='Container'>
	     	<Header />
            <ToastContainer />
             <div className="signinbox">
				<Form onSubmit={handleSubmit}>
				<div className='signinhead'>
                     Sign Up
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
						</div>		
			 	<div className='signinfoot'>
			        	<Button type='submit' color='primary'>
									Sign Up
								</Button>
				</div>
				</Form>
			 </div>
		</div>
		</>
	);

}

export default SignUp;

 