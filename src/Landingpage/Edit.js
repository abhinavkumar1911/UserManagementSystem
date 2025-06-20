import { Container, Row, Col, Form as BootstrapForm, Button } from "react-bootstrap";
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formschema } from "./Formschema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

function Edit() {
  const [msg, setMsg] = useState("");
  const [id, setId] = useState(null); // We’ll store the user's ID here
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Add fallback default

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");

    if (storedId && storedName && storedEmail && storedUsername) {
      setId(storedId);
      setName(storedName);
      setEmail(storedEmail);
      setUsername(storedUsername || ''); // Default to an empty string if undefined
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: name || '',
      email: email || '',
      username: username || ''  // Ensure username has a valid fallback
    },
    validationSchema: Formschema,
    enableReinitialize: true, // Reinitialize form when state changes
    onSubmit: async (values, actions) => {
      const userId = id;

      if (!userId) {
        console.error("No user ID found");
        setMsg("Error: No user ID found.");
        return;
      }

      // Handle PUT or PATCH request to update user
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("User updated:", data);
          setMsg("User updated successfully!");

          // Update localStorage with new values (simulate persistence)
          localStorage.setItem("name", values.name);
          localStorage.setItem("email", values.email);
          localStorage.setItem("username", values.username);

          actions.resetForm();
        } else {
          throw new Error('Failed to update user');
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setMsg("Error updating user.");
      }
    }
  });

  return (
    <Container className="add-form-container mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Edit User Details</h2>
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
            <Button variant="primary" type="submit" className="me-3 custom-btn">Update</Button>
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

export default Edit;
