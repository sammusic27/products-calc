import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { products } from '../../data/data';
import { FormComponent } from "./form/form";
import {parseProductList} from "../utils/productHelper";
import {DropdownField} from "./form/fields/dropdown";
import { Header } from "./header";

export function App(){
  const [productList, setProductList] = useState(() => {
    return parseProductList(products);
  });
  const [value, setValue] = useState(() => {
    return productList[0].name;
  });

  const options = productList.map(obj => ({label: obj.label, value: obj.name}));
  let product = productList.find(obj => obj.name === value);

  const handleChange = (val) => {
    setValue(val);
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/products-calc/"
            render={() => (
              <div className="container">
                <Header />
                <DropdownField
                  label="Продукт"
                  options={options}
                  onChange={handleChange}
                  name="product"
                />
                <hr />
                {product ? <FormComponent product={product} /> : null}
              </div>
            )}
          />
          <Route
            exact
            path="/products-calc/list"
            render={() => (
              <div>Test</div>
            )} />
          <Redirect to="/products-calc/" />
        </Switch>
      </div>
    </Router>

  );
}