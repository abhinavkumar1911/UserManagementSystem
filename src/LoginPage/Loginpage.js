import React, { useState } from "react";
//import backgroundImage from '../Images/User-BackGround.webp'; 
import { Col, Container, FormGroup, FormLabel, Row, FormControl, Button, Form} from "react-bootstrap";
import './Loginpage.css'
import {  useNavigate } from "react-router-dom";




function LoginPage() {
    const [user,setUser]=useState('')
    const [pass,setPass]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()
    //define user id and Pasword
    const PredefineId='Admin'
    const Predefinepas='Password'


    //handle the submit
    const handleSubmit=(event)=>{
        event.preventDefault()
        if(user===PredefineId && pass===Predefinepas){
          setError("")
          navigate('/Adduser')
        }
        else{
          setError("Invalid user id and pasword contact Administrator")
        }
    }

  

   
  // Styling for the background image
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/Images/User-BackGround.webp)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    padding:'1rem'

  };

  return (
    <div style={backgroundImageStyle}>
      {/* Container for the login form */}
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}></Container>
         <div  className="login-container">
         <h2 className="mb-4 mt-0 ms-0" id="heading">Login</h2>
         <Form>
            <Row className="justify-content-right">
          <Col xs={12} md={6} lg={6}>
           

            {/* User ID Field */}
            <FormGroup controlId="UserId">
              <FormLabel className="fw-bold text-start d-block">User Id</FormLabel>
              <FormControl type="text" placeholder="Enter User Id" className="wide-input" value={user} onChange={(e)=>setUser(e.target.value)} />
            </FormGroup>

            {/* Password Field */}
            <FormGroup controlId="Password" className="mt-3">
              <FormLabel className="fw-bold text-start d-block">Password</FormLabel>
              <FormControl type="password" placeholder="Enter Password" className="wide-input"  value={pass} onChange={(e)=>setPass(e.target.value)}/>
            </FormGroup>
            {error && <p className="text-danger mt-2 md-2">{error}</p>}

            {/* Login Button */}
            <div className="d-flex justify-content-between gap-3 mt-3">
  <Button variant="primary" className="w-100" type="submit" onClick={handleSubmit}>
    Login
  </Button>
  <Button
    variant="secondary"
    className="w-100"
    type="button"
    onClick={() => {
      setUser('');
      setPass('');
      setError('');
    }}
  >
    Cancel
  </Button>
</div>
          </Col>
        </Row>
         </Form>
        
        </div>
    
     
     
    </div>
  );
}

export default LoginPage;
