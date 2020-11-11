import React, { useState } from "react";

import { products } from '../../data/data';
import { FormComponent } from "./form/form";
import {parseProductList} from "../utils/productHelper";
import {DropdownField} from "./form/dropdown";

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
    <div className="container">
      <hr />
      <DropdownField
        label="Продукт"
        options={options}
        onChange={handleChange}
        name="product"
      />
      <hr />
      {product ? <FormComponent product={product} /> : null}
    </div>
  );
}