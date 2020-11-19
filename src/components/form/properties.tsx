import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import cloneDeep from 'lodash/cloneDeep';
import {CheckboxField} from "./fields/checkbox";
import {RadioField} from "./fields/radio";
import {InputField} from "./fields/input";
import {DropdownField} from "./fields/dropdown";
import {getPriceFromPropertyByParameters, getTiersFromPropertyByValue} from "../../utils/calculate";
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

export function Properties(props: Props){

  const handleEnabledValues = (name: string, value: boolean) => {
    props.onEnabled && props.onEnabled({
      ...props.enabled,
      [name]: value
    });
  };

  const handleChange = (name: string, value: any) => {
    props.onChange && props.onChange({
      ...props.values,
      [name]: value
    });
  }

  const fields = props.properties.map((property) => {
    const { name, label } = property;
    const handleChangeField = (value: any) => handleChange(name, value);

    const formValues = props.values;
    const enabled = props.enabled;
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
        component = <InputField
          name={name}
          type={property.type}
          onChange={handleChangeField}
          label={label}
          labelFor={id}
          value={formValues[name]}
        />;
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

    const propertyPrice = getPriceFromPropertyByParameters(property, formValues[name], props.count);
    const propertyPriceFull = propertyPrice * props.count;
    const hiddenRow = !enabled[name] ? 'hidden-row' : '';
    const tiers = getTiersFromPropertyByValue(property, propertyPrice);

    return (
      <tr key={name} className={hiddenRow}>
        <td>
          <CheckboxField
            smField={1}
            onChange={(value) => handleEnabledValues(name, value)}
            value={enabled[name]}
            name={name}
            id={id}
          />
        </td>
        <td>
          {component}
        </td>
        <td>
          {tiers.length ? (<TiersComponent tiers={tiers} count={props.count} />) : (<Price price={propertyPrice} />) }
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

Properties.defaultProps = {
  properties: []
};