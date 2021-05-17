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
            {!loggedIn?<Link to={`/user/login`}>Login</Link>:<NavLink onClick={logout} className="logout">Logout</NavLink>}
          </span>
        </Collapse>
      </Container>
      </Navbar>


//    Dont use div for stickytop
      // <Navbar color="dark" dark light expand="md" sticky="top" >
      //     <Container>
      //       <NavbarBrand><Link to={`/`}>ShoppingCart</Link></NavbarBrand>
      //       <NavbarToggler onClick={toggle} />
      //       <Collapse isOpen={isOpen} navbar>
      //       <Nav className="mr-auto" navbar>
      //           <NavItem>
      //           <NavLink href="https://github.com/varshithreddy28/" className="github" >GitHub </NavLink>
      //           </NavItem>
                
      //           <NavItem className="float-right">
      //             {!loggedIn?<Link to={`/user/login`}>Login</Link>:<NavLink onClick={logout}>Logout</NavLink>}
      //           </NavItem>
      //       </Nav>
      //       </Collapse>
      //     </Container>
        
      // </Navbar>
    
  );
}

export default NavBar;