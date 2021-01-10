import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Form, Row, Col } from 'react-bootstrap';
import {TiersList} from "./tierList";
import {ProductProperties} from "./productProperties";
import { OpenClose } from "@Components/openClose";

type Props = {
  product: any,
  onSubmit: () => void
};

type State = {
  properties: Array<any>,
  product: any
};

export class ProductForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      properties: props?.product?.properties || [],
      product: props.product || {}
    };
  }

  getValue = () => {
    return {
      ...this.state.product,
      properties: this.state.properties
    }
  };

  handleChange = (name: string, value: any) => {
    const product = cloneDeep(this.state.product);
    product[name] = value;
    this.setState({ product });
  };

  handleChangeProperties = (properties: any) => {
    this.setState({ properties })
  }

  handleChangeProductTiers = (tiers: Array<any>) => {
    const product = cloneDeep(this.state.product);
    product.tiers = tiers;
    this.setState({ product });
  }


  render() {
    const { product } = this.state;

    return (
      <Form>
        <Form.Group controlId="productName">
          <Form.Label>Название Продукта</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Введите Название Продукта"
            onChange={(e) => this.handleChange('label', e.target.value)}
            value={product['label']}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="productPrice">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Введите Цену"
                defaultValue="0"
                onChange={(e) => this.handleChange('price', e.target.value)}
                value={product['price']}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="productCount">
              <Form.Label>Количество</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Введите Колличество"
                defaultValue="1"
                onChange={(e) => this.handleChange('count', e.target.value)}
                value={product['count']}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <OpenClose
         btnTitle="Показать дополнительные настройки продукта"
        >
          <TiersList
            name={product.label}
            tiers={product.tiers}
            proposedPrice={product.price}
            title="Цена от количества продукта"
            onChangeTiers={this.handleChangeProductTiers}
          />
        </OpenClose>

        <OpenClose
          btnTitle="Показать параметры продукта"
        >
          <ProductProperties
            properties={this.state.properties}
            onChangeProperties={this.handleChangeProperties}
          />
        </OpenClose>
      </Form>
    );
  }
}