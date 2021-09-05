import React  from 'react';
import { Form, Row, Col, ToggleButton as ToggleButtonOriginal, ToggleButtonGroup } from 'react-bootstrap';
import {Option} from "@Utils/models/models";

// TODO: check types
const ToggleButton: any = ToggleButtonOriginal;

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
  const handleChange = (value: any) => {
    props.onChange(value)
  };

  const options = props.options.map((item, index) => {
    return (
      <ToggleButton key={index} id={index} value={item.value}>{item.label}</ToggleButton>
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
          defaultValue={props.value}
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