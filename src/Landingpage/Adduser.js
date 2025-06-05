import { Container, Row, Col, Form as BootstrapForm, Button } from "react-bootstrap";
import './Form.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formschema } from "./Formschema";
import { useFormik } from "formik";

function Adduser() {
  const formvariable={
    FName:'', 
    LName:'',
    Email:'',
    Username:''
  }

  
  const{handleChange,handleSubmit,values,errors,handleBlur,touched,resetForm}=useFormik({
    initialValues: formvariable,
    validationSchema:Formschema,
    onSubmit: (values,action) => {
    console.log("Form Submitted", values);
    action.resetForm();
    }

  })
    
  return (
    <Container className="add-form-container mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Enter the Student Details</h2>
        </Col>
      </Row>

      <BootstrapForm onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
            <BootstrapForm.Label><b>Student First Name</b></BootstrapForm.Label>
            <BootstrapForm.Control type="text"  placeholder="Enter first name"  name="FName" value={values.FName} onChange={handleChange} onBlur={handleBlur}/>
            <br/>
            {errors.FName && touched.FName ? <span style={{color:'red'}}>{errors.FName}</span>:null}
          </Col>

          <Col md={6} className="mb-3">
            <BootstrapForm.Label><b>Student Last Name</b></BootstrapForm.Label>
            <BootstrapForm.Control type="text" placeholder="Enter last name"  name="LName" value={values.LName} onChange={handleChange} onBlur={handleBlur}/>
              <br/>
            {errors.LName && touched.LName ? <span style={{color:'red'}}>{errors.LName}</span>:null}
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <BootstrapForm.Label><b>Student Email ID</b></BootstrapForm.Label>
            <BootstrapForm.Control type="email" placeholder="Enter email"  name="Email" value={values.Email} onChange={handleChange} onBlur={handleBlur}/>
              <br/>
            {errors.Email && touched.Email ? <span style={{color:'red'}}>{errors.Email}</span>:null}
          </Col>

          <Col md={6} className="mb-3">
            <BootstrapForm.Label><b>Username</b></BootstrapForm.Label>
            <BootstrapForm.Control type="tel" placeholder="Enter Username"  name="Username" value={values.Username} onChange={handleChange} onBlur={handleBlur}/>
              <br/>
            {errors.Username && touched.Username ? <span style={{color:'red'}}>{errors.Username}</span>:null}
           </Col>
        </Row>

        

        <Row>
            <Col className="text-center mt-3">
                 <Button variant="primary" type="submit" className="me-3 custom-btn">Submit</Button>
                 <Button variant="secondary" type="reset" className="custom-btn" onClick={() => resetForm()}>Clear</Button>
             </Col>
        </Row>
      </BootstrapForm>
    </Container>
  );
}

export default Adduser
