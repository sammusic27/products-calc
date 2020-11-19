import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import {getProductPrice} from "../../utils/calculate";
import {TiersComponent} from "./tiers";
import {Product} from "../../utils/models/models";
import {Price} from "../price/price";

type Props = {
  product: Product,
  count: number,
  onChange: (values: any) => void
};

export const ProductSummary = function(props: Props) {

  const handleChange = (value: any) => {
    props.onChange && props.onChange(value);
  }

  return (
    <Form.Group as={Row} controlId="product" key={props.product.name}>
      <Form.Label column="sm" sm="2">{props.product.label}</Form.Label>
      <Col sm="2">
        <Price price={getProductPrice(props.product, props.count)} />
      </Col>
      <Col sm="2">
        <InputGroup size="sm">
          <Form.Control
            type="number"
            onChange={(e) => handleChange(e.target.value)}
            min="0"
            step="1"
            defaultValue={props.product.defaultCount}
          />
          <InputGroup.Prepend>
            <InputGroup.Text>Шт</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Col>
      <Col sm="3">
        <TiersComponent tiers={props.product.tiers} count={props.count} />
      </Col>

    </Form.Group>
  );
}