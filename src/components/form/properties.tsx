import React, {useState} from 'react';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import {CheckboxField} from "./fields/checkbox";
import {RadioField} from "./fields/radio";
import {InputField} from "./fields/input";
import {DropdownField} from "./fields/dropdown";
import {Property} from "../../utils/models/models";

type Props = {
  properties: Array<any>,
  onChange?: (values: any) => void
};

function defaultValues(properties: Array<Property>){
  const data: any = {};
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

export function Properties(props: Props){
  const [values, setValues] = useState(() => {
    return defaultValues(props.properties);
  });

  const handleChange = (name: string, value: any) => {
    const data = cloneDeep(values);
    data[name] = value;
    setValues(data);
    props.onChange && props.onChange(data);
  }

  const getValues = () => {
    return values;
  };

  const fields = props.properties.map((property) => {
    const { name, label } = property;
    const handleChangeField = (value: any) => handleChange(name, value);

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

  return (
    <div>
      {fields}
    </div>
  );
}

Properties.defaultProps = {
  properties: []
};