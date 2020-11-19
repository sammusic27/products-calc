import React  from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

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
            path="/"
            component={Calculator}
          />
          <Route
            exact
            path="/list"
            component={ProductList} />
          <Redirect to="/products-calc/" />
        </Switch>
      </div>
    </Router>

  );
}