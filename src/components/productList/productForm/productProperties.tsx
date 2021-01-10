import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import { Form, Row, Col, Button} from 'react-bootstrap';
import {Options} from "@Components/productList/productForm/options";
import {TiersList} from "@Components/productList/productForm/tierList";
import {OpenClose} from "@Components/openClose";

type Props = {
  properties: Array<any>,
  onChangeProperties: any,
};

type State = {

};

export class ProductProperties extends React.Component<Props, State> {

  handleChangeProperty = (name: string, value: any, index: number) => {
    const properties = cloneDeep(this.props.properties);
    properties[index][name] = value;
    this.props.onChangeProperties(properties);
  }

  onAddProperty = () => {
    const properties = cloneDeep(this.props.properties);
    properties.push({});
    this.props.onChangeProperties(properties);
  };

  onRemoveProperty = (index: number) => {
    const properties = cloneDeep(this.props.properties);
    properties.splice(index, 1);
    this.props.onChangeProperties(properties);
  };

  onAddPropertyOption = (propertyIndex: number) => {
    const properties = cloneDeep(this.props.properties);
    const property = properties[propertyIndex];
    if(!isArray(property.options)){
      property.options = [];
    }

    property.options.push({});
    this.props.onChangeProperties(properties);
  };

  onRemovePropertyOption = (propertyIndex: number, index: number) => {
    const properties = cloneDeep(this.props.properties);
    const property = properties[propertyIndex];
    property.options.splice(index, 1);
    this.props.onChangeProperties(properties);
  };

  handleChangePropertyOption = (propertyIndex: number, name: string, value: any, index: number) => {
    const properties = cloneDeep(this.props.properties);
    const property = properties[propertyIndex];
    property.options[index][name] = value;
    this.props.onChangeProperties(properties);
  }

  handleChangePropertyTiers = (propertyIndex: number, tiers: Array<any>) => {
    const properties = cloneDeep(this.props.properties);
    const property = properties[propertyIndex];
    property.tiers = tiers;
    this.props.onChangeProperties(properties);
  };

  renderOptions(property: any, propertyIndex: number){
    if(!['dropdown', 'radio'].includes(property.type)){
      return null;
    }

    return (
      <>
        <h6>Варианты для параметра: {property.label}</h6>
        <Row>
          <Col sm={1}>
            ---
          </Col>
          <Col>
            <Options
              options={property.options}
              name={property.label}
              onChange={(name, value, index) => this.handleChangePropertyOption(propertyIndex, name, value, index)}
              onRemove={(index) => this.onRemovePropertyOption(propertyIndex, index)}
            />
          </Col>
        </Row>
        <Button size="sm" variant="success" onClick={() => this.onAddPropertyOption(propertyIndex)}>+ Вариант Параметра</Button>
      </>
    );
  }

  renderPrice(property: any, index: number){
    if(['dropdown', 'radio'].includes(property.type)){
      return null;
    }

    return (
      <Col>
        <Form.Group controlId={`propertyPrice-${index}`}>
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="number"
            size="sm"
            placeholder="Введите Цену"
            onChange={(e) => this.handleChangeProperty('price', e.target.value, index)}
            value={property['price']}
          />
        </Form.Group>
      </Col>
    );
  }

  renderProperty() {
    return this.props.properties.map((property, index) => {
      return (
        <div key={index}>
          <Row>
            <Col>
              <Form.Group controlId={`propertyName-${index}`}>
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Введите Название"
                  onChange={(e) => this.handleChangeProperty('label', e.target.value, index)}
                  value={property['label']}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId={`propertyType-${index}`}>
                <Form.Label>Тип</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  placeholder="Введите Колличество"
                  onChange={(e) => this.handleChangeProperty('type', e.target.value, index)}
                  value={property['type']}
                >
                  <option value="">Выберите тип</option>
                  <option value="text">Текст</option>
                  {/*<option value="number">Число</option>*/}
                  {/*<option value="checkbox">Чекбокс</option>*/}
                  <option value="radio">РадиоБатоны</option>
                  <option value="dropdown">Дропдаун</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {this.renderPrice(property, index)}
          </Row>
          {this.renderOptions(property, index)}
          <OpenClose
            btnTitle="Показать дополнительные настройки параметра"
          >
            <Row>
              <Col>
                <TiersList
                  name={property.label}
                  tiers={property.tiers}
                  proposedPrice={property.price}
                  title="Цена от количества"
                  onChangeTiers={(tiers) => this.handleChangePropertyTiers(index, tiers)}
                />
              </Col>
            </Row>
          </OpenClose>
          <Row>
            <Col>
              <Button size="sm" variant="danger" block onClick={() => this.onRemoveProperty(index)}>X</Button>
            </Col>
          </Row>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h4>Параметры продукта</h4>
        {this.renderProperty()}
        <Button size="sm" variant="success" onClick={this.onAddProperty}>+ Параметр</Button>
      </div>
    )
  }
}