import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import {CheckboxField} from "./fields/checkbox";
import {RadioField} from "./fields/radio";
import {InputField} from "./fields/input";
import {DropdownField} from "./fields/dropdown";
import {getPriceFromPropertyByParameters, getTiersFromPropertyByValue} from "../../utils/calculate";
import {TiersComponent} from "../tiers";

type Props = {
  properties: Array<any>,
  count: number,
  onChange?: (values: any) => void,
  values: any
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
  const [values, setValues] = useState(props.values);
  const [enabled, setEnabled] = useState(() => {
    const data:any = {};
    for(let i in values){
      data[i] = !!values[i];
    }
    return data;
  });

  const handleChangeValue = (name: string, value: boolean) => {
    const data = cloneDeep(enabled);
    data[name] = value;
    setEnabled(data);
    props.onChange && props.onChange(parse(data, values));
  };

  const handleChange = (name: string, value: any) => {
    const data = cloneDeep(values);
    data[name] = value;
    setValues(data);
    props.onChange && props.onChange(parse(enabled, data));
  }

  const fields = props.properties.map((property) => {
    const { name, label } = property;
    const handleChangeField = (value: any) => handleChange(name, value);

    let component = null;

    switch(property.type){
      case "checkbox":
        component = <CheckboxField
          name={name}
          onChange={handleChangeField}
          label={label}
          value={values[name]}
        />;
        break;
      case "radio":
        component = <RadioField
          name={name}
          onChange={handleChangeField}
          options={property.options}
          label={label}
          value={values[name]}
        />;
        break;
      case "text":
      case "number":
        component = <InputField
          name={name}
          type={property.type}
          onChange={handleChangeField}
          label={label}
          value={values[name]}
        />;
        break;
      case "dropdown":
        component = <DropdownField
          name={name}
          onChange={handleChangeField}
          options={property.options}
          label={label}
          value={values[name]}
        />;
        break;
      default:
        component = <div>Не поддерживаемый тип: {property.type}</div>;
        break;
    }

    const propertyPrice = getPriceFromPropertyByParameters(property, values[name], props.count);
    const propertyPriceFull = propertyPrice * props.count;
    const hiddenRow = !enabled[name] ? 'hidden-row' : '';
    const tiers = getTiersFromPropertyByValue(property, propertyPrice);

    return (
      <tr key={name} className={hiddenRow}>
        <td>
          <CheckboxField
            onChange={(value) => handleChangeValue(name, value)}
            value={enabled[name]}
            name={name}
          />
        </td>
        <td>
          {component}
        </td>
        <td>
          {tiers.length ? (<TiersComponent tiers={tiers} count={props.count} />) : propertyPrice }
        </td>
        <td>
          {propertyPriceFull}
        </td>
      </tr>
    );
  });

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Параметр</th>
          <th>Цена Услуги</th>
          <th>Общая Цена</th>
        </tr>
      </thead>
      <tbody>
        {fields}
      </tbody>
    </Table>
  );
}

Properties.defaultProps = {
  properties: []
};