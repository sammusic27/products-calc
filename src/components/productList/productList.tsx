import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import {Table} from 'react-bootstrap';
import {Product} from "../../utils/models/models";

interface RootState {
  products: any
}

export function ProductList(){
  const products: Array<Product> = useSelector((state: RootState) => state.products);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>Product</th>
          <th>Цена</th>
        </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => {
            return (
              <tr key={product.name}>
                <td>{product.label}</td>
                <td>{product.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}