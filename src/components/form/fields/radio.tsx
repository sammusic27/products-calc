import React, { useState } from 'react';
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import {Option} from "../../../utils/models/models";

type Props = {
  name: string,
  label: string,
  labelFor?: undefined | string,
  value: number | string,
  options: Array<Option>,
  size: undefined | 'sm' | 'lg',
  smLabel?: number,
  smField?: number,
  onChange: ((val: any) => void)
};

export const RadioField = function(props: Props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (value: any) => {
    setValue(value);
    props.onChange && props.onChange(value)
  };

  const options = props.options.map((item, index) => {
    return (
      <ToggleButton key={index} value={item.value}>{item.label}</ToggleButton>
    );
  });

  return (
    <Form.Group
      as={Row}
    >
      <Form.Label
        column={props.size}
        sm={props.smLabel}
        htmlFor={props.labelFor}
      >
        {props.label}
      </Form.Label>
      <Col sm={props.smField}>
        <ToggleButtonGroup
          type="radio"
          onChange={handleChange}
          name="options"
          defaultValue={value}
          size={props.size}
        >
          {options}
        </ToggleButtonGroup>
      </Col>
    </Form.Group>
  );
}

RadioField.defaultProps = {
  size: 'sm',
  smLabel: 2,
  smField: 10,
  options: []
};