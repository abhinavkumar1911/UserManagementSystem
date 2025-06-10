import { Container, Row, Col, Form as BootstrapForm, Button } from "react-bootstrap";
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formschema } from "./Formschema";
import { useFormik } from "formik";
import { useState, useEffect } from "react"; 
import axios from "axios";


function Edit1() { 
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState(null); 
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    username: ''
  });

  //Load user data from localStorage
  useEffect(() => {
    const id = localStorage.getItem("id")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const username = localStorage.getItem("username")
    console.log("Loaded user info from localStorage:", { id, name, email, username })

      setUserId(id);
    setInitialValues({ name: name || '', email: email || '', username: username || '' })
}, []);
  
 const formik = useFormik({
  initialValues,
  enableReinitialize: true,
  validationSchema: Formschema,
  onSubmit: async (values, actions) => {
  setMsg("User Updated")

  if (!userId) {
    setMsg("User ID not found. Cannot update.")
    actions.setSubmitting(false)
    return
  }

  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, values, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    console.log("User updated:", response.data)
    setMsg("User updated successfully!")
    actions.resetForm({ values })

  } catch (error) {
    console.error("Error updating user:", error);
    setMsg("Error updating user.");
  } finally {
    actions.setSubmitting(false);
  }
}

});



  return (
    <Container className="add-form-container mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Edit Student Details</h2>
        </Col>
      </Row>

      <BootstrapForm onSubmit={formik.onSubmit}>
       
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
              type="email"
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
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && (
              <span style={{ color: 'red', whiteSpace: 'nowrap' }}>{formik.errors.username}</span>
            )}
          </div>
        </Row>

        <Row>
          <Col className="text-center mt-3">
            <Button variant="primary" type="submit" className="me-3 custom-btn" disabled={formik.isSubmitting}>
  {formik.isSubmitting ? "Updating..." : "Update"}
</Button>

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

export default Edit1;
