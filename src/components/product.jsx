import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import {getProductPrice} from "../utils/calculate";
import {TiersComponent} from "./tiers";

export const ProductField = function(props) {

  const handleChange = (value) => {
    props.onChange && props.onChange(value);
  }

  return (
    <Form.Group as={Row} controlId="product" key={props.product.name}>
      <Form.Label column sm="2">{props.product.label}</Form.Label>
      <Col sm="2">
        <InputGroup>
          <Form.Control plaintext readOnly value={getProductPrice(props.product, props.count)} />
          <InputGroup.Prepend>
            <InputGroup.Text>UAH</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Col>
      <Col sm="2">
        <InputGroup>
          <Form.Control type="number" onChange={(e) => handleChange(e.target.value)} min="0" step="1" defaultValue={props.product.defaultCount} />
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