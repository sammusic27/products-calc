import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import pkg from '../../package.json';

export function Header(){
  return (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to="/">Product Calc</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Calc</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  to="/list">Product List</Link>
          </li>
        </Nav>
        <Navbar.Text>
          v. {pkg.version}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}