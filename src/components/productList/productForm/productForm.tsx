import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Form, Row, Col } from 'react-bootstrap';
import {TiersList} from "./tierList";
import {ProductProperties} from "./productProperties";
import { OpenClose } from "@Components/openClose";
import {InputField} from "@Components/form/fields/input";

type Props = {
  product: any,
  errors: any,
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
    const { errors } = this.props;

    return (
      <Form>
        <InputField
          label="Название Продукта"
          name="productName"
          type="text"
          placeholder="Введите Название Продукта"
          inline={false}
          onChange={(value) => this.handleChange('label', value)}
          value={product['label']}
          error={errors.label}
        />
        <Row>
          <InputField
            as={Col}
            label="Цена"
            min="0"
            name="productPrice"
            type="number"
            placeholder="Введите Цену"
            defaultValue="0"
            inline={false}
            onChange={(value) => this.handleChange('price', value)}
            value={product['price']}
            error={errors.price}
          />
          <InputField
            as={Col}
            label="Количество"
            min="1"
            name="productCount"
            type="number"
            placeholder="Введите Колличество"
            defaultValue="1"
            inline={false}
            onChange={(value) => this.handleChange('count', value)}
            value={product['count']}
            error={errors.count}
          />
        </Row>

        <hr />

        <OpenClose
         btnTitle="Показать дополнительные настройки продукта"
        >
          <TiersList
            name={product.label}
            tiers={product.tiers}
            errors={this.props.errors.productTiers}
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