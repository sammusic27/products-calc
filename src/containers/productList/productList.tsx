import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button} from 'react-bootstrap';
import { Product } from "@Utils/models/models";
import { Price } from '@Components/price/price';
import { ProductFormDialog } from "@Components/productList/productForm/productDialog";
import { Message } from "@Components/message";
import { Loader } from "@Components/loader";
import { ProductListActions } from "@Containers/productList/productListActions";
import { actions } from "@Actions/index";

interface RootState {
  products: any
}

export function ProductList(){
  const products: any = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.product.fetchProducts());
  }, []);

  return (
    <div>
      <Button size="sm" onClick={() => dispatch(actions.modal.show('ProductDialog'))}>Create Product</Button>
      <ProductFormDialog />
      <Message message={products.error} />
      <Loader loading={products.loading} />
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>Product</th>
          <th>Цена</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
          {products.rows.map((product: Product) => {
            return (
              <tr key={product._id}>
                <td>{product.label}</td>
                <td><Price price={product.price}/></td>
                <td>
                  <ProductListActions product={product} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}