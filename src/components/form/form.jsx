import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { ProductField } from '../product';
import {CheckboxField} from "./checkbox";
import {RadioField} from "./radio";
import {InputField} from "./input";
import {DropdownField} from "./dropdown";
import {calcForm} from "../../utils/calculate";

function defaultValues(product){
  const data = {
    count: product.defaultCount
  };
  product.properties.forEach(prop => {
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
  const [values, setValues] = useState(() => {
    return defaultValues(props.product);
  });
  const [result, setResult] = useState(0);

  const handleChange = (name, value) => {
    const val = cloneDeep(values);
    val[name] = value;
    setValues(val);
  }

  const fields = get(props, 'product.properties', []).map((property) => {
    const { name, label } = property;
    const handleChangeField = (value) => handleChange(name, value);

    switch(property.type){
      case "checkbox":
        return <CheckboxField
                  key={name}
                  name={name}
                  onChange={handleChangeField}
                  label={label}
                  value={values[name]}
                />;
      case "radio":
        return <RadioField
                    key={name}
                    name={name}
                    onChange={handleChangeField}
                    options={property.options}
                    label={label}
                    value={values[name]}
                />;
      case "text":
      case "number":
        return <InputField
                    key={name}
                    name={name}
                    type={property.type}
                    onChange={handleChangeField}
                    label={label}
                    value={values[name]}
                />;
      case "dropdown":
        return <DropdownField
                    key={name}
                    name={name}
                    onChange={handleChangeField}
                    options={property.options}
                    label={label}
                    value={values[name]}
              />;
      default:
        return <div>Не поддерживаемый тип: {property.type}</div>;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setResult(calcForm(props.product, values))
  }

  return (
    <Form>
        <ProductField product={props.product} onChange={(value) => handleChange('count', value)} />
        <hr />
        {fields}
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