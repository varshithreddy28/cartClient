import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,  
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const NavBar = ({setLogedIn,loggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = ()=>{
    axios.get("https://cart-api-v1.herokuapp.com/item/api/user/logout")
    localStorage.clear()
    setLogedIn(false)
  }
  

  return (


    <Navbar color="dark" dark light expand="md" sticky="top">
      <Container>
        <NavbarBrand href="/"><Link to={`/`}>ShoppingCart</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/varshithreddy28/">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavItem className="ml-auto">
            
          </NavItem>
          <span class="navbar-text">
            {!loggedIn?<Link to={`/user/login`} className="login">Login  </Link>:<NavLink onClick={logout} className="logout">Logout</NavLink>}
            {!loggedIn?<Link to={`/user/register`}>Register</Link>:''}
          </span>
        </Collapse>
      </Container>
      </Navbar>
    
  );
}

export default NavBar;