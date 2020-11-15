import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { ProductField } from '../product';
import {calcForm} from "../../utils/calculate";
import {Properties} from "./properties";

export function FormComponent(props){
  const product = props.product;
  const { defaultCount, properties } = product;
  const [count, setCount] = useState(defaultCount);
  const [result, setResult] = useState(0);
  const [values, setValues] = useState();

  const handleCount = (count) => {
    setCount(count);
    setResult(calcForm(product, parseInt(count), values));
  }

  const handleChange = (data) => {
    setValues(data);
    setResult(calcForm(product, parseInt(count), data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult(calcForm(product, parseInt(count), values));
  }

  return (
    <Form>
      <ProductField product={product} onChange={handleCount} />
      <hr />
      <Properties
        onChange={handleChange}
        properties={properties}
      />
      <Row>
        <Col>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Посчитать
          </Button>
        </Col>
        <Col>
          {result} UAH
        </Col>
      </Row>
    </Form>
  );
}