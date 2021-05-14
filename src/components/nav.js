import React, { useState } from 'react';
import {
  Container,  
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
//    Dont use div for stickytop
     
      <Navbar color="dark" dark light expand="md" sticky="top">
          <Container>
            <NavbarBrand href="/">ShoppingCart</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
          </Container>
        
      </Navbar>
    
  );
}

export default NavBar;