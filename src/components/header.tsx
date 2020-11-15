import React from 'react';
import { Navbar } from 'react-bootstrap';
import pkg from '../../package.json';

export function Header(){
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Product Calc</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          v. {pkg.version}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}