import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import pkg from '../../package.json';

export function Header(){
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Product Calc</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="/">Calc</Nav.Link>
          <Nav.Link href="/list">Product List</Nav.Link>
        </Nav>
        <Navbar.Text>
          v. {pkg.version}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}