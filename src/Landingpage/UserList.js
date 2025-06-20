import React, { useEffect, useState } from "react"
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserList.css'
import { Link, useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSerach] = useState("")


// Fatch User List
  const API_URL = "https://jsonplaceholder.typicode.com/users"

  useEffect(() => {
    console.log("Component Mounted.preparing fatch data.....")
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        return response.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

 //Delete The User
  const handleDelete = (id) => {
    if (window.confirm("Are you Want to delete the user...")) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "delete"
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete user")
          }
          setUsers(users.filter((users) => users.id !== id))
        })
        .catch((error) => {
          setError(`error while deleting ${error.message}`)
        })
    }
  }

//Referesh Page
  const RefreshUserList = () => {
    setLoading(true)
    setError("")
    console.log("Refresh the Page")
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        return response.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }


// move to Adduser form
  const navigate = useNavigate();

  const handleAddUser = () => {
    console.log("add User Form");
    navigate('/Adduser');
  };


  //Edit the User

  const setDataToStorage = (id, name, email, username) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
  }

  return (
    <Container className="mt-5">
      {/* <h2 className="mb-4 text-center">User List</h2>*/}
      <div className="d-flex justify-content-between align-items-center my-3">
        <div className="d-flex align-items-center label-input-group">
          <label htmlFor="searchInput" className="me-2 mb-0 ">Search</label>
          <input
            type="text"
            id="searchInput"
            placeholder="e.g abhinav"
            className="form-control custom-input"
            value={search}
            onChange={(e) => setSerach(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary custom-search-btn">Search</button>
      </div>


      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th colSpan={2}>Option</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
              .map((user, index) => (
                <tr key={user.id || index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>

                  <td><Link to="/Edit1"><button className="btn btn-success custom-edit-btn" 
                  onClick={()=>setDataToStorage(user.id,user.name,user.email,user.username)}
                  >Edit</button></Link></td>
                  <td><button className="btn btn-danger custom-delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >Delete</button></td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      <div className="text-left">
        <Button variant="primary" className="button-custom me-2" onClick={handleAddUser}>
          Add User
        </Button>
        <Button btn btn-primary className="button-custom" onClick={RefreshUserList}>Refresh</Button>

      </div>



    </Container>
  );
}

export default UserList;
