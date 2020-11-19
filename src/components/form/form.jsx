import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import get from 'lodash/get';

import { ProductSummary } from '../calc/productSummary';
import {calcForm} from "../../utils/calculate";
import {Properties} from "./properties";
import { Price } from "../price/price";

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

function collectEnabledCollection(values){
  const data = {};
  for(let i in values){
    data[i] = !!values[i];
  }
  return data;
}

function parse(enabled, values){
  const data = {};
  for(let i in values){
    if(enabled[i]){
      data[i] = values[i];
    }
  }

  return data;
}

export function FormComponent(props){
  const product = props.product;
  const { defaultCount, properties } = product;

  const [count, setCount] = useState(defaultCount);
  const [result, setResult] = useState(0);

  const [formValues, setFormValues] = useState(() => {
    return defaultValues(properties);
  });
  const [enabled, setEnabled] = useState(() => {
    return collectEnabledCollection(formValues);
  });

  useEffect(() => {
    const { defaultCount, properties } = props.product;
    const newValues = defaultValues(properties);
    const newEnabled = collectEnabledCollection(newValues);

    setFormValues(newValues)
    setCount(defaultCount);
    setEnabled(newEnabled);

    updateResults(defaultCount, newValues, newEnabled);
  }, [props.product]);

  const handleCount = (count) => {
    count = parseInt(count);
    setCount(count);
    updateResults(count, formValues);
  }

  const handleChangeValues = (data) => {
    setFormValues(data);
    updateResults(count, data);
  }

  const handleChangeEnabled = (data) => {
    setEnabled(data);
    updateResults(count, formValues, data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateResults(count, formValues);
  }

  const updateResults = (count, values, enabledFields = enabled) => {
    setResult(calcForm(product, count, parse(enabledFields, values)));
  }

  return (
    <Form>
      <ProductSummary product={product} count={count} onChange={handleCount} />
      <hr />
      <Properties
        onChange={handleChangeValues}
        onEnabled={handleChangeEnabled}
        properties={properties}
        count={count}
        enabled={enabled}
        values={formValues}
        name={product.name}
      />
      <Row>
        <Col>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Посчитать
          </Button>
        </Col>
        <Col>
          <Price price={result} size={"xl"} />
        </Col>
      </Row>
    </Form>
  );
}