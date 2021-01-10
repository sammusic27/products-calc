import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {DropdownField} from "@Components/form/fields/dropdown";
import {FormComponent} from "@Components/form/form";
import {Product} from "@Utils/models/models";
import {actions} from "@Actions/index";
import {Loader} from "@Components/loader";

interface RootState {
  products: any
}

export function Calculator(){
  const products: any = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.product.fetchProducts());
  }, []);

  const [value, setValue] = useState(() => {
    return products.rows[0]?.name;
  });

  const options = products.rows.map((obj: Product) => ({label: obj.label, value: obj.name}));
  let product = products.rows.find((obj: Product) => obj.name === value);

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
      <Loader loading={products.loading} />
      {product ? <FormComponent product={product} /> : null}
    </div>
  );
}