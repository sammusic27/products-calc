import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap';
import isEmpty from 'lodash/isEmpty';

import { ProductForm } from "./productForm";
import { withModal } from "@Hocs/withModalOld";
import { actions } from "@Actions/index";
import {Loader} from "@Components/loader";

type Props = {
  onHide: () => void,
  values?: any,
  show: boolean,
};

interface RootProduct {
  product: any
}

function ProductFormDialogComponent(props: Props){
  const productForm: any = createRef();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const product: any = useSelector((state: RootProduct) => state.product);

  useEffect(() => {
    if(submit){
      if(product.loading === false){
        handleClose();
        dispatch(actions.product.fetchProducts());
      }
    }
  }, [product.loading]);

  const handleClose = () => props.onHide();
  const handleSubmit = () => {
    const values = productForm.current.getValue();
    console.log('Submit', values);
    dispatch(actions.product.createProduct(values));
    setSubmit(true);
  };

  const btnTitle = !isEmpty(props.values) ? 'Изменить' : 'Создать';
  const productName = !isEmpty(props.values) ? `"${props.values.label}"` : '';

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      size="lg"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{btnTitle} продукт {productName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Loader loading={product.loading} />
        <ProductForm
          ref={productForm}
          product={props.values}
          onSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={product.loading}>Отмена</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={product.loading}>{btnTitle}</Button>
      </Modal.Footer>
    </Modal>
  );
}

ProductFormDialogComponent.displayName = 'ProductDialog';

export const ProductFormDialog = withModal(ProductFormDialogComponent);