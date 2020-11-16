import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import get from 'lodash/get';

import { ProductField } from '../calc/product';
import {calcForm} from "../../utils/calculate";
import {Properties} from "./properties";

function defaultValues(properties = []){
  const data = {};
  properties.forEach(prop => {
    switch (prop.type){
      case 'text':
      case 'number':
        data[prop.name] = prop.price;
        break;
      case 'radio':
      case 'dropdown':
        data[prop.name] = get(prop, 'options[0].value', 0);
        break;
      case 'checkbox':
        data[prop.name] = true;
        break;
    }
  });

  return data;
}

export function FormComponent(props){
  const product = props.product;
  const { defaultCount, properties } = product;
  const [count, setCount] = useState(defaultCount);
  const [result, setResult] = useState(0);
  const [values, setValues] = useState(() => {
    return defaultValues(properties);
  });

  useEffect(() => {
    const { defaultCount, properties } = props.product;
    const newValues = defaultValues(properties)
    setValues(newValues)
    setCount(defaultCount);
    setResult(calcForm(product, defaultCount, newValues));
  }, [props.product]);

  const handleCount = (count) => {
    count = parseInt(count);
    setCount(count);
    setResult(calcForm(product, count, values));
  }

  const handleChange = (data) => {
    setValues(data);
    setResult(calcForm(product, count, data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult(calcForm(product, count, values));
  }

  return (
    <Form>
      <ProductField product={product} count={count} onChange={handleCount} />
      <hr />
      <Properties
        onChange={handleChange}
        properties={properties}
        count={count}
        values={values}
        name={product.name}
      />
      <Row>
        <Col>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Посчитать
          </Button>
        </Col>
        <Col>
          <span className="price-holder">{result} UAH</span>
        </Col>
      </Row>
    </Form>
  );
}