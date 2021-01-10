import React from 'react';
import { Button } from 'react-bootstrap';
import {actions} from "@Actions/index";
import { useDispatch } from 'react-redux'
import {Product} from "@Utils/models/models";

type Props = {
  product: Product
};

export function ProductListActions(props: Props){
  const dispatch = useDispatch();

  const handleEditProduct = (product: Product) => {
    dispatch(actions.modal.show('ProductDialog', product));
  }

  const handleRemoveProduct = (id: string) => {
    dispatch(actions.product.deleteProduct(id));
    dispatch(actions.product.fetchProducts());
  }

  return (
    <div>
      <Button variant="warning" onClick={() => handleEditProduct(props.product)}>Edit</Button>{' '}
      <Button variant="danger" onClick={() => handleRemoveProduct(props.product._id)}>X</Button>
    </div>
  );
}