import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import {getProductPrice} from "@Utils/calculate";
import {TiersComponent} from "./tiers";
import {Product} from "@Utils/models/models";
import {Price} from "../price/price";
import {InputField} from "../form/fields/input";

type Props = {
  product: Product,
  count: number,
  onChange: (values: any) => void
};

export const ProductSummary = function(props: Props) {

  const handleChange = (value: any) => {
    props.onChange && props.onChange(value);
  }

  let error = '';

  if(props.count <= 0){
    error = 'Количество не может быть менее одного';
  }

  if(!props.count){
    error = 'Количество не может быть пустым';
  }

  return (
    <Form.Group as={Row} controlId="product" key={props.product.name}>
      <Form.Label column="sm" sm="2">{props.product.label}</Form.Label>
      <Col sm="2">
        <Price price={getProductPrice(props.product, props.count)} />
      </Col>
      <Col sm="2">
        <InputField
          type="number"
          name="count"
          onChange={handleChange}
          inputGroupLabel="Шт"
          isEnabledInputGroup
          smField={12}
          min="0"
          step="1"
          value={props.count}
          defaultValue={props.product.defaultCount}
          error={error}
         />
      </Col>
      <Col sm="3">
        <TiersComponent tiers={props.product.tiers} count={props.count} />
      </Col>
    </Form.Group>
  );
}