import React  from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import {Option} from "@Utils/models/models";

type Props = {
  name: string,
  label: string,
  labelFor?: undefined | string,
  value?: number | string,
  options: Array<Option>,
  size: undefined | 'sm' | 'lg',
  smLabel?: number,
  smField?: number,
  onChange: ((val: any) => void)
};

export const DropdownField = function(props: Props) {
  const handleChange = (e: any) => {
    props.onChange(e.target.value)
  };


  const options = props.options.map((item) => {
    return (
      <option key={item.value} value={item.value}>{item.label}</option>
    );
  });

  return (
    <Form.Group as={Row}>
      <Form.Label
        column={props.size}
        sm={props.smLabel}
        htmlFor={props.labelFor}
      >
        {props.label}
      </Form.Label>
      <Col sm={props.smField}>
        <Form.Control
          size={props.size}
          as="select"
          value={props.value}
          onChange={handleChange}
        >
          {options}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}

DropdownField.defaultProps = {
  size: "sm",
  smLabel: 2,
  smField: 10,
  options: []
};