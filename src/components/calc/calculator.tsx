import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import {DropdownField} from "../form/fields/dropdown";
import {FormComponent} from "../form/form";
import {Product} from "../../utils/models/models";

interface RootState {
  products: any
}

export function Calculator(){
  const products: Array<Product> = useSelector((state: RootState) => state.products);

  const [value, setValue] = useState(() => {
    return products[0]?.name;
  });

  const options = products.map((obj: Product) => ({label: obj.label, value: obj.name}));
  let product = products.find((obj: Product) => obj.name === value);

  const handleChange = (val: any) => {
    setValue(val);
  }

  return (
    <div>
      <br />
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