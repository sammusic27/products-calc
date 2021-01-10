import React from 'react';
import camelCase from 'lodash/camelCase';
import {Table} from 'react-bootstrap';
import {CheckboxField} from "./fields/checkbox";
import {RadioField} from "./fields/radio";
import {InputField} from "./fields/input";
import {DropdownField} from "./fields/dropdown";
import {getPriceFromPropertyByParameters, getTiersFromPropertyByValue} from "@Utils/calculate";
import {TiersComponent} from "../calc/tiers";
import {Price} from "../price/price";
import './properties.scss';

type Props = {
  name: string,
  properties: Array<any>,
  count: number,
  onChange?: (values: any) => void,
  onEnabled?: (values: any) => void,
  enabled: any,
  values: any,
};


function parse(enabled: any, values: any){
  const data: any = {};
  for(let i in values){
    if(enabled[i]){
      data[i] = values[i];
    }
  }

  return data;
}

export class Properties extends React.Component<Props>{
  static defaultProps = {
    properties: []
  };

  handleEnabledValues = (name: string, value: boolean) => {
    this.props.onEnabled && this.props.onEnabled({
      ...this.props.enabled,
      [name]: value
    });
  };

  handleChange = (name: string, value: any) => {
    this.props.onChange && this.props.onChange({
      ...this.props.values,
      [name]: value
    });
  }

  render(){
    const fields = this.props.properties.map((property) => {
      const { label } = property;
      const name = camelCase(label);
      const handleChangeField = (value: any) => this.handleChange(name, value);

      const formValues = this.props.values;
      const enabled = this.props.enabled;
      let component = null;
      const id = 'enabled-'+name;

      switch(property.type){
        case "checkbox":
          component = <CheckboxField
            name={name}
            onChange={handleChangeField}
            label={label}
            labelFor={id}
            value={formValues[name]}
          />;
          break;
        case "radio":
          component = <RadioField
            name={name}
            onChange={handleChangeField}
            options={property.options}
            label={label}
            labelFor={id}
            value={formValues[name]}
          />;
          break;
        case "text":
        case "number":
          component = label;
          // component = <InputField
          //   name={name}
          //   type={property.type}
          //   onChange={handleChangeField}
          //   label={label}
          //   labelFor={id}
          //   value={formValues[name]}
          // />;
          break;
        case "dropdown":
          component = <DropdownField
            name={name}
            onChange={handleChangeField}
            options={property.options}
            label={label}
            labelFor={id}
            value={formValues[name]}
          />;
          break;
        default:
          component = <div>Не поддерживаемый тип: {property.type}</div>;
          break;
      }

      const propertyPrice = getPriceFromPropertyByParameters(property, formValues[name], this.props.count);
      const propertyPriceFull = propertyPrice * this.props.count;
      const hiddenRow = !enabled[name] ? 'hidden-row' : '';
      const tiers = getTiersFromPropertyByValue(property, propertyPrice);

      return (
        <tr key={name} className={hiddenRow}>
          <td>
            <CheckboxField
              smField={1}
              onChange={(value) => this.handleEnabledValues(name, value)}
              value={enabled[name]}
              name={name}
              id={id}
            />
          </td>
          <td>
            {component}
          </td>
          <td>
            {tiers.length ? (<TiersComponent tiers={tiers} count={this.props.count} />) : (<Price price={propertyPrice} />) }
          </td>
          <td>
            <Price price={propertyPriceFull} />
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="first-action-column">#</th>
              <th>Параметр</th>
              <th className="price-column">Цена Услуги</th>
              <th className="price-column">Общая Цена</th>
            </tr>
          </thead>
          <tbody>
            {fields}
          </tbody>
        </Table>
      </div>
    );
  }
}