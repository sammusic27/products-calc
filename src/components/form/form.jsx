import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import get from 'lodash/get';
import camelCase from 'lodash/camelCase';

import { ProductSummary } from '@Components/calc/productSummary';
import { calcForm } from "@Utils/calculate";
import { Price } from "@Components/price";

import { Properties } from "./properties";

function defaultValues(properties = []){
  const data = {};
  properties.forEach((prop) => {
    const name = generateName(prop);
    switch (prop.type){
      case 'text':
      case 'number':
        data[name] = prop.price;
        break;
      case 'radio':
      case 'dropdown':
        data[name] = get(prop, 'options[0].value', 0);
        break;
      case 'checkbox':
        data[name] = true;
        break;
    }
  });

  return data;
}

function generateName(property){
  return camelCase(property.label);
}

function collectEnabledCollection(properties){
  const data = {};

  properties.forEach((property) => {
    data[generateName(property)] = true;
  });
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


export class FormComponent extends React.Component {
  static displayName = 'CalculatorForm';

  constructor(props) {
    super();

    const product = props.product;
    const { defaultCount, properties } = product;

    this.state = {
      count: defaultCount || 1,
      formValues: defaultValues(properties),
      enabled: collectEnabledCollection(properties),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.product._id !== nextProps.product._id){
      const product = nextProps.product;
      const { defaultCount, properties } = product;

      this.setState({
        count: defaultCount || 1,
        formValues: defaultValues(properties),
        enabled: collectEnabledCollection(properties),
      });
    }
  }

  handleCount = (count) => {
    count = parseInt(count);
    this.setState({ count });
  }

  handleChangeValues = (data) => {
    this.setState({ formValues: data });
  }

  handleChangeEnabled = (data) => {
    this.setState({
      enabled: data
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.updateResults();
  }

  updateResults = () => {
    const { count, values, enabledFields } = this.state;

    const result = calcForm(this.props.product, count, parse(enabledFields, values));

    this.setState({
      result
    });
  }

  render (){
    const { product } = this.props;
    const { count, enabled, formValues } = this.state;

    const result = calcForm(product, count, parse(enabled, formValues));

    return (
      <Form>
        <ProductSummary product={product} count={count} onChange={this.handleCount} />
        <hr />
        <Properties
          onChange={this.handleChangeValues}
          onEnabled={this.handleChangeEnabled}
          properties={product.properties}
          count={count}
          enabled={enabled}
          values={formValues}
          name={product.name}
        />
        <Row>
          <Col>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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
}