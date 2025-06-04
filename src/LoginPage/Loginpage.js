import React, { useState } from "react";
//import backgroundImage from '../Images/User-BackGround.webp'; // Make sure the image path is correct
import { Col, Container, FormGroup, FormLabel, Row, FormControl, Button, Form } from "react-bootstrap";
import './Loginpage.css'
import {  useNavigate } from "react-router-dom";




function LoginPage() {
    const [user,setUser]=useState('Admin')
    const [pass,setPass]=useState('password')
    const navigate=useNavigate()
    const handleSubmit=(event)=>{
        event.preventDefault()
        navigate('/Dashboard')
    }


   
  // Styling for the background image
  const backgroundImageStyle = {
    backgroundImage: `url('/Images/User-BackGround.webp')`, // Ensure this path is correct
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content both vertically and horizontally
  };

  return (
    <div style={backgroundImageStyle}>
      {/* Container for the login form */}
        
         <Container  className="login-container">
         <h2 className="mb-4 mt-0 ms-0" id="heading">Login</h2>
        <Row className="justify-content-right">
          <Col xs={12} md={6} lg={6}>
           

            {/* User ID Field */}
            <FormGroup controlId="UserId">
              <FormLabel className="fw-bold text-start d-block">User Id</FormLabel>
              <FormControl type="text" placeholder="Enter User Id" className="wide-input" value={user}  />
            </FormGroup>

            {/* Password Field */}
            <FormGroup controlId="Password" className="mt-3">
              <FormLabel className="fw-bold text-start d-block">Password</FormLabel>
              <FormControl type="password" placeholder="Enter Password" className="wide-input"  value={pass}/>
            </FormGroup>

            {/* Login Button */}
            <Button variant="primary" className="mt-3 w-48" type="submit" onClick={handleSubmit}>
              Login
            </Button>
            <Button variant="secondary" className="mt-3 ms-5 w-48" type="cancel">
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
     
     
    </div>
  );
}

export default LoginPage;
