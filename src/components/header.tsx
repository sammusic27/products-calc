import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap';
import pkg from '../../package.json';

export function Header(){
  const [apiKey, setApikey] = useState('');

  const key = localStorage.getItem('x-apikey');
  console.log('key', key);

  const removeApiKey = () => {
    localStorage.removeItem('x-apikey');
  }

  const setLogin = () => {
    localStorage.setItem('x-apikey', apiKey);
    location.reload();
  }


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
        {key ? (<a href="" onClick={removeApiKey}>Logout</a>)
          : (
            <>
              <Form inline>
                <FormControl type="text" placeholder="api-key" onChange={(e) => setApikey(e.target.value)} className="mr-sm-2" />
                <Button variant="outline-success" onClick={setLogin}>Login</Button>
              </Form>
            </>
          )
        }
        <Navbar.Text>
          &nbsp;v. {pkg.version}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}