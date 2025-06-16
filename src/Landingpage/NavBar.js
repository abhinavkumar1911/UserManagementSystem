
import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


function NavBar(){
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar fixed-top custom-navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/Adduser">Add user</Link></li>
       <li><Link to="/UserList">Show user</Link></li>
      {/* <li><Link to="/logout">Logout</Link></li> */}
      </ul>
    </nav>
  );
}
  

export default NavBar;
