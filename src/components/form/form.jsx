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
  const [state, setState] = useState()
  const propertiesRef = useRef(null);

  useEffect(() => {
    /**
     * We don't know exactly when is `ref.current` going to
     * point to a DOM element. But we're interested in logging
     * when it happens.
     */
    if (propertiesRef.current) {
      console.log(propertiesRef.current)

      /**
       * Try commenting and uncommenting the next line, and see
       * the amount of renderings
       */
      setState('bar');
    }

  }, [propertiesRef]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const values = propertiesRef.current.getValues();

    setResult(calcForm(product, parseInt(count), values))
  }

  return (
    <Form>
        <ProductField product={product} onChange={(value) => setCount(value)} />
      {state}
        <hr />
        <Properties
          ref={propertiesRef}
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