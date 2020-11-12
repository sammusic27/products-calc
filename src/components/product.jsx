import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

export const ProductField = function(props) {

  const handleChange = (value) => {
    props.onChange && props.onChange(value);
  }

  return (
    <Form.Group as={Row} controlId="product" key={props.product.name}>
      <Form.Label column sm="2">{props.product.label}</Form.Label>
      <Col sm="4">
        <InputGroup>
          <Form.Control plaintext readOnly defaultValue={props.product.price} />
          <InputGroup.Prepend>
            <InputGroup.Text>UAH</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Col>
      <Col sm="4">
        <InputGroup>
          <Form.Control type="number" onChange={(e) => handleChange(e.target.value)} min="0" step="1" defaultValue={props.product.defaultCount} />
          <InputGroup.Prepend>
            <InputGroup.Text>Шт</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Col>
    </Form.Group>
  );
}