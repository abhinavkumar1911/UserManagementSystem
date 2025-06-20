import { Container, Row, Col, Form as BootstrapForm, Button } from "react-bootstrap";
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formschema } from "./Formschema";
import { useFormik } from "formik";
import { useState } from "react";

function Adduser() {
  const [msg, setMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      Username: ''
    },
    validationSchema: Formschema,
    onSubmit: (values, actions) => {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User added:", data);
          setMsg("User added successfully!");
          actions.resetForm();
        })
        .catch((err) => {
          console.error("Error adding user:", err);
          setMsg("Error adding user.");
        });
    }
  });

  return (
    <Container className="add-form-container mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Enter the Student Details</h2>
        </Col>
      </Row>

      <BootstrapForm onSubmit={formik.handleSubmit}>
        <Row>
          {/* User Name */}
          <BootstrapForm.Label className="fw-bold text-start d-block">User Name</BootstrapForm.Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '350px' }}>
            <BootstrapForm.Control
              style={{ maxWidth: '250px' }}
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <span style={{ color: 'red', whiteSpace: 'nowrap' }}>{formik.errors.name}</span>
            )}
          </div>

          {/* Email */}
          <BootstrapForm.Label className="fw-bold text-start d-block">User Email ID</BootstrapForm.Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '350px' }}>
            <BootstrapForm.Control
              style={{ maxWidth: '250px' }}
              type="Email"
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <span style={{ color: 'red', whiteSpace: 'nowrap' }}>{formik.errors.email}</span>
            )}
          </div>

          {/* Username */}
          <BootstrapForm.Label className="fw-bold text-start d-block">Username</BootstrapForm.Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '350px' }}>
            <BootstrapForm.Control
              style={{ maxWidth: '250px' }}
              type="text"
              placeholder="Enter Username"
              name="Username"
              value={formik.values.Username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.Username && formik.touched.Username && (
              <span style={{ color: 'red', whiteSpace: 'nowrap' }}>{formik.errors.Username}</span>
            )}
          </div>
        </Row>

        <Row>
          <Col className="text-center mt-3">
            <Button variant="primary" type="submit" className="me-3 custom-btn">Submit</Button>
            <Button variant="secondary" type="button" className="custom-btn" onClick={() => formik.resetForm()}>
              Clear
            </Button>
          </Col>
        </Row>
      </BootstrapForm>

      {msg && <p className="mt-3 text-center text-success">{msg}</p>}
    </Container>
  );
}

export default Adduser;
