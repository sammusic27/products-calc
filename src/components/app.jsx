import React  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

const PATH = window.location.hostname === 'localhost' ? '' : `/products-calc`;
import { Header } from "./header";
import { Calculator } from './calc/calculator';
import { ProductList } from './productList/productList';

export function App(){
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route
            exact
            path={`${PATH}/`}
            component={Calculator}
          />
          <Route
            exact
            path={`${PATH}/list`}
            component={ProductList} />
          <Redirect to="/products-calc/" />
        </Switch>
      </div>
    </Router>

  );
}