import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import pkg from '../../package.json';

const PATH = window.location.hostname === 'localhost' ? '' : `/products-calc`;
export function Header(){
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Product Calc</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={`${PATH}/`}>Calc</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  to={`${PATH}/list`}>Product List</Link>
          </li>
        </Nav>
        <Navbar.Text>
          v. {pkg.version}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}